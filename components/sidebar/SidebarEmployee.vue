<template>
    <div class="sidebar">
        <ul class="navbar-nav justify-content-end flex-grow-1">
            <li class="nav-item ps-4">
                <a class="nav-link" aria-current="page" href="#"></a>
            </li>

            <!-- TODO: Modify this to display the job notification emited to the followed user -->
            <li class="nav-item d-flex align-items-center">
                <a class="text-primary text-decoration-none fw-bold ps-4" aria-current="page" href="#"
                    @click.prevent="toggleNotification">Module</a>
                <div class="wishlist-dropsec ms-2 ps-4">
                    <span class="bg-primary"><i class="la la-heart"></i><strong>{{ notifications.filter(noti =>
                        !noti.isRead).length
                            }}</strong></span>
                    <div class="wishlist-dropdown" v-show="isDisplayNotification"
                        :class="{ 'd-block': isDisplayNotification }">
                        <ul class="scrollbar list-unstyled">
                            <li v-for="noti in notifications" @click="updateReadStatus(noti)">
                                <div :class="['job-listing', { 'bg-primary-subtle': !noti.isRead }]">
                                    <div class="job-title-sec">
                                        <div class="c-logo" style="min-height: 50px;"> <img
                                                :src="noti.companyProfileUrl || ''" alt="" /> </div>
                                        <h3><a href="#" title="">{{ noti.jobPosting.jobTitle }}</a></h3>
                                        <span>{{ noti.jobPosting.offeredSalary }}</span>
                                    </div>
                                </div><!-- Job -->
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            <NuxtLink to="/employee/home" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2">
                    <i class="bi bi-house text-primary"></i> Home
                </div>
            </NuxtLink>
            <NuxtLink to="/employee/profile" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2">
                    <i class="bi bi-building text-info"></i> My Profile
                </div>
            </NuxtLink>
            <NuxtLink to="/employee/resume" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2"> <i class="bi bi-briefcase-fill text-success"></i>My resume</div>
            </NuxtLink>
            <NuxtLink to="/employee/applied-job" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2"> <i class="bi bi-file-earmark-text-fill text-danger"></i> Applied job</div>
            </NuxtLink>

            <NuxtLink to="/employee/chat" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2"> <i class="bi bi-chat-dots-fill text-warning"></i> Chatbot</div>
            </NuxtLink>

            <NuxtLink to="/employee/video" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2"> <i class="bi bi-phone text-warning"></i> Video Calling</div>
            </NuxtLink>


        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { apiFactory } from '~/plugins/api';

const router = useRouter();

const connectionNotification = ref(null);
const isDisplayNotification = ref(false);
const notifications = ref([]);

const toggleNotification = () => {
    isDisplayNotification.value = !isDisplayNotification.value;
};



//TODO: Implement the notification hub, push the totification to array for display
onMounted(async () => {


    //get all the followed company and add user to the group of that compant
    let dataQuery = await apiFactory.employeeService.allCompanyIdUserFollow();

    let notiQuery = await apiFactory.notificationService.getNotification();
    console.log(notiQuery.data.responseData);

    let companyIds = dataQuery.data.responseData;


    companyIds.forEach(async (companyId) => {
        console.log("Company id:" + companyId);
        await apiFactory.notificationService.addUserToGroup(companyId.toString());
    });

    apiFactory.notificationService.onReceiveNotification((jobPstingDTO) => {
        console.log("receiving notification")
        console.log(jobPstingDTO)
        // alert(jobPstingDTO);
        let notificationEntity = {
            jobPosting: jobPstingDTO,
            isRead: false,
            // id: jobPstingDTO.id,
            createdAt: jobPstingDTO.createdAt,
            updatedAt: jobPstingDTO.updatedAt,
            appUserId: jobPstingDTO.appUserId,
            companyProfileUrl: jobPstingDTO.companyProfileUrl,
            jobPostingId: jobPstingDTO.jobPostingId,
            message: jobPstingDTO.message
        }
        notifications.value.push(notificationEntity);
    });

    notifications.value = notiQuery.data.responseData
});

const updateReadStatus = (notificationDTO) => {
    notificationDTO.isRead = true;
    apiFactory.notificationService.updateNotification(notificationDTO.id, notificationDTO);
    isDisplayNotification.value = false;
    router.push(`/Employer/job-detail/${notificationDTO.jobPostingId}`);
}
</script>

<style scoped>
@import url('/assets/css/bootstrap-grid.css');
@import url('/assets/css/icons.css');
@import url('/assets/css/animate.min.css');
@import url('/assets/css/style.css');
@import url('/assets/css/responsive.css');
@import url('/assets/css/chosen.css');
@import url('/assets/css/colors/colors.css');
</style>
