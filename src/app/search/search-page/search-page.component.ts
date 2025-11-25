import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search.service';
import { SearchFilters, SearchResult, SortOption, SortOrder, ItemCondition, PostedWithin } from '../search';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  results: SearchResult[] = [];
  filters: SearchFilters = {};
  isLoading = false;
  errorMessage = '';
  totalResults = 0;
  currentPage = 1;
  pageSize = 20;
  totalPages = 0;

  // Enums for template
  sortOptions = Object.values(SortOption);
  itemConditions = Object.values(ItemCondition);
  postedWithinOptions = Object.values(PostedWithin);

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters.keyword = params['q'] || '';
      this.filters.categoryId = params['category'] ? +params['category'] : undefined;
      this.filters.location = params['location'] || '';
      this.search();
    });
  }

  search(): void {
    this.isLoading = true;
    this.searchService.search(this.filters, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.results = data.results;
        this.totalResults = data.total;
        this.totalPages = data.totalPages;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.search();
  }

  clearFilters(): void {
    this.filters = {
      keyword: this.filters.keyword
    };
    this.search();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.search();
  }

  sortResults(sortBy: SortOption, sortOrder: SortOrder): void {
    this.filters.sortBy = sortBy;
    this.filters.sortOrder = sortOrder;
    this.search();
  }
}
