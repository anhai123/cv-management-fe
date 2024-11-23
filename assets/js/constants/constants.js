
const CV_CONSTANT = {
    REVIEW_CV_WAITING: "Đang chờ xem xét hồ sơ",
    REVIEW_CV_FAIL: "Không đủ điều kiện",
    REVIEW_CV_PASS: "Đủ điều kiện",
    REFUSED_TO_BE_INTERVIEWED: "Từ chối phỏng vấn",
    INTERVIEW_RES_FAIL: "Không đạt phỏng vấn",
    INTERVIEW_RES_PASS: "Đạt phỏng vấn",
    REFUSE_TO_ACCEPT_JOB: "Từ chối nhận việc",
    GET_JOB: "Đã nhận việc",
    INTERVIEW_RES_BACKUP: "Kết quả phỏng vấn dự phòng",
    NOT_SENT: "NOT_SENT",
    SENDING: "SENDING",
    SENT: "SENT",
    GMAIL: {
        CC_DEFAULT: "lenguyenhaianh0808@gmail.com",
        BCC_DEFAULT: "BCC"
    },
    ADMIN: "Admin",
    null_dat: {
        NULL: 'Chưa có'
    },
    Search: {
        REVIEW_CV_WAITING: "Đang chờ xem xét hồ sơ",
        REVIEW_CV_FAIL: "Không đủ điều kiện",
        REVIEW_CV_PASS: "Đủ điều kiện",
        REFUSED_TO_BE_INTERVIEWED: "Từ chối phỏng vấn",
        INTERVIEW_RES_FAIL: "Không đạt phỏng vấn",
        INTERVIEW_RES_PASS: "Đạt phỏng vấn",
        REFUSE_TO_ACCEPT_JOB: "Từ chối nhận việc",
        GET_JOB: "Đã nhận việc",
        INTERVIEW_RES_BACKUP: "Kết quả phỏng vấn dự phòng",
    },
    UnknownStr: 'Unknown',
    DefaultColumnTitle: {
        REVIEW_CV_WAITING: "Waiting review",
        REVIEW_CV_FAIL: "Review failed",
        REVIEW_CV_PASS: "Review pass",
        INTERVIEW_RES_FAIL: "Interview fail",
        INTERVIEW_RES_PASS: "Interview pass",
        BACKUP: "Interview backup",
        UNKNOWN: "Unknown",
    },

}

const ROLE = {
    ADMIN: "Admin",
    ADMIN_ID: 1,
    EMPLOYER: "Employer",
    ADMIN_ID: 2,
    EMPLOYEE: "Employee",
    EMPLOYEE_ID: 3,
}
export const JobTypes = {
    FullTime: 'Full-time',
    PartTime: 'Part-time',
    Contract: 'Contract',
    Temporary: 'Temporary',
    Internship: 'Internship'
};
export const CreatedAtOptions = {
    LastHour: 'Last Hour',
    Last24Hours: 'Last 24 hours',
    Last7Days: 'Last 7 days',
    Last14Days: 'Last 14 days',
    Last30Days: 'Last 30 days',
    All: 'All'
}

export const ExperienceLevels = {
    Entry: 'Entry',
    MidLevel: 'Mid-Level',
    Senior: 'Senior',
    Executive: 'Executive'
}
export const EducationLevels = {
    HighSchool: "High School",
    BachelorsDegree: "Bachelor's Degree",
    MastersDegree: "Master's Degree",
    PhD: "PhD"
}



export { ROLE }
export default CV_CONSTANT
