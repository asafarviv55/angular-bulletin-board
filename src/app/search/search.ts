export interface SearchFilters {
  keyword?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  sortBy?: SortOption;
  sortOrder?: SortOrder;
  condition?: ItemCondition;
  postedWithin?: PostedWithin;
}

export enum SortOption {
  RELEVANCE = 'RELEVANCE',
  PRICE = 'PRICE',
  DATE = 'DATE',
  POPULARITY = 'POPULARITY'
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum ItemCondition {
  NEW = 'NEW',
  LIKE_NEW = 'LIKE_NEW',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR'
}

export enum PostedWithin {
  LAST_24_HOURS = 'LAST_24_HOURS',
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
  LAST_90_DAYS = 'LAST_90_DAYS'
}

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  location: string;
  condition: ItemCondition;
  sellerName: string;
  sellerId: number;
  sellerRating: number;
  postedAt: string;
  viewCount: number;
  favoriteCount: number;
  isFeatured: boolean;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SavedSearch {
  id: number;
  userId: number;
  name: string;
  filters: SearchFilters;
  emailNotifications: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
