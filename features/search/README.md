# Search Feature 

## Project structure

* `_data`:
  * (.gitignored) This includes data files that should only be used locally
  * E.g. Stores `embeddings_cache.parquet`. This cache file caches API responses, to lower usage cost
* `/app`: The FastAPI app on `:8000` that has the `/search?query={query}` endpoint to return the generated response for the user's query
* `/create_chunks`:
  * `create_chunks.js`: Reads all mdx files and creates a list of chunks that are saved to `docs_chunks.json`
  * `docs_chunks.json`: All chunks returned by `create_chunks.js`
* `data`: Public data. Data that should be same for everyone 
  * `embeddings_df.parquet`: Stores the embeddings for all chunks in `/create_chunks/docs_chunks.json`
* `.env`: Should contain the OpenAI API key environment variable (`OPENAI_API_KEY`)
* Rough work files:
  * `create_embeddings.ipynb`: Testing calling the OpenAI API to create embeddings
  * `get_top_chunks.ipynb`: Testing comparing the query embeddings with all the stored embeddings
  * `test_the_app.ipynb`: Test the `:8000/search?query={query}` endpoint
  * `testing.ipynb`: General testing
  * `trial_prompts.md`: Some of the prompts tried to choose the best prompt

## Install deps

You can create a conda/venv environment and install the deps from `/features/search/requirements.txt`.

Example:

```bash
cd features/search

conda create --prefix ./.conda python=3.9 # Create a conda environment in the .conda folder
source activate .conda # Activate the environment
pip install -r requirements.txt # Install the deps
```

## Run instructions

* Ensure that all pip dependencies are downloaded
* Then run `yarn dev` to start up the FastAPI app with the `/search?query={query}` endpoint
* Then try giving queries from the docs website search bar
