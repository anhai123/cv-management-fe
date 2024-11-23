import { da } from "element-plus/es/locale/index.mjs";
import type { CompanyProfileDTO } from "~/models/dtos/CompanyProfileDTO";
import Api from "~/service/Base/api";
import { JobStatus, type JobPostingDTO } from "~/models/dtos/JobPostingDTO";


interface Account {
    id?: string;
    email: string;
    fullName: string;
    phone: string;
    imageUrl: string;
    // add other account properties as needed
}

interface Pagination {
    pageNumber: number;
    pageSize: number;
    // add other pagination properties as needed
}

interface ChangePasswordRequest {
    accountId: string;
    oldPassword: string;
    newPassword: string;
}
export default class AccountServiceApi extends Api {

    public accountEndpoint = 'Account/';


    /**
  * Register a new account
  * Method: POST
  * Endpoint: /api/Account/register
  */
    async registerAccount(account: Account) {
        return this.postAPI(`${this.accountEndpoint}register`, account);
    }

    /**
     * Login to an account
     * Method: POST
     * Endpoint: /api/Account/login
     */
    async loginAccount(email: string, password: string) {
        return this.postAPI(`${this.accountEndpoint}login`, { email, password });
    }

    /**
     * Logout from an account
     * Method: POST
     * Endpoint: /api/Account/logout
     */
    async logoutAccount() {
        return this.postLogOut(`${this.accountEndpoint}logout`);
    }

    /**
     * Change account password
     * Method: PUT
     * Endpoint: /api/Account/changePassword
     */
    async changePassword(request: ChangePasswordRequest) {
        return this.putAPI(`${this.accountEndpoint}changePassword`, request);
    }

    /**
     * Get all accounts
     * Method: GET
     * Endpoint: /api/Account/All
     */
    async getAllAccounts() {
        return this.get(`${this.accountEndpoint}All`, {});
    }

    /**
     * Get all accounts with pagination
     * Method: GET
     * Endpoint: /api/Account/Pagination
     */
    async getAllAccountsWithPagination(pagination: Pagination) {
        return this.get(`${this.accountEndpoint}Pagination`, { params: pagination });
    }

    /**
     * Get accounts by name
     * Method: GET
     * Endpoint: /api/Account/searchByName/{name}
     */
    async getAccountsByName(name: string) {
        return this.get(`${this.accountEndpoint}searchByName/${name}`, {});
    }

    /**
     * Get account by email
     * Method: GET
     * Endpoint: /api/Account/{email}
     */
    async getAccountByEmail(email: string) {
        return this.get(`${this.accountEndpoint}${email}`, {});
    }

    /**
     * Get account by ID
     * Method: GET
     * Endpoint: /api/Account/findbyid/{id}
     */
    async getAccountById(id: string) {
        return this.get(`${this.accountEndpoint}findbyid/${id}`, {});
    }

    /**
     * Get account ID by email
     * Method: GET
     * Endpoint: /api/Account/getId/{email}
     */
    async getAccountId(email: string) {
        return this.get(`${this.accountEndpoint}getId/${email}`, {});
    }

    /**
     * Update an account
     * Method: PUT
     * Endpoint: /api/Account/{id}
     */
    async updateAccount(id: string, account: Account) {
        return this.putAPI(`${this.accountEndpoint}${id}`, account);
    }

    /**
     * Update account password
     * Method: PUT
     * Endpoint: /api/Account/editPassword/{id}
     */
    async updatePassword(id: string, password: string) {
        return this.putAPI(`${this.accountEndpoint}editPassword/${id}`, { password });
    }

    /**
     * Delete an account
     * Method: DELETE
     * Endpoint: /api/Account/{id}
     */
    async deleteAccount(id: string) {
        return this.deleteById(`${this.accountEndpoint}`, Number(id));
    }
};
