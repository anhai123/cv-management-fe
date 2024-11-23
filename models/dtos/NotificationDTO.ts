import type { JobPostingDTO } from "./JobPostingDTO";
export interface NotificationDTO {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    appUserId: string;
    companyProfileUrl?: string;
    jobPostingId: number;
    message?: string;
    jobPosting?: JobPostingDTO;
    isRead: boolean;
}
