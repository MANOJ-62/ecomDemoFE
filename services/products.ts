import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, PageProductResponse, ProductResponse } from './types/backend'
import { mapProductResponseToProduct } from './mappers'
import { Product } from '@/types'

export interface ProductQueryParams {
  page?: number
  size?: number
  search?: string
  categoryId?: number
}

async function fetchProducts(params: ProductQueryParams = {}): Promise<PageProductResponse> {
  const response = await api.get<ApiResponse<PageProductResponse>>('/products', { params })
  return unwrapApiResponse(response)
}

export async function getProducts(category?: string): Promise<Product[]> {
  const params: ProductQueryParams = { page: 0, size: 100 }

  if (category && category !== 'All Products') {
    if (category === 'Popular' || category === 'Best Sellers') {
      const page = await fetchProducts(params)
      return page.content
        .filter((product) => product.featured)
        .map(mapProductResponseToProduct)
    }

    const categoriesResponse = await api.get<ApiResponse<Array<{ id: number; name: string }>>>('/categories')
    const categories = unwrapApiResponse(categoriesResponse)
    const matchedCategory = categories.find((item) => item.name === category)

    if (matchedCategory) {
      params.categoryId = matchedCategory.id
    } else {
      params.search = category
    }
  }

  const page = await fetchProducts(params)
  return page.content.map(mapProductResponseToProduct)
}

export async function getProductById(id: number): Promise<Product | null> {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id
debugger;
  if (!Number.isNaN(numericId) && String(numericId) === String(id).trim()) {
    try {
      const response = await api.get<ApiResponse<ProductResponse>>(`/products/${numericId}`)
      return mapProductResponseToProduct(unwrapApiResponse(response))
    } catch {
      // Fall through to slug lookup when numeric lookup fails.
    }
  }

  try {
    const response = await api.get<ApiResponse<ProductResponse>>(`/products/slug/${id}`)
    return mapProductResponseToProduct(unwrapApiResponse(response))
  } catch {
    return null
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  const page = await fetchProducts({ page: 0, size: 100, search: query })
  return page.content.map(mapProductResponseToProduct)
}

export async function getProductsPage(params: ProductQueryParams = {}) {
  const page = await fetchProducts(params)
  return {
    data: page.content.map(mapProductResponseToProduct),
    total: page.totalElements,
    totalPages: page.totalPages,
    page: page.number,
  }
}

export async function getProductResponseById(id: number): Promise<ProductResponse> {
  const response = await api.get<ApiResponse<ProductResponse>>(`/products/${id}`)
  return unwrapApiResponse(response)
}

export async function createProductRequest(payload: Record<string, unknown>): Promise<ProductResponse> {
  const response = await api.post<ApiResponse<ProductResponse>>('/products', payload)
  return unwrapApiResponse(response)
}

export async function updateProductRequest(id: number, payload: Record<string, unknown>): Promise<ProductResponse> {
  const response = await api.put<ApiResponse<ProductResponse>>(`/products/${id}`, payload)
  return unwrapApiResponse(response)
}

export async function deleteProductById(id: number): Promise<void> {
  const response = await api.delete<ApiResponse<null>>(`/products/${id}`)
  unwrapApiResponse(response)
}
