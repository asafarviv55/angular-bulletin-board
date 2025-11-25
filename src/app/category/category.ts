export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parentId?: number;
  orderIndex: number;
  adCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
  icon: string;
  parentId?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
