export class UserInformationLocal {
    private static readonly ROLE_KEY = 'userRole';
    private static readonly FULL_NAME_KEY = 'userFullName';
    private static readonly ACCOUNT_ID_KEY = 'accountId';

    static setUserInformation(role: string, userFullName: string, accountId: string): void {
        localStorage.setItem(this.ROLE_KEY, role);
        localStorage.setItem(this.FULL_NAME_KEY, userFullName);
        localStorage.setItem(this.ACCOUNT_ID_KEY, accountId);
    }

    static getUserInformation(): { role: string | null, userFullName: string | null, accountId: string | null } {
        const role = localStorage.getItem(this.ROLE_KEY);
        const userFullName = localStorage.getItem(this.FULL_NAME_KEY);
        const accountId = localStorage.getItem(this.ACCOUNT_ID_KEY);

        return { role, userFullName, accountId };
    }

    static clearUserInformation(): void {
        localStorage.removeItem(this.ROLE_KEY);
        localStorage.removeItem(this.FULL_NAME_KEY);
        localStorage.removeItem(this.ACCOUNT_ID_KEY);
    }
}
