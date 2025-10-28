**Full-text search (FTS)** is a search technique that lets you find results by analyzing the actual text content of documents, rather than just doing exact matches.

### Key points:

* It breaks text into **tokens/words** and builds an **index** optimized for searching.
* You can search for **phrases, keywords, or similar words** within large text fields.
* It usually supports **ranking/relevance scores** (e.g., results with more keyword matches or closer matches come first).
* Often supports **advanced features** like stemming (`running` → `run`), stop words (`the`, `and`, etc. ignored), and sometimes fuzzy matching.

### Example:

Suppose you have this text in your database:

* `"The quick brown fox jumps over the lazy dog."`

If you use normal SQL `LIKE '%fox%'`, it just checks if `"fox"` appears as-is.
If you use **full-text search**, you could:

* Search `"quick fox"` → it matches because both words are present.
* Search `"jump"` → it matches `"jumps"` (stemming).
* Get results ranked so documents with `"fox"` appearing multiple times rank higher.

### Real-world:

* **Databases**: MySQL (`FULLTEXT` index), PostgreSQL (`tsvector`, `tsquery`), SQL Server
* **Search engines**: Elasticsearch, Solr, Meilisearch, Typesense

👉 So in short: **full-text search = smarter search over text, not just simple substring matching.**

Do you want me to compare **full-text search vs semantic search** (since you mentioned Typesense earlier)?
