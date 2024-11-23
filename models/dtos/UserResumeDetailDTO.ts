export enum ResumeDetailType {
    Education,
    WorkExperience,
    ProfessionalSkill
}

export interface UserResumeDetailDTO {
    detailType: ResumeDetailType;  // Enum to differentiate types
    title?: string;
    period?: string;
    description?: string;
    appUserId?: string;
    // Optional fields for Education and WorkExperience
    institution?: string;
    degree?: string;
    company?: string;
}
