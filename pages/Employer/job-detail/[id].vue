<template>
    <div class="container margin-bottom-forFloatFooter">
        <div class="card">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 class="mb-0">{{ jobPosting.jobTitle }}</h5>
                <span class="badge bg-success">{{ getEmploymentTypeLabel(jobPosting.employmentType) }}</span>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-4">
                        <strong><i class="bi bi-currency-dollar fs-5"></i> Mức lương:</strong>
                        <p>{{ jobPosting.offeredSalary }}</p>
                    </div>
                    <div class="col-md-4">
                        <strong><i class="bi bi-geo-alt fs-5"></i> Địa điểm:</strong>
                        <p>{{ jobPosting.address }}</p>
                    </div>
                    <div class="col-md-4">
                        <strong><i class="bi bi-briefcase fs-5"></i> Kinh nghiệm:</strong>
                        <p>{{ getExperienceLevelLabel(jobPosting.experience) }}</p>
                    </div>
                </div>
                <div class="mb-3">
                    <strong>Kỹ năng:</strong>
                    <div class="mt-2">
                        <span v-for="(skill, index) in jobPosting.skills" :key="index"
                            class="badge bg-info me-2 mb-2">{{ skill }}</span>
                    </div>
                </div>
                <div class="mb-3">
                    <strong>Danh mục công việc: </strong>
                    <div class="mt-2">
                        <span v-for="(category, index) in jobPosting.categories" :key="index"
                            class="badge bg-secondary me-2 mb-2">{{ category }}</span>
                    </div>
                </div>
                <div class="mb-3">
                    <strong>Mô tả công việc: </strong>
                    <span>{{ jobPosting.description }}</span>
                </div>
                <div class="mb-3">
                    <strong>Quyền lợi: </strong>
                    <ul class="list-unstyled">
                        <span>{{ jobPosting.benefits }}</span>
                    </ul>
                </div>
                <div class="mb-3">
                    <strong>Địa điểm làm việc: </strong>
                    <p>{{ jobPosting.address }}</p>
                </div>
                <div class="mb-3">
                    <strong>Thời gian làm việc: </strong>
                    <p>{{ jobPosting.workingHours }}</p>
                </div>
                <div class="mb-3">
                    <strong>Cách thức ứng tuyển:</strong>
                    <p>Gửi đơn ứng tuyển của bạn trực tuyến bằng cách nhấn vào "Ứng tuyển ngay" bên dưới.</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <!-- <button class="btn btn-primary">Apply Now</button> -->
                    <FormCreateUpdateCV v-if="currentUser && currentUser.role == ROLE.EMPLOYEE" data_bs_target_modal="
                        #create" id_model="create" @reloadCV="() => { }">
                        <template #icon>
                            <a href="#" class="fs-5" style="text-decoration: none;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256">
                                    <path fill="currentColor"
                                        d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104h-48v48a8 8 0 0 1-16 0v-48H72a8 8 0 0 1 0-16h48V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 0 16" />
                                </svg>
                                Ứng tuyển
                            </a>
                        </template>
                        <template #header>Ứng tuyển ngay</template>
                    </FormCreateUpdateCV>

                    <h3 class="text-muted">Hạn chót ứng tuyển: {{ formatDate(jobPosting.applicationDeadline) }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { EmploymentType, ExperienceLevel, JobStatus } from '~/models/dtos/JobPostingDTO';
import { ref } from 'vue';
import { apiFactory } from '~/plugins/api';
import { UserInformationLocal } from '~/service/userInformationLocal';

const route = useRoute();
const jobPostId = route.params.id;
const currentUser = ref(null)
const jobPosting = ref({
    id: 1,
    companyId: 101,
    jobTitle: "Kỹ Sư Sản Xuất Biết Tiếng Trung",
    description: "Chúng tôi đang tìm kiếm một Kỹ Sư Sản Xuất thông thạo tiếng Trung để tham gia vào đội ngũ sản xuất của chúng tôi. Ứng viên sẽ chịu trách nhiệm duy trì và cải thiện hiệu suất sản xuất, phân tích và giải quyết vấn đề chất lượng, và đóng góp vào việc cải tiến quy trình sản xuất.",
    contactEmail: "recruitment@company.com",
    username: "hiring_manager",
    categories: ["Manufacturing", "Engineering", "Production"],
    offeredSalary: "Thỏa thuận",
    experience: ExperienceLevel.MidLevel,
    gender: "Không yêu cầu",
    industry: "Sản xuất",
    qualification: "Tốt nghiệp đại học chuyên ngành liên quan",
    skills: ["Tiếng Trung", "Quản lý sản xuất", "Phân tích quy trình", "Cải tiến liên tục"],
    address: "Hải Phòng: Số 115, dọc lộ Đông Tây, khu công nghiệp VSIP, Thủy Nguyên",
    employmentType: EmploymentType.FullTime,
    status: JobStatus.Activate,
    applicationDeadline: new Date("2024-11-02"),
    createdAt: new Date("2024-10-17"),
    totalApplication: 0,
    benefits: '',
    workingHours: '',
});

onMounted(async () => {
    currentUser.value = UserInformationLocal.getUserInformation();
    // Fetch job posting by id
    let res = await apiFactory.employerService.getJobDetails(jobPostId);
    console.log(res.data.responseData)
    jobPosting.value = res.data.responseData;
});

const getEmploymentTypeLabel = (type) => {
    return EmploymentType[type] || type;
};

const getExperienceLevelLabel = (level) => {
    return ExperienceLevel[level] || level;
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN');
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
