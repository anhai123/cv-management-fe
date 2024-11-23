export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken || typeof jwtToken !== 'string' || jwtToken.trim() === '') {
            return navigateTo('/');
        }
    }
});
