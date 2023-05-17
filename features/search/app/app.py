import time
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

import os
import openai
from openai.embeddings_utils import get_embedding, cosine_similarity
import requests
import json
import sseclient
import pandas as pd
import json
from pathlib import Path
from tqdm import tqdm

import dotenv

env_file = '.env'
dotenv.load_dotenv(env_file, override=True)
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

origins = [
    "http://localhost:1700",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

embeddings_df = pd.read_parquet("data/embeddings_df.parquet", engine='fastparquet')
embeddings_cache = pd.read_parquet("_data/embeddings_cache.parquet", engine='fastparquet')

def get_embeddings_same_as_df(input_content, model="text-embedding-ada-002"):
    response = openai.Embedding.create(
        model=model,
        input=f"{input_content}"
    )
    return response

def get_cached_embedding(query, model='text-embedding-ada-002'):
    if query in embeddings_cache.index:
        return embeddings_cache.loc[query, "embedding"]
    else:
        print("CALLING OPENAI API")
        embeddings_cache.loc[query, "embedding"] = get_embeddings_same_as_df(query)["data"][0]["embedding"]
        # print("SAVING TO PARQUET", embeddings_cache.loc[query, "embedding"])
        embeddings_cache.to_parquet("_data/embeddings_cache.parquet", engine='fastparquet')
        return embeddings_cache.loc[query, "embedding"]
    
def get_similarities(df, query, pprint=True):
  res = df.copy()

  embedding = get_cached_embedding(query)
  # print(embedding)

  # print(type(embedding), type(res["embedding"]), len(embedding), len(res["embedding"][0]))
  res['similarities'] = res["embedding"].apply(lambda x: cosine_similarity(x, embedding))
  res = res.sort_values('similarities', ascending=False)
  return res

def get_top_chunks(query):
    res = get_similarities(embeddings_df, query)
    top_chunks = res.loc[:, ["chunk", "similarities"]]
    top_chunks = top_chunks.head(5)
    top_chunks["chunk"] = top_chunks["chunk"].apply(lambda x: {**x, "similarity": top_chunks.loc[top_chunks["chunk"] == x, "similarities"].values[0]})

    print("TOP CHUNKS", top_chunks)

    return json.loads(top_chunks["chunk"].to_json(orient="records"))

def prompt(query, top_chunks):
    return f"""
You are an enthusiastic iTwinUI representative who loves helping users. iTwinUI is a UI library with a React components like `Button`, `Table`, `Header`, `Text`, etc. where all components follow the strict UX guidelines set by iTwinUI. Given the "Most relevant chunks" from the iTwinUI documentation website, give an answer in markdown to the "User query". You should not use any information outside of "Most relevant chunks". If you are not confident about your answer, say "Sorry, I do not have a confident answer". NEVER guess an answer or inject your knowledge. Always give concise answers, unless the user asks you to elaborate.

"User query":
{query}

"Most relevant chunks":
```json
{json.dumps(top_chunks, indent=4)}

Your answer in markdown:
    """.strip()

# def generate_streaming_answer(prompt, model="text-ada-001", max_tokens=30):
#     headers = {
#         "Content-Type": "application/json",
#         "Accept": "text/event-stream",
#         "Authorization": f"Bearer {openai.api_key}"
#     }
#     data = {
#         "prompt": prompt,
#         "model": model,
#         "max_tokens": max_tokens,
#         "temperature": 0.0,
#         "stream":True
#     }
#     response = requests.post("https://api.openai.com/v1/completions", headers=headers, data=json.dumps(data))
#     client = sseclient.SSEClient(response)
#     for event in client.events():
#         print("HERE")
#         if event.data != "[DONE]":
#             response_json = json.loads(event.data)
#             print("HERE 1", response_json["choices"][0]["text"], end="", flush=True)

#             if "choices" in response_json:
#                 print("HERE 2", response_json["choices"][0]["text"], end="", flush=True)
#                 yield response_json["choices"][0]["text"]


def fake_data_streamer():
    for i in range(10):
        yield b'some fake data\n\n'
        # Wait for 0.5 seconds
        time.sleep(0.5)

# Calls the completion endpoint of OpenAI API
# Returns the full response
def call_open_ai(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=1500,
    )
    return response["choices"][0]["text"]


@app.get('/stream')
async def testing_streaming():
    return StreamingResponse(fake_data_streamer(), media_type='text/event-stream')

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Gets the top 10 chunks that are similar to the query (get_top_chunks())
# Then, it gets the prompt (prompt())
# Then, it gets the answer from the prompt as a stream, like ChatGPT streaming style (generate_streaming_answer())
# Then, FastAPI returns the answer as a stream (like from fastapi.responses import StreamingResponse?)
@app.get("/search/")
async def search(query: str):
    top_chunks = get_top_chunks(query)
    print(top_chunks)
    prompt_ = prompt(query, top_chunks)

    response = call_open_ai(prompt_)

    # response = ""
    # for chunk in generate_streaming_answer(prompt_):
    #     # print(response)
    #     response += chunk

    # return StreamingResponse(generate_streaming_answer(prompt_), media_type="text/plain")
    # return StreamingResponse(generate_streaming_answer(prompt_), media_type='text/event-stream')
    # return StreamingResponse(fake_data_streamer(), media_type='text/event-stream')
    return response
