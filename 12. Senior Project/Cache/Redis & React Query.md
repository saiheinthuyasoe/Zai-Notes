# Wh question for Redis and React Query

## What are you trying to solve?

- **Redis**: Server-side caching, session management, real-time features (like live reading progress, notifications), rate limiting
- **React Query**: Client-side data fetching, caching API responses, managing server state in your React frontend

## Where does the caching happen?

- **Redis**: Server-side (backend cache, shared across all users)
- **React Query**: Client-side (browser cache, per-user session)

## When should you use each?

- **Redis**: When you need to reduce database load, store temporary data (reading sessions, user preferences), or enable real-time features
- **React Query**: When you want to eliminate redundant API calls, provide instant navigation between cached pages, handle loading/error states elegantly

## Who benefits from the caching?

- **Redis**: All users (shared cache reduces server load)
- **React Query**: Individual users (faster UI interactions, offline-like experience)

## Why choose one over the other?

- **Redis**: You're dealing with high traffic, need server-side performance optimization, or building real-time features
- **React Query**: You want better user experience, easier state management in React, and don't want to manage server infrastructure

## How do they work together?

For a novel platform, you'd typically use **both**:

- **Redis**: Cache popular novels, user reading progress, recommendations
- **React Query**: Cache API responses for novel metadata, user profiles, reading lists

## Which novels/data to cache where?

- **Redis**: Trending novels, chapter content, user authentication tokens
- **React Query**: Novel browsing results, user's personal library, reading history
