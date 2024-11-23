export interface Pagination {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPage: number;
    totalApplications?: number;
    activeJobs?: number;

    createdAt: '',
    employmentType: string[],
    offeredSalaryFrom: string,
    offeredSalaryTo: string,
    experience: string[],
    gender: string[],
    qualification: string[],
}
