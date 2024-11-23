import { jwtDecode } from 'jwt-decode';
import constants from '../assets/js/constants/constants.js';

export default defineNuxtRouteMiddleware((to, from) => {
    const router = useRouter();
    if (process.client) {
        const jwtToken = localStorage.getItem('token');

        // Check if jwtToken is a string and not empty
        if (typeof jwtToken !== 'string' || jwtToken.trim() === '') {
            return navigateTo('/'); // Exit the middleware if no token is found
        }

        const decodedToken = jwtDecode(jwtToken);
        let role = decodedToken.Role.toLowerCase();

        // Define role-based access rules
        const roleAccess = {
            admin: ['/admin', '/dashboard', '/account', "/cv", "/Source", "/Position", "/kanban"],
            employer: ['/employer/company-profile', '/employer/manage-jobs', "/employer/post-job"],
            employee: ['/employee', '/dashboard']
        };

        // Check if the target route is allowed for the user's role
        const allowedRoutes = roleAccess[role];
        console.log(role);
        if (!allowedRoutes || !allowedRoutes.includes(to.path)) {
            return navigateTo('/');
        }
    }
});
