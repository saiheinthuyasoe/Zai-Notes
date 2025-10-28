## Full-Text Search vs Semantic Search

| Feature            | **Full-Text Search (FTS)**                                         | **Semantic Search (SS)**                                                      |
| ------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| **How it works**   | Indexes keywords, matches based on tokens, stemming, Boolean logic | Converts text into **vector embeddings**, finds results by meaning/similarity |
| **Query type**     | Exact words, phrases, Boolean operators (`AND`, `OR`, `NOT`)       | Natural language queries, questions, synonyms, paraphrases                    |
| **Result ranking** | Based on keyword frequency (TF-IDF, BM25)                          | Based on vector similarity (cosine similarity, dot product)                   |
| **Strengths**      | Fast, mature, efficient for structured keyword search              | Understands context and meaning, works even with different wording            |
| **Weaknesses**     | Won’t match synonyms/paraphrases (e.g., `car` ≠ `automobile`)      | Requires embeddings model, more compute/storage, may be slower                |
| **Best for**       | Search where keywords matter: logs, product SKUs, legal documents  | Search where _meaning_ matters: FAQs, chatbots, recommendations               |
| **Examples**       | MySQL FULLTEXT, PostgreSQL `tsvector`, Elasticsearch BM25          | OpenAI Embeddings + Pinecone, Weaviate, Elasticsearch vector search           |

👉 **Summary:**

- **FTS** = “Does this document contain these words?”
- **SS** = “Does this document mean what the query means?”
