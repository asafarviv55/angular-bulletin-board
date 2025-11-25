import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { UserProfile } from '../profile';

@Component({
  selector: 'app-profile-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  profile!: UserProfile;
  isLoading = true;
  errorMessage = '';
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadProfile();
    });
  }

  loadProfile(): void {
    this.isLoading = true;
    this.profileService.getProfile(this.userId).subscribe({
      next: (data) => {
        this.profile = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  getVerificationBadgeClass(): string {
    const statusMap: { [key: string]: string } = {
      'UNVERIFIED': 'unverified',
      'EMAIL_VERIFIED': 'email-verified',
      'PHONE_VERIFIED': 'phone-verified',
      'FULLY_VERIFIED': 'fully-verified'
    };
    return statusMap[this.profile.verificationStatus] || 'unverified';
  }
}
