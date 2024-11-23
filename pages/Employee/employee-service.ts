import { da } from "element-plus/es/locale/index.mjs";
import type { CompanyProfileDTO } from "~/models/dtos/CompanyProfileDTO";
import Api from "~/service/Base/api";
import { JobStatus, type JobPostingDTO } from "~/models/dtos/JobPostingDTO";
import type { Pagination } from "~/models/entities/Pagination";
import type { UserResumeDetailDTO } from "~/models/dtos/UserResumeDetailDTO";
import type { FollowUniDTO } from "~/models/dtos/FollowUniDTO";
import { HttpStatusCode } from "axios";
import type { MessageDTO } from "~/models/dtos/ChatDTO";
export default class EmployeeServiceApi extends Api {

    public userResumeDetail = 'UserResumeDetail/';
    public jobPostEndpoint = 'JobPosting/';
    public cvEndpoint = 'CV/';
    public followUniEndpoint = 'FollowUni/';
    public chatEndpoint = 'Chat/';
    public messageEndpoint = 'Message/';

    /**
     * 1.1 View User Resume Detail
     * Method: GET
     * Endpoint: /api/employee/profile
     * Description: Fetches the details of the user resume associated with the logged-in employee.
     */
    viewUserResumeDetail(params: any) {
        return this.get(`${this.userResumeDetail}current`, params);
    }

    getUserAppliedJobpost() {
        return this.get(`${this.jobPostEndpoint}get-user-applied-jobpost`, {});
    }

    /**
     * 1.2 Create User Resume Detail
     * Method: POST
     * Endpoint: /api/employee/profile
     * Description: Inserts a new user resume detail.
     */
    createUserResumeDetail(dto: UserResumeDetailDTO) {
        return this.postAPI(`${this.userResumeDetail}`, dto);
    }

    /**
     * 1.3 Update User Resume Detail
     * Method: PUT
     * Endpoint: /api/employee/profile/{id}
     * Description: Updates the user resume detail with the given ID.
     */
    updateUserResumeDetail(id: number, dto: UserResumeDetailDTO) {
        return this.putAPI(`${this.userResumeDetail}${id}`, dto);
    }

    /**
     * 1.4 Delete User Resume Detail
     * Method: DELETE
     * Endpoint: /api/employee/profile/{id}
     * Description: Deletes the user resume detail with the given ID.
     */
    deleteUserResumeDetail(id: number) {
        return this.deleteById(`${this.userResumeDetail}`, id);
    }

    userUnFollowCompany(followUniDTO: FollowUniDTO) {
        return this.deleteByRecord(`${this.followUniEndpoint}`, followUniDTO);
    }

    userFollowCompany(followUniDTO: FollowUniDTO) {
        return this.postAPI(`FollowUni`, followUniDTO);
    }

    allCompanyIdUserFollow() {
        return this.get(`${this.followUniEndpoint}company-user-followed`, {});
    }

    public async getUserChatbox(): Promise<ResponseFormat> {
        try {
            let responseData: ResponseFormat = await this.get(`${this.chatEndpoint}get-user-chatbox`, {});
            return responseData;
        } catch (error: any) {
            console.error('Error getting user chatbox:', error);
            return error
        }
    }

    public addMessage(message: MessageDTO): ResponseFormat {
        try {
            let responseData: any = this.postAPI(`${this.messageEndpoint}`, message);
            return responseData;
        } catch (error: any) {
            console.error('Error getting user chatbox:', error);
            return error
        }
    }
};
