<template>
    <div class="padding-left">
        <div class="manage-jobs-sec">
            <h3>Manage Jobs</h3>
            <table>
                <thead>
                    <tr>
                        <td>Công việc đã ứng tuyển</td>
                        <td>Vị trí</td>
                        <td>Ngày</td>
                        <td>Trạng thái</td>
                        <td>Hành động</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in userAppicationAndJobPost" :key="item.jobPostingDTO.id">
                        <td>
                            <div class="table-list-title">
                                <i>{{ item.jobPostingDTO.username }}</i><br />
                                <span><i class="la la-map-marker"></i>{{ item.jobPostingDTO.address }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="table-list-title">
                                <h3><a href="#" title="">{{ item.jobPostingDTO.jobTitle }}</a></h3>
                            </div>
                        </td>
                        <td>
                            <span>{{ new Date(item.jobPostingDTO.createdAt).toLocaleDateString() }}</span><br />
                        </td>
                        <td>
                            <span>{{ item.cvDTO.status }}</span><br />
                        </td>
                        <td>
                            <ul class="action_job list-unstyled">
                                <li class=""><span>Delete</span><a href="#" title=""><i class="la la-trash-o"></i></a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { apiFactory } from '~/plugins/api';

const employeeService = apiFactory.employeeService;
const userAppicationAndJobPost = ref([
    { cvDTO: {}, jobPostingDTO: {} }]);
const getUserAppliedJobpost = async () => {
    try {
        const response = await employeeService.getUserAppliedJobpost();
        console.log(response.data.responseData);
        userAppicationAndJobPost.value = response.data.responseData;
    } catch (error) {
        console.error('Error fetching applied job posts:', error);
    }
};

onMounted(() => {
    getUserAppliedJobpost();
});
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
