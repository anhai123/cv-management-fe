import type { CvDTO } from "./CvDTO";
import type { JobPostingDTO } from "./JobPostingDTO";

export interface CvAndJobpostDTO {
    cvDTO?: CvDTO;
    jobPostingDTO?: JobPostingDTO;
}
