export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  parentId?: string
  isActive: boolean
  displayOrder: number
  productCount: number
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

export interface CategoryHierarchy extends Category {
  children?: CategoryHierarchy[]
}
