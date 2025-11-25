export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  bio: string;
  location: string;
  website?: string;
  joinedDate: string;
  lastLoginDate: string;
  totalAds: number;
  activeAds: number;
  rating: number;
  reviewCount: number;
  verificationStatus: VerificationStatus;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  showEmail: boolean;
  showPhoneNumber: boolean;
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  PHONE_VERIFIED = 'PHONE_VERIFIED',
  FULLY_VERIFIED = 'FULLY_VERIFIED'
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
  location: string;
  website?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
