# List of PostgreSQL Commands, Clauses and Keywords

---

### Data Definition Commands (DDL)

1. **CREATE DATABASE**
2. **DROP DATABASE**
3. **ALTER DATABASE**
4. **CREATE TABLE**
5. **DROP TABLE**
6. **ALTER TABLE**
7. **CREATE INDEX**
8. **DROP INDEX**
9. **ALTER INDEX**
10. **CREATE VIEW**
11. **DROP VIEW**
12. **CREATE SEQUENCE**
13. **DROP SEQUENCE**
14. **ALTER SEQUENCE**
15. **CREATE SCHEMA**
16. **DROP SCHEMA**
17. **ALTER SCHEMA**
18. **CREATE FUNCTION**
19. **DROP FUNCTION**
20. **ALTER FUNCTION**
21. **CREATE TRIGGER**
22. **DROP TRIGGER**
23. **ALTER TRIGGER**
24. **CREATE TYPE**
25. **DROP TYPE**
26. **ALTER TYPE**
27. **CREATE AGGREGATE**
28. **DROP AGGREGATE**
29. **CREATE DOMAIN**
30. **DROP DOMAIN**
31. **ALTER DOMAIN**
32. **CREATE RULE**
33. **DROP RULE**
34. **CREATE OPERATOR**
35. **DROP OPERATOR**
36. **CREATE EXTENSION**
37. **DROP EXTENSION**
38. **ALTER EXTENSION**

---

### Data Manipulation Commands (DML)

1. **SELECT**
2. **INSERT INTO**
3. **UPDATE**
4. **DELETE FROM**
5. **COPY**
6. **TRUNCATE**
7. **MERGE**

---

### Data Control Commands (DCL)

1. **GRANT**
2. **REVOKE**

---

### Transaction Control Commands (TCL)

1. **BEGIN**
2. **COMMIT**
3. **ROLLBACK**
4. **SAVEPOINT**
5. **RELEASE SAVEPOINT**
6. **ROLLBACK TO SAVEPOINT**
7. **LOCK TABLE**

---

### Utility Commands

1. **ANALYZE**
2. **VACUUM**
3. **EXPLAIN**
4. **EXPLAIN ANALYZE**
5. **REINDEX**
6. **CHECKPOINT**
7. **DISCARD**
8. **CLUSTER**
9. **LISTEN**
10. **NOTIFY**
11. **UNLISTEN**

---

### Procedural and Other Keywords

1. **DO**
2. **DECLARE**
3. **EXECUTE**
4. **PERFORM**
5. **RAISE**
6. **SET**
7. **RESET**

---

### Clauses and Expressions

1. **WHERE**
2. **ORDER BY**
3. **GROUP BY**
4. **HAVING**
5. **LIMIT**
6. **OFFSET**
7. **DISTINCT**
8. **UNION**
9. **UNION ALL**
10. **INTERSECT**
11. **EXCEPT**
12. **INNER JOIN**
13. **LEFT JOIN**
14. **RIGHT JOIN**
15. **FULL JOIN**
16. **CROSS JOIN**
17. **NATURAL JOIN**
18. **ON**
19. **USING**
20. **WITH (CTE - Common Table Expression)**
21. **RECURSIVE (for CTEs)**
22. **RETURNING**
23. **IN**
24. **NOT IN**
25. **EXISTS**
26. **NOT EXISTS**
27. **LIKE**
28. **ILIKE**
29. **BETWEEN**
30. **IS NULL**
31. **IS NOT NULL**
32. **CASE...WHEN...THEN...ELSE...END**
33. **CAST**
34. **COALESCE**
35. **NULLIF**
36. **DEFAULT**
37. **CHECK**
38. **PRIMARY KEY**
39. **FOREIGN KEY**
40. **UNIQUE**
41. **REFERENCES**
42. **ON DELETE**
43. **ON UPDATE**
44. **DEFERRABLE**
45. **NOT DEFERRABLE**
46. **DEFERRED**
47. **IMMEDIATE**

---

### Window Functions and Related Clauses

1. **OVER**
2. **PARTITION BY**
3. **ROWS**
4. **RANGE**
5. **PRECEDING**
6. **FOLLOWING**
7. **FIRST_VALUE**
8. **LAST_VALUE**
9. **ROW_NUMBER**
10. **RANK**
11. **DENSE_RANK**
12. **NTILE**
13. **LAG**
14. **LEAD**
15. **PERCENT_RANK**
16. **CUME_DIST**

---

### Indexing and Constraints

1. **CREATE UNIQUE INDEX**
2. **DROP CONSTRAINT**
3. **ADD CONSTRAINT**
4. **ALTER CONSTRAINT**
5. **CREATE INDEX CONCURRENTLY**
6. **USING (Index type)**
7. **EXCLUDE**
8. **EXCLUDE USING**

---

### Configuration and Administration

1. **SHOW**
2. **SET**
3. **RESET**
4. **ALTER SYSTEM**
5. **SELECT pg_reload_conf()** – Reloads configuration
6. **COMMENT ON** – Adds a comment to a database object

---

### Specialized Commands and Clauses

1. **TABLESAMPLE** – For sampling rows
2. **FILTER** – Used within aggregate functions
3. **LATERAL** – Allows subqueries to reference columns in previous tables
4. **FOR UPDATE / FOR SHARE** – Row-level locking in queries
5. **WINDOW** – Named windows in window functions
6. **FETCH** – Retrieves rows from a cursor
7. **IMPORT FOREIGN SCHEMA** – For importing schemas with foreign data

---

### JSON and Array Functions and Operators

1. **jsonb_set**
2. **jsonb_insert**
3. **jsonb_extract_path_text**
4. **json_agg**
5. **array_agg**
6. **array_to_string**
7. **unnest**
8. **ANY**
9. **ALL**

---

### Full-Text Search Commands

1. **TO_TSVECTOR**
2. **TO_TSQUERY**
3. **PLAINTO_TSQUERY**
4. **PHRASETO_TSQUERY**
5. **websearch_to_tsquery**
6. **@@** – Matches a text search query against a tsvector

---

### Other Miscellaneous Commands

1. **IMPORT FOREIGN SCHEMA**
2. **ALTER DEFAULT PRIVILEGES**
3. **DISABLE / ENABLE TRIGGER**
4. **DISABLE / ENABLE RULE**
5. **ATTACH PARTITION / DETACH PARTITION**

---
