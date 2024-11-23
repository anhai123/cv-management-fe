<template>
    <section class="manage-jobs-sec padding-left card" style="min-height: 100%;">
        <h3>Quản Lý bài đăng tuyển</h3>
        <div class="extra-job-info d-flex gap-2">
            <span><i class="la la-clock-o"></i><strong>{{ pagination.totalCount }}</strong> Công Việc Đã Đăng</span>
            <span><i class="la la-file-text"></i><strong>{{ pagination.totalApplications }}</strong>Tổng số đơn ứng
                tuyển</span>
            <span><i class="la la-users"></i><strong>{{ pagination.activeJobs }}</strong> Công việc active</span>
        </div>
        <div class="manage-jobs-sec">
            <table>
                <thead>
                    <tr>
                        <td>Tiêu Đề</td>
                        <td>Đơn Ứng Tuyển</td>
                        <td>Ngày Tạo & Hết Hạn</td>
                        <td>Trạng Thái</td>
                        <td>Hành Động</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="job in listPostedJob" :key="job.id">
                        <td>
                            <div class="table-list-title">
                                <h3><a href="#" @click.prevent="navigateToKanban(job.id)" title="">{{ job.jobTitle
                                        }}</a></h3>
                                <span><i class="la la-map-marker"></i>{{ job.address }}</span>
                            </div>
                        </td>
                        <td>
                            <span class="applied-field">{{ job.totalApplication }}+ Đã Ứng Tuyển</span>
                        </td>
                        <td>
                            <span>{{ new Date(job.createdAt).toLocaleDateString() }}</span><br />
                            <span>{{ new Date(job.applicationDeadline).toLocaleDateString() }}</span>
                        </td>
                        <td>
                            <span class="status">{{ getJobStatus(job.status) }}</span>
                        </td>
                        <td>
                            <ul class="action_job list-unstyled">
                                <li><span>Xem Công Việc</span><a :href="`/Employer/job-detail/${job.id}`" title=""><i
                                            class="la la-eye"></i></a></li>

                                <li><span>Chỉnh Sửa</span><a :href="`/Employer/Postjob/${job.id}`" title=""><i
                                            class="la la-pencil"></i></a></li>

                                <li><span>Danh sách CV ứng tuyển</span><a href="#" title=""><i class="la la-file"
                                            @click="navigateToCvsOfJob(job.id)"></i></a></li>

                                <li @click="openModelDeleteJobs(job.id)" data-bs-toggle="modal"
                                    data-bs-target="#deleteJobModal">
                                    <span>Xóa</span><a href="#" title=""><i class="la la-trash-o"></i></a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
                <div class="d-flex justify-content-between mt-4">
                    <div class="d-flex align-items-center">
                        <span class="me-5">Tổng số công việc đã đăng: {{ totalCount }} công việc</span>
                        <span>
                            <Pagination :current-page="pageNumber" :total-pages="pageTotal" :next-page="nextPage"
                                :previous-page="previousPage" :set-page="setPage" />
                        </span>
                    </div>
                </div>
            </table>
            <DeleteJobpostModal :sourceId="selectedJobId" @source-deleted="getJobs" @hide-modal="getJobs()" />
        </div>
    </section>
</template>

<script setup>
import { apiFactory } from '~/plugins/api';
import { getJobStatus } from '~/models/dtos/JobPostingDTO';
import { JobStatus } from '~/models/dtos/JobPostingDTO';
import Pagination from '~/components/Pagination.vue';
const listPostedJob = ref([]);
const pagination = ref({});
const pageSize = ref(5);
const pageNumber = ref(1);
const pageTotal = ref(0);
const totalCount = ref(0);
const selectedJobId = ref(null);

onMounted(async () => {
    let companyProfile = await apiFactory.employerService.viewCompanyProfile({});
    console.log(companyProfile.data.responseData);
    let listPostedJobResponse = await apiFactory.employerService.listAllJobs({ PageNumber: pageNumber.value, PageSize: pageSize.value }, companyProfile.data.responseData.id);
    console.log(listPostedJobResponse.data.responseData);
    //The array of job
    listPostedJob.value = listPostedJobResponse.data.responseData.data;

    //The pagination object
    pagination.value = listPostedJobResponse.data.responseData.pagination;
});
const deleteJob = async (job) => {
    await apiFactory.employerService.updateJobStatus(job.id, JobStatus.Deactivate);
}

const nextPage = () => {
    pageNumber.value++;
    getJobs();
};

const previousPage = () => {
    pageNumber.value--;
    getJobs();
};

const setPage = (number) => {
    pageNumber.value = number;
    getJobs();
};

const getJobs = async () => {
    let companyProfile = await apiFactory.employerService.viewCompanyProfile({});
    let listPostedJobResponse = await apiFactory.employerService.listAllJobs({ pageNumber: pageNumber.value, pageSize: pageSize.value }, companyProfile.data.responseData.id);
    listPostedJob.value = listPostedJobResponse.data.responseData.data;
    pagination.value = listPostedJobResponse.data.responseData.pagination;
    totalCount.value = pagination.value.totalCount;
    pageTotal.value = Math.ceil(totalCount.value / pageSize.value);
};

/** delete source */
const openModelDeleteJobs = async (id) => {
    try {
        selectedJobId.value = id;
    } catch (err) {
        console.log(err);
    }
};

const navigateToKanban = (jobId) => {
    // Assuming you are using Vue Router
    const router = useRouter();
    router.push(`/kanban/${jobId}`);
};

const navigateToCvsOfJob = (jobId) => {
    // Assuming you are using Vue Router
    const router = useRouter();
    router.push(`/employer/CV/${jobId}`);
};

const navigateToUpdateOrViewJobPosted = (jobId) => {
    // Assuming you are using Vue Router
    const router = useRouter();
    router.push(`/employer/Postjob/${jobId}`);
};
</script>

<style scope>
@import url('assets/css/bootstrap-grid.css');
@import url('assets/css/icons.css');
@import url('assets/css/animate.min.css');
@import url('assets/css/style.css');
@import url('assets/css/responsive.css');
@import url('assets/css/chosen.css');
@import url('assets/css/colors/colors.css');
/* @import url('assets/css/bootstrap.css'); */
</style>
