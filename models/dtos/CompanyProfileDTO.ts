export interface CompanyProfileDTO {
    id: string;
    appUserId: string;           // ID of the user associated with the company
    imageUrl: string;            // URL for the image (empty string if not uploaded)
    companyName: string;         // Company name
    since: string;               // Since year (can be string if date parsing is not required)
    teamSize: string;            // Team size (can be a range as a string)
    categories: string[];              // Array of tags
    description: string;         // Description or bio
    facebook: string;            // Facebook URL
    twitter: string;             // Twitter URL
    google: string;              // Google+ URL
    linkedin: string;            // LinkedIn URL
    phoneNumber: string;         // Phone number
    email: string;               // Email address
    website: string;             // Website URL
    address: string;             // Physical address
}
