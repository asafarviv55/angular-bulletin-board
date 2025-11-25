import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Favorite, FavoriteCollection } from '../favorite';

@Component({
  selector: 'app-favorites-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  favorites: Favorite[] = [];
  collections: FavoriteCollection[] = [];
  selectedCollection: FavoriteCollection | null = null;
  isLoading = true;
  errorMessage = '';
  currentUserId = 1; // This would come from auth service

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.loadFavorites();
    this.loadCollections();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.favoritesService.getFavorites(this.currentUserId).subscribe({
      next: (data) => {
        this.favorites = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  loadCollections(): void {
    this.favoritesService.getCollections(this.currentUserId).subscribe({
      next: (data) => {
        this.collections = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  filterByCollection(collection: FavoriteCollection): void {
    this.selectedCollection = collection;
    this.isLoading = true;
    this.favoritesService.getFavoritesByCollection(collection.id).subscribe({
      next: (data) => {
        this.favorites = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  clearFilter(): void {
    this.selectedCollection = null;
    this.loadFavorites();
  }

  removeFavorite(favoriteId: number): void {
    if (confirm('Are you sure you want to remove this favorite?')) {
      this.favoritesService.removeFavorite(favoriteId).subscribe({
        next: () => {
          this.favorites = this.favorites.filter(fav => fav.id !== favoriteId);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}
