# Connect to Redis

redis-cli -h your-redis-host -p your-redis-port

# List all keys

KEYS \*

# Get specific key value

GET "user:profile:some-uuid"

# Get all keys with pattern

KEYS "user:profile:\*"

# Get cache info

INFO

# Chekc TYPE

TYPE "KEY..."

if type is list ---> LRANGE "Key"
if type is hash ---> HGETALL "Key"
