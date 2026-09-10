export interface DemoService {
  id: string;
  name_en: string;
  name_hi: string;
  slug: string;
  icon: string;
  demoPrice?: number;
}

export interface DemoProvider {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  verified: boolean;
  skills: string[];
  happyCustomerCount: number;
  availabilityStatus: "available" | "busy" | "offline";
  latitude: number;
  longitude: number;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  subscriptionStatus?: "active" | "inactive";
  kycStatus?: "verified" | "pending" | "rejected";
}

export interface DemoCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export type RequestStatus =
  | "idle"
  | "matching"
  | "offered"
  | "accepted"
  | "on_the_way"
  | "arrived";

export interface DemoRequest {
  id: string;
  customerId: string;
  serviceId: string;
  description: string;
  photoUrl?: string;
  location: { address: string; lat: number; lng: number };
  status: RequestStatus;
  createdAt: Date;
  amount?: number;
}

export type JobStatus =
  | "CREATED"
  | "MATCHING"
  | "OFFERED"
  | "ACCEPTED"
  | "ON_THE_WAY"
  | "ARRIVED"
  | "COMPLETION_PENDING"
  | "COMPLETED"
  | "PAYMENT_PENDING"
  | "PAID"
  | "REVIEWED"
  | "CANCELLED";

export interface DemoJob {
  id: string;
  serviceRequestId: string;
  providerId: string;
  customerId: string;
  serviceId: string;
  status: JobStatus;
  acceptedAt?: Date;
  arrivedAt?: Date;
  completedAt?: Date;
  etaMinutes?: number;
  distanceKm?: number;
  amount?: number;
  commissionAmount?: number;
  paymentMethod?: "online" | "cash";
  completionPhotoUrl?: string;
}

export interface DemoTransaction {
  id: string;
  type: "job_payment" | "commission" | "settlement" | "penalty" | "refund" | "withdrawal";
  amount: number;
  description: string;
  referenceId: string;
  createdAt: Date;
  direction: "credit" | "debit";
  balanceAfter?: number;
}

export interface DemoComplaint {
  id: string;
  jobId: string;
  customerId: string;
  providerId: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: Date;
}

export interface DemoAdminMetrics {
  newUsersToday: number;
  totalProviders: number;
  verifiedProviders: number;
  activeJobs: number;
  completedJobsToday: number;
  revenueToday: number;
  commissionToday: number;
  profitToday: number;
  pendingVerifications: number;
  openComplaints: number;
}
