import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById, searchProducts } from '@/services/api'

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => getProducts(category),
  })
}

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  })
}

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  })
}
