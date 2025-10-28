**Semantic search** is a more advanced type of search that tries to understand the **meaning (semantics)** of a query, not just the keywords.

### Difference from full-text search:

- **Full-text search** → finds documents with the _exact words_ (or variations like stemming).
- **Semantic search** → finds documents that are _conceptually related_, even if the words are different.

### Example:

Query: `"How to fix eye infection?"`

- **Full-text search** → will only return documents that literally contain words like `"fix"` + `"eye infection"`.
- **Semantic search** → could also return documents about `"treating conjunctivitis"` or `"eye disease remedies"`, because it understands they are related in meaning.

### How it works:

- Uses **natural language processing (NLP)** and often **vector embeddings**.
- Each text (document, sentence, query) is converted into a **vector** in high-dimensional space.
- Search finds documents with vectors **closest in meaning** to the query vector (using cosine similarity, etc.).

### Tools:

- **Vector databases**: Pinecone, Weaviate, Milvus
- **Libraries/Models**: SentenceTransformers, OpenAI embeddings, Cohere
- **Hybrid search**: Some platforms (like Typesense, Elasticsearch + vector plugin, or Meilisearch) combine full-text + semantic search.

👉 So:

- **Full-text search** = matches words.
- **Semantic search** = matches meaning.
