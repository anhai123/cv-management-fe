import { da } from "element-plus/es/locale/index.mjs";
import type { CompanyProfileDTO } from "~/models/dtos/CompanyProfileDTO";
import Api from "~/service/Base/api";
import { JobStatus, type JobPostingDTO } from "~/models/dtos/JobPostingDTO";
import type { Pagination } from "~/models/entities/Pagination";
export default class EmployerServiceApi extends Api {

    public companyProfileEndpoint = 'CompanyProfile/';
    public jobPostEndpoint = 'JobPosting/';
    public cvEndpoint = 'CV/';

    /**
     * 1.1 View Company Profile
     * Method: GET
     * Endpoint: /api/employer/profile
     * Description: Fetches the details of the company profile associated with the logged-in employer.
     */
    viewCompanyProfile(params: any) {
        return this.get(`${this.companyProfileEndpoint}current`, params);
    }

    getCompanyProfileById(companyId: string, params: any) {
        return this.get(`${this.companyProfileEndpoint}${companyId}`, params);
    }

    /**
     * 1.2 Update Company Profile
     * Method: PUT
     * Endpoint: /api/employer/profile
     * Description: Updates the company profile with new information.
     * @param profileData - The new company profile data to update.
     */
    updateCompanyProfile(profileData: CompanyProfileDTO) {
        return this.putAPI(`${this.companyProfileEndpoint}${profileData.id}`, profileData);
    }

    getAllJobs(params: Pagination) {
        const queryParams = new URLSearchParams(params as any).toString();
        console.log(queryParams);

        const endpoint = `${this.jobPostEndpoint}GetAllPagination?${queryParams}`;

        return this.get(endpoint, params);
    }



    /**
     * 2.1 List All Jobs Posted by Employer
     * Method: GET
     * Endpoint: /api/JObPost/GetAllPagination/companyId
     * Description: Retrieves all the jobs posted by the logged-in employer.
     */
    listAllJobs(params: Pagination, companyId: string) {
        const queryParams = new URLSearchParams(params as any).toString();
        console.log(queryParams);

        const endpoint = `${this.jobPostEndpoint}GetAllPagination/${companyId}?${queryParams}`;

        return this.get(endpoint, params);
    }

    /**
     * 2.2 Get Job Details
     * Method: GET
     * Endpoint: /api/JobPosting/{jobId}
     * Description: Fetches details of a specific job posted by the employer.
     * @param jobId - The ID of the job to fetch details for.
     */
    getJobDetails(jobId: string, params: any) {
        return this.get(`${this.jobPostEndpoint}${jobId}`, params);
    }

    /**
     * 2.3 Post a New Job
     * Method: POST
     * Endpoint: /api/JobPosting
     * Description: Posts a new job listing for the company.
     * @param jobData - The data of the new job to post.
     */
    postNewJob(jobData: JobPostingDTO) {
        return this.postAPI(`${this.jobPostEndpoint}`, jobData);
    }

    /**
     * 2.4 Update a Job
     * Method: PUT
     * Endpoint: /api/JobPosting/{jobId}
     * Description: Updates the details of an existing job listing.
     * @param jobId - The ID of the job to update.
     * @param jobData - The new data for the job.
     */
    updateJob(jobId: string, jobData: JobPostingDTO) {
        return this.putAPI(`${this.jobPostEndpoint}${jobId}`, jobData);
    }

    /**
     * 2.6 Deactivate/Activate Job
     * Method: PATCH
     * Endpoint: /api/JobPosting/{jobId}/status
     * Description: Deactivates or activates a job listing.
     * @param jobId - The ID of the job to update the status for.
     * @param statusData - The status data to update.
     */
    updateJobStatus(jobId: string, statusData: JobStatus) {
        return this.putAPI(`${this.jobPostEndpoint}${jobId}/status`, { status: statusData });
    }
};
