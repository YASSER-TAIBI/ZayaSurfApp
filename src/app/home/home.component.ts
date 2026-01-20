import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

interface GoogleReviewsResponse {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

const MANUAL_REVIEW: GoogleReview = {
  author_name: 'Ali Kourbali',
  rating: 5,
  relative_time_description: 'Recently',
  text: 'Amazing hosts, great surf coaching, and the best sunsets on the terrace. I felt at home from day one.'
};

const FALLBACK_REVIEWS: GoogleReview[] = [
  MANUAL_REVIEW
];

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  reviews: GoogleReview[] = [];
  reviewsRating = 0;
  reviewsTotal = 0;
  reviewsLoading = true;
  reviewsError = '';
  reviewsPage = 0;
  reviewsPageSize = 3;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.updateReviewsPageSize();
    this.loadReviews();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateReviewsPageSize();
  }

  onActivityToggle(event: Event): void {
    const target = event.target as HTMLDetailsElement | null;
    if (!target || !target.open) {
      return;
    }

    const panels = target.parentElement?.querySelectorAll<HTMLDetailsElement>('details.activity-panel');
    panels?.forEach((panel) => {
      if (panel !== target) {
        panel.open = false;
      }
    });
  }

  getStars(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  getInitials(name: string): string {
    const cleaned = name?.trim() || '';
    if (!cleaned) {
      return '??';
    }
    const parts = cleaned.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const second = parts[1]?.[0] ?? parts[0]?.[1] ?? '';
    return `${first}${second}`.toUpperCase();
  }

  get visibleReviews(): GoogleReview[] {
    const start = this.reviewsPage * this.reviewsPageSize;
    return this.reviews.slice(start, start + this.reviewsPageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.reviews.length / this.reviewsPageSize));
  }

  nextReviews(): void {
    this.reviewsPage = (this.reviewsPage + 1) % this.totalPages;
  }

  prevReviews(): void {
    this.reviewsPage = (this.reviewsPage - 1 + this.totalPages) % this.totalPages;
  }

  private loadReviews(): void {
    this.http.get<GoogleReviewsResponse>('http://localhost:5050/api/reviews').subscribe({
      next: (response) => {
        const cleaned: GoogleReview[] = (response.reviews ?? [])
          .filter((review) => review.text?.trim())
          .map((review) => ({
            ...review,
          }));
        const limited = cleaned.slice(0, 6);
        if (limited.length < 6) {
          limited.push(MANUAL_REVIEW);
        }
        this.reviews = limited;
        this.reviewsRating = response.rating ?? 0;
        this.reviewsTotal = response.user_ratings_total ?? this.reviews.length;
        this.reviewsLoading = false;
        this.reviewsPage = 0;
      },
      error: () => {
        this.reviewsError = 'Impossible de charger les avis pour le moment. Affichage des avis récents.';
        this.reviews = FALLBACK_REVIEWS;
        this.reviewsTotal = FALLBACK_REVIEWS.length;
        this.reviewsRating = FALLBACK_REVIEWS.reduce((sum, review) => sum + review.rating, 0) / FALLBACK_REVIEWS.length;
        this.reviewsLoading = false;
        this.reviewsPage = 0;
      }
    });
  }

  private updateReviewsPageSize(): void {
    const isMobile = window.innerWidth <= 768;
    this.reviewsPageSize = isMobile ? 1 : 3;
    this.reviewsPage = 0;
  }
}
