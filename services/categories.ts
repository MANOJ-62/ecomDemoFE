import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, CategoryResponse } from './types/backend'
import { buildCategoryHierarchy, mapCategoryResponseToCategory } from './mappers'
import { ApiNotAvailableError } from './errors'
import { Category, CategoryHierarchy } from './types/category'

export type { Category, CategoryHierarchy } from './types/category'

let cachedCategories: Category[] | null = null

async function fetchAllCategories(): Promise<Category[]> {
  const response = await api.get<ApiResponse<CategoryResponse[]>>('/categories')
  cachedCategories = unwrapApiResponse(response).map(mapCategoryResponseToCategory)
  return cachedCategories
}

async function getCachedCategories(): Promise<Category[]> {
  if (!cachedCategories) {
    return fetchAllCategories()
  }
  return cachedCategories
}

export const getCategories = async (includeInactive: boolean = false): Promise<Category[]> => {
  const categories = await fetchAllCategories()
  const result = includeInactive ? categories : categories.filter((category) => category.isActive)
  return [...result].sort((a, b) => a.displayOrder - b.displayOrder)
}

export const getShopCategories = async (): Promise<string[]> => {
  const categories = await getCategories()
  return ['All Products', ...categories.map((category) => category.name)]
}

export const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const response = await api.get<ApiResponse<CategoryResponse>>(`/categories/${id}`)
    return mapCategoryResponseToCategory(unwrapApiResponse(response))
  } catch {
    return null
  }
}

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const categories = await getCachedCategories()
  return categories.find((category) => category.slug === slug) ?? null
}

export const createCategory = async (
  name: string,
  description: string,
  options: Partial<Category> = {}
): Promise<Category> => {
  const response = await api.post<ApiResponse<CategoryResponse>>('/categories', {
    name,
    description,
    imageUrl: options.image,
    parentId: options.parentId ? Number(options.parentId) : undefined,
    sortOrder: options.displayOrder,
  })

  cachedCategories = null
  return mapCategoryResponseToCategory(unwrapApiResponse(response))
}

export const updateCategory = async (id: string, updates: Partial<Category>): Promise<Category | null> => {
  const response = await api.put<ApiResponse<CategoryResponse>>(`/categories/${id}`, {
    name: updates.name,
    description: updates.description,
    imageUrl: updates.image,
    active: updates.isActive,
    parentId: updates.parentId ? Number(updates.parentId) : undefined,
    sortOrder: updates.displayOrder,
  })

  cachedCategories = null
  return mapCategoryResponseToCategory(unwrapApiResponse(response))
}

export const deleteCategory = async (id: string): Promise<boolean> => {
  const response = await api.delete<ApiResponse<null>>(`/categories/${id}`)
  unwrapApiResponse(response)
  cachedCategories = null
  return true
}

export const getSubcategories = async (parentId: string): Promise<Category[]> => {
  const categories = await getCachedCategories()
  return categories
    .filter((category) => category.parentId === parentId && category.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

export const getCategoryHierarchy = async (): Promise<CategoryHierarchy[]> => {
  const categories = await getCategories()
  return buildCategoryHierarchy(categories)
}

export const reorderCategories = async (_categoryIds: string[]): Promise<boolean> => {
  throw new ApiNotAvailableError('PATCH /api/categories/reorder')
}

export const moveCategory = async (_categoryId: string, _newParentId: string | null): Promise<Category | null> => {
  throw new ApiNotAvailableError('PATCH /api/categories/{id}/move')
}

export const activateCategory = async (id: string): Promise<Category | null> => updateCategory(id, { isActive: true })

export const deactivateCategory = async (id: string): Promise<Category | null> => updateCategory(id, { isActive: false })

export const updateProductCount = async (_categoryId: string, _count: number): Promise<boolean> => {
  throw new ApiNotAvailableError('PATCH /api/categories/{id}/product-count')
}

export const incrementProductCount = async (_categoryId: string): Promise<boolean> => {
  throw new ApiNotAvailableError('PATCH /api/categories/{id}/product-count/increment')
}

export const decrementProductCount = async (_categoryId: string): Promise<boolean> => {
  throw new ApiNotAvailableError('PATCH /api/categories/{id}/product-count/decrement')
}

export const getCategoryStats = async () => {
  const categories = await getCategories(true)
  return {
    total: categories.length,
    active: categories.filter((category) => category.isActive).length,
    inactive: categories.filter((category) => !category.isActive).length,
    totalProducts: categories.reduce((sum, category) => sum + category.productCount, 0),
    topCategory: categories.reduce<Category | undefined>(
      (top, current) => (current.productCount > (top?.productCount ?? 0) ? current : top),
      undefined
    ),
  }
}

export const searchCategories = async (query: string): Promise<Category[]> => {
  const lowerQuery = query.toLowerCase()
  const categories = await getCachedCategories()

  return categories
    .filter(
      (category) =>
        category.name.toLowerCase().includes(lowerQuery) ||
        category.slug.includes(lowerQuery) ||
        category.description.toLowerCase().includes(lowerQuery)
    )
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

export const getCategoriesByProductCount = async (limit: number = 10): Promise<Category[]> => {
  const categories = await getCategories()
  return categories.sort((a, b) => b.productCount - a.productCount).slice(0, limit)
}

export const exportCategoriesAsCSV = async (): Promise<string> => {
  throw new ApiNotAvailableError('GET /api/categories/export')
}

export const bulkUpdateCategories = async (
  _updates: Array<{ id: string; changes: Partial<Category> }>
): Promise<number> => {
  throw new ApiNotAvailableError('PATCH /api/categories/bulk')
}
