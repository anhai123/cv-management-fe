export interface CvDTO {
    NameCandidate: string;
    PhoneNumber: string;
    Email: string;
    School: string;
    YearOfBirth: string;
    SourceOfCV?: string;
    DateReceiveCV?: Date;
    TimeOfInterview?: string;
    DateOfInterview?: Date;
    ReviewCV?: string;
    Status?: string;
    CVEvaluate?: string;
    CVNote?: string;
    Rate?: string;
    DateAcceptJob?: Date;
    PositionId: number;
    PositionName?: string;
    SourceId: number;
    AppUserId?: string;
    JobPostingId: number;
    IsSendMail?: string;
    ColumnId?: number;
    MailContent?: string;
    IsSelectedToSendMail?: boolean;
    IsEmailContendUpdated?: boolean;
}
