export enum EmploymentType {
    FullTime = 'Full-time',
    PartTime = 'Part-time',
    Contract = 'Contract',
    Temporary = 'Temporary',
    Internship = 'Internship'
}

export enum ExperienceLevel {
    Entry = 'Entry',
    MidLevel = 'Mid-Level',
    Senior = 'Senior',
    Executive = 'Executive'
}

export enum EducationLevel {
    HighSchool = "High School",
    BachelorsDegree = "Bachelor's Degree",
    MastersDegree = "Master's Degree",
    PhD = "PhD"
}

export interface JobPostingDTO {
    id: number;                           // Primary key
    companyId: number;                    // Reference to Companies table
    jobTitle: string;                     // Maps to 'jobTitle'
    description: string;                  // Maps to 'description'
    contactEmail: string;                 // Maps to 'contactEmail'
    username: string;                     // Maps to 'username'
    categories: string[];                   // Maps to 'categories'
    offeredSalary: string;                // Maps to 'offeredSalary'                 // Maps to 'careerLevel'
    experience: ExperienceLevel;                   // Maps to 'experience'
    gender: string;                       // Maps to 'gender'
    industry: string;                     // Maps to 'industry'
    qualification: EducationLevel;                // Maps to 'qualification'
    skills: string[];                     // Maps to 'skills', stored as an array
    address: string;
    employmentType: EmploymentType          // Maps to 'address'
    status: JobStatus;                       // Maps to 'status'
    applicationDeadline: Date;            // Maps to 'applicationDeadline'
    createdAt: Date;                      // Maps to 'createdAt'
    totalApplication: number;             // Maps to 'totalApplication'
    benefits: string  // job benefit;
    workingHours: string // job working hours;
}
export enum JobStatus {
    Activate = 1,
    Deactivate = 2
}

export function getJobStatus(value: number): string | undefined {
    switch (value) {
        case JobStatus.Activate:
            return 'Activate';
        case JobStatus.Deactivate:
            return 'Deactivate';
        default:
            return undefined;
    }
}
