export interface Favorite {
  id: number;
  userId: number;
  adId: number;
  ad: FavoriteAd;
  notes?: string;
  createdAt: string;
}

export interface FavoriteAd {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  location: string;
  postedAt: string;
  status: string;
}

export interface FavoriteCollection {
  id: number;
  userId: number;
  name: string;
  description?: string;
  isPublic: boolean;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFavoriteRequest {
  adId: number;
  collectionId?: number;
  notes?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
