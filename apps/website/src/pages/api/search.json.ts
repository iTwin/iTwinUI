/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { APIRoute } from 'astro';

import * as fs from 'node:fs';

import { parse } from 'csv-parse';

function cosinesim(A, B) {
  let dotproduct = 0;
  let mA = 0;
  let mB = 0;

  for (let i = 0; i < A.length; i++) {
    dotproduct += A[i] * B[i];
    mA += A[i] * A[i];
    mB += B[i] * B[i];
  }

  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);

  const similarity = dotproduct / (mA * mB);
  return similarity;
}

/**
 * Get an embedding for a given text using the Azure OpenAI Embedding API.
 * @param text
 * @returns An array of numbers representing the embedding.
 */
const getOpenAiEmbedding = async (text: string): Promise<Array<number>> => {
  const openAiEmbeddingResponse = await fetch(import.meta.env.AZURE_OPENAI_EMBEDDING_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': import.meta.env.AZURE_OPENAI_KEY,
    },
    body: JSON.stringify({
      input: text,
    }),
  });

  const openAiEmbeddingResponseJson = await openAiEmbeddingResponse.json();
  const openAiEmbedding = openAiEmbeddingResponseJson['data'][0]['embedding'];

  return openAiEmbedding;
};

/**
 * Get a text completion for a given text using the Azure OpenAI Completion API.
 * @param text
 * @returns Text completion
 */
const getOpenAiTextCompletion = async (text: string): Promise<string> => {
  try {
    const openAiCompletionResponse = await fetch(import.meta.env.AZURE_OPENAI_COMPLETION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': import.meta.env.AZURE_OPENAI_KEY,
      },
      body: JSON.stringify({
        prompt: text,
        max_tokens: 2700,
        temperature: 0.3,
      }),
    });

    const openAiCompletionResponseJson = await openAiCompletionResponse.json();
    const openAiCompletionText = openAiCompletionResponseJson['choices'][0]['text'];

    return openAiCompletionText;
  } catch (ex) {
    throw ex;
  }
};

/**
 * Reads the CSV file containing all the embeddings and returns all embeddings as a list.
 * @returns A list of all embeddings.
 */
const readAllEmbeddings = async () => {
  const allEmbeddingsRows = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(import.meta.env.EMBEDDINGS_DF_PATH_FROM_WEBSITE_ROOT)
      .pipe(
        parse({
          delimiter: ',',
          columns: true,
          ltrim: true,
        })
      )
      .on('data', function (row) {
        row['embedding'] = eval(row['embedding']);

        allEmbeddingsRows.push(row);
      })
      .on('error', function (error) {
        console.log(error.message);
      })
      .on('end', function () {
        resolve(true);
      });
  });

  return allEmbeddingsRows;
};

/**
 * This enum helps us get more detailed answers by passing only the type of chunks as requested by the user.
 * ResponseType.only_code: Only return code examples.
 * ResponseType.only_text: Only return descriptive text.
 * ResponseType.code_and_text: Return both code examples and descriptive text.
 */
type ResponseType = 'only_code' | 'only_text' | 'code_and_text';

type ChunkType = {
  similarity: number;
  chunk: string;
};

/**
 * Get the top `numChunks` chunks for a given query.
 * @param query
 * @param numChunks
 * @param response_type
 * @returns
 */
const getTopChunks = async (
  query: string,
  numChunks: number,
  response_type: ResponseType
): Promise<ChunkType[]> => {
  const queryEmbedding = await getOpenAiEmbedding(query);
  const allEmbeddingsRows = await readAllEmbeddings();

  const similarityScores = allEmbeddingsRows
    .filter(
      response_type === 'only_code'
        ? // Only include rows where the key of "codeExampleTitle" exists
          (row) => JSON.parse(row['chunk'])['codeExampleTitle'] != undefined
        : response_type === 'only_text'
        ? // Only include rows where the key of "header" exists
          (row) => JSON.parse(row['chunk'])['header'] != undefined
        : // Include all rows
          (row) => true
    )
    .map((row) => {
      return {
        similarity: cosinesim(queryEmbedding, row['embedding']),
        chunk: JSON.parse(row['chunk']),
      };
    });

  // Return the top `numChunks` chunks after sorting in descending order by similarity score.
  return similarityScores.sort((a, b) => b['similarity'] - a['similarity']).slice(0, numChunks);
};

/**
 * Fill the template of the prompt with the pass values.
 * @param query
 * @param topChunks
 * @returns string
 */
const getTextCompletionPrompt = (query: string, topChunks: Array<string>): string => {
  return `You are an enthusiastic iTwinUI representative who loves helping users. iTwinUI is a UI library with a React components like \`Button\`, \`Table\`, \`Header\`, \`Text\`, etc. where all components follow the strict UX guidelines set by iTwinUI. Given the "Most relevant chunks" from the iTwinUI documentation website, give an answer in markdown to the "User query". "Most relevant chunks" contains descriptive pieces (format: \`{"header": "...", "link": "...", "content": "..."}\`) and code examples (format: \`{"codeExampleTitle": "...", "codeExample": "..."}\`) from the documentation site. You should only use information from "Most relevant chunks" and a bit of your coding skills. Also, feel free to ignore chunks from "Most relevant chunks" if you feel they are impertinent to the answer. If you ever are not confident about your answer, say "Sorry, I do not have a confident answer". NEVER guess an answer.

"User query":
${query}

"Most relevant chunks":
${JSON.stringify(topChunks, null, 2)}

Your answer in markdown (include code whenever possible):
`;
};

const addToQueryHistory = async (
  query: string,
  response_type: ResponseType,
  top_chunks: Array<any>,
  response: string
) => {
  const queryHistory = JSON.parse(
    await fs.promises.readFile(import.meta.env.QUERY_HISTORY_PATH_FROM_WEBSITE_ROOT, 'utf8')
  );

  queryHistory.push({
    query: query,
    response_type: response_type,
    top_chunks: top_chunks,
    response: response,
    timestamp: new Date().toISOString(),
  });

  await fs.promises.writeFile(
    import.meta.env.QUERY_HISTORY_PATH_FROM_WEBSITE_ROOT,
    JSON.stringify(queryHistory, null, 2),
    'utf8'
  );
};

/**
 * The `/search.json` API route for the iTwinUI AiChat.
 * Example request: `/search.json?query=How to use create an iTwinUI button?`
 */
export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const query = body['query'];
  const response_type = body['response_type'];

  // Get the top 10 chunks
  const topChunks = (await getTopChunks(query, 10, response_type)).map((chunk) => chunk['chunk']);

  // Include as many chunks as possible in the prompt
  let textCompletion = 'ERROR';
  for (let k = 10; k >= 0; k--) {
    const textCompletionPrompt = getTextCompletionPrompt(query, topChunks.slice(0, k));

    try {
      textCompletion = await getOpenAiTextCompletion(textCompletionPrompt);
      break;
    } catch (ex) {
      console.log(`error with ${k} chunks. Retrying with ${k - 1} chunks`);
      continue;
    }
  }

  addToQueryHistory(query, response_type, topChunks, textCompletion);

  return new Response(
    JSON.stringify({
      textCompletion: textCompletion,
    }),
    { status: 200 }
  );
};
