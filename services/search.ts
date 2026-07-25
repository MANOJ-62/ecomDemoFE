import { Product } from '@/types'
import { ApiNotAvailableError } from './errors'
import { getProductsPage } from './products'

export interface SearchFilters {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular'
  limit?: number
  offset?: number
}

export interface SearchResult {
  products: Product[]
  total: number
  hasMore: boolean
}

async function fetchFilteredProducts(filters: SearchFilters): Promise<SearchResult> {
  const limit = filters.limit ?? 12
  const offset = filters.offset ?? 0
  const page = Math.floor(offset / limit)

  const result = await getProductsPage({
    page,
    size: limit,
    search: filters.query,
  })

  let products = [...result.data]

  if (filters.category && filters.category !== 'All Products') {
    products = products.filter((product) => product.category === filters.category)
  }

  if (filters.minPrice !== undefined) {
    products = products.filter((product) => product.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    products = products.filter((product) => product.price <= filters.maxPrice!)
  }

  if (filters.minRating !== undefined) {
    products = products.filter((product) => product.rating >= filters.minRating!)
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        products.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }
  }

  return {
    products,
    total: result.total,
    hasMore: offset + limit < result.total,
  }
}

export const searchProducts = async (filters: SearchFilters): Promise<SearchResult> => {
  return fetchFilteredProducts(filters)
}

export const getSearchSuggestions = async (query: string, limit: number = 5): Promise<string[]> => {
  if (!query || query.length < 2) return []

  const result = await getProductsPage({ page: 0, size: limit, search: query })
  return result.data.slice(0, limit).map((product) => product.name)
}

export const getTrendingSearches = async (): Promise<string[]> => {
  throw new ApiNotAvailableError('GET /api/search/trending')
}

const searchQueries: Map<string, number> = new Map()

export const trackSearch = (query: string): void => {
  const normalizedQuery = query.toLowerCase().trim()
  if (normalizedQuery) {
    searchQueries.set(normalizedQuery, (searchQueries.get(normalizedQuery) || 0) + 1)
  }
}

export const getSearchAnalytics = async () => {
  throw new ApiNotAvailableError('GET /api/search/analytics')
}

export const advancedSearch = async (filters: SearchFilters) => {
  const results = await searchProducts(filters)

  return {
    results,
    facets: {
      categories: Array.from(new Set(results.products.map((product) => product.category))),
      priceRanges: [
        { min: 0, max: 25, label: '$0 - $25' },
        { min: 25, max: 50, label: '$25 - $50' },
        { min: 50, max: Infinity, label: '$50+' },
      ],
      ratings: [5, 4, 3, 2, 1],
    },
  }
}

export const fuzzySearch = async (query: string): Promise<SearchResult> => {
  return searchProducts({ query, limit: 100, offset: 0 })
}

export const getSearchCorrections = (_query: string): string[] => {
  return []
}

export const getRelatedSearches = async (_query: string): Promise<string[]> => {
  throw new ApiNotAvailableError('GET /api/search/related')
}

const userSearches: Map<string, string[]> = new Map()

export const getSavedSearches = (userId: string): string[] => userSearches.get(userId) || []

export const saveSearch = (userId: string, query: string): void => {
  const searches = userSearches.get(userId) || []
  if (!searches.includes(query)) {
    searches.unshift(query)
    if (searches.length > 10) searches.pop()
    userSearches.set(userId, searches)
  }
}

export const clearSavedSearches = (userId: string): void => {
  userSearches.delete(userId)
}

export const searchByCategory = async (category: string): Promise<SearchResult> => {
  return searchProducts({ category, limit: 12, sortBy: 'popular' })
}

export const getBestSellers = async (): Promise<SearchResult> => {
  return searchProducts({ limit: 8, sortBy: 'popular' })
}

export const getNewArrivals = async (): Promise<SearchResult> => {
  return searchProducts({ limit: 8, sortBy: 'newest' })
}

export const getOnSale = async (): Promise<Product[]> => {
  const result = await getProductsPage({ page: 0, size: 100 })
  return result.data.filter((product) => product.price > 0).slice(0, 8)
}
