

# Speed Up Page Loading

Your site is relatively simple, but there are two impactful optimizations we can make:

## 1. Lazy-load pages (code splitting)

Right now, all page components (Store, Shop, FAQ, Book, ProductDetail, etc.) are imported upfront in `App.tsx`, meaning the browser downloads ALL page code before showing anything -- even if the user only visits the homepage.

We'll use React's `lazy()` and `Suspense` to split each page into its own chunk that only loads when the user navigates to it. This makes the initial page load significantly faster.

## 2. Preload product data with React Query

The ProductDetail page currently fetches product data inside a `useEffect`, showing a spinner until it finishes. We'll switch to `useQuery` from TanStack React Query (already installed) with `staleTime` caching, so revisiting the same product is instant and the data layer is more robust.

---

## Technical Details

### App.tsx changes
- Replace direct imports of page components with `React.lazy()` calls
- Wrap `<Routes>` in a `<Suspense>` with a lightweight loading spinner fallback

### ProductDetail.tsx changes
- Replace the manual `useEffect` + `useState` data fetching with `useQuery` from `@tanstack/react-query`
- This gives automatic caching, so navigating back to a previously viewed product loads instantly

### Expected Impact
- **Initial load**: Smaller JS bundle since pages are split into separate chunks
- **Navigation**: Pages like `/book` and `/faq` (which have zero API calls) will feel nearly instant
- **Product pages**: Cached after first visit, no re-fetch on back navigation

