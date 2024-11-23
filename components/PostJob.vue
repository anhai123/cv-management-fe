<template>
    <div class="padding-left card margin-bottom-forFloatFooter border border-primary">
        <div class="profile-title">
            <h3>Post a New Job</h3>
        </div>
        <div class="profile-form-edit">
            <Form @submit="submitForm" :validation-schema="_validationSchema">
                <input type="hidden" v-model="form.id" />
                <div class="row">
                    <div class="col-lg-12">
                        <span class="pf-title">Tiêu Đề Công Việc</span>
                        <div class="pf-field">
                            <Field name="jobTitle" as="input" type="text" v-model="form.jobTitle"
                                placeholder="Designer" />
                            <ErrorMessage name="jobTitle" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <span class="pf-title">Mô Tả</span>
                        <div class="pf-field">
                            <!-- <Field name="description" as="textarea" v-model="form.description" /> -->
                            <TipTap v-model="form.description"></TipTap>
                            <ErrorMessage name="description" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <span class="pf-title">Email</span>
                        <div class="pf-field">
                            <Field name="contactEmail" as="input" type="text" v-model="form.contactEmail" />
                            <ErrorMessage name="contactEmail" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <span class="pf-title">Username</span>
                        <div class="pf-field">
                            <Field name="username" as="input" type="text" v-model="form.username" />
                            <ErrorMessage name="username" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <span class="pf-title">Thể loại</span>
                        <div class="pf-field">
                            <ul class="tags list-unstyled">
                                <li v-for="(category, index) in form.categories" :key="index" class="addedTag">
                                    {{ category }}
                                    <span class="tagRemove" @click="removeCategory(index)">x</span>
                                </li>
                                <li class="tagAdd taglist">
                                    <input type="text" v-model="newTag" @keypress.enter.prevent="addCategory" />
                                </li>
                            </ul>
                            <p v-if="errorMessageCategories" class="text-danger">{{ errorMessageCategories }}</p>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <span class="pf-title">Mức Lương Đề Xuất</span>
                        <div class="pf-field">
                            <Field name="offeredSalary" as="input" type="number" v-model="form.offeredSalary" />
                            <ErrorMessage name="offeredSalary" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <span class="pf-title">Loại Hình Công Việc</span>
                        <div class="pf-field">
                            <Field name="employmentType" as="select" class="form-select border border-primary"
                                v-model="form.employmentType">
                                <option value="">Chọn Loại Hình Công Việc</option>
                                <option value="Full-Time">Toàn Thời Gian</option>
                                <option value="Part-Time">Bán Thời Gian</option>
                                <option value="Contract">Hợp Đồng</option>
                                <option value="Temporary">Tạm Thời</option>
                                <option value="Internship">Thực Tập</option>
                            </Field>
                            <ErrorMessage name="employmentType" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="pf-field">
                            <span class="pf-title">Giới Tính</span>
                            <Field name="gender" as="select" class="form-select border border-primary"
                                v-model="form.gender">
                                <option value="">Chọn Giới Tính</option>
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                                <option value="Other">Khác</option>
                            </Field>
                            <ErrorMessage name="gender" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <span class="pf-title">Ngành Nghề</span>
                        <div class="pf-field">
                            <Field name="industry" as="select" class="form-select border border-primary"
                                v-model="form.industry">
                                <option value="">Chọn Ngành Nghề</option>
                                <option value="Technology">Công Nghệ</option>
                                <option value="Healthcare">Y Tế</option>
                                <option value="Finance">Tài Chính</option>
                                <option value="Education">Giáo Dục</option>
                            </Field>
                            <ErrorMessage name="industry" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <span class="pf-title">Trình Độ</span>
                        <div class="pf-field">
                            <Field name="qualification" as="select" class="form-select border border-primary"
                                v-model="form.qualification">
                                <option value="">Chọn Trình Độ</option>
                                <option :value="EducationLevels.HighSchool">Trung Học</option>
                                <option :value="EducationLevels.BachelorsDegree">Cử Nhân</option>
                                <option :value="EducationLevels.MastersDegree">Thạc Sĩ</option>
                                <option :value="EducationLevels.PhD">Tiến Sĩ</option>
                            </Field>
                            <ErrorMessage name="qualification" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <span class="pf-title">Lợi ích</span>
                        <div class="pf-field">
                            <TipTap v-model="form.benefits"></TipTap>
                            <ErrorMessage name="benefits" class="text-danger" />
                        </div>
                    </div>


                    <div class="col-lg-6">
                        <span class="pf-title">Kinh Nghiệm</span>
                        <div class="pf-field">
                            <TipTap v-model="form.experience"></TipTap>
                            <ErrorMessage name="experience" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <span class="pf-title">Hạn ứng tuyển</span>
                        <div class="pf-field">
                            <Field name="applicationDeadline" as="input" type="date"
                                v-model="form.applicationDeadline" />
                            <ErrorMessage name="applicationDeadline" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <span class="pf-title">Kỹ năng</span>
                        <div class="pf-field">
                            <ul class="tags">
                                <li v-for="(skill, index) in form.skills" :key="index" class="addedTag">
                                    {{ skill }}
                                    <span class="tagRemove" @click="removeSkill(index)">x</span>
                                </li>
                                <li class="tagAdd taglist">
                                    <input type="text" v-model="newSkill" @keypress.enter.prevent="addSkill" />
                                </li>
                            </ul>
                            <ErrorMessage name="skills" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <span class="pf-title">Địa chỉ</span>
                        <div class="pf-field">
                            <Field name="address" as="input" type="text" v-model="form.address" />
                            <ErrorMessage name="address" class="text-danger" />
                        </div>
                    </div>


                    <div class="col-lg-12">
                        <span class="pf-title">Thời gian làm việc</span>
                        <div class="pf-field">
                            <Field name="workingHours" as="input" type="text" v-model="form.workingHours" />
                            <ErrorMessage name="workingHours" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-lg-12 mb-5">
                        <button type="submit">Cập Nhật</button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useField, Form, Field, ErrorMessage } from 'vee-validate';
import { apiFactory } from '~/plugins/api';
import * as yup from 'yup';
import { id } from 'element-plus/es/locale/index.mjs';
import { EducationLevels } from '~/assets/js/constants/constants';
import { useRoute } from 'vue-router';

const newSkill = ref('');
const newTag = ref('');
const errorMessageCategories = ref('');

const props = defineProps({
    id: {
        type: String,
        default: ''
    }
});

console.log(id);
const form = ref({
    companyProfileId: '',
    id: '',
    jobTitle: '',
    description: '',
    contactEmail: '',
    username: '',
    categories: [],
    offeredSalary: 0,
    experience: '',
    gender: '',
    industry: '',
    qualification: '',
    applicationDeadline: '',
    skills: [],
    address: '',
    employmentType: '',
    benefits: '',
    workingHours: ''
});

//TODO: Uncomment this after finish testing
const _validationSchema = yup.object({
    // jobTitle: yup.string().required().max(100),
    // description: yup.string().required(),
    // contactEmail: yup.string().required().email(),
    // username: yup.string().required().max(50),
    // offeredSalary: yup.number().max(50),
    // experience: yup.string().required(),
    // gender: yup.string().max(10),
    // industry: yup.string().required().max(100),
    // qualification: yup.string().max(100),
    // applicationDeadline: yup.date().required(),

    // address: yup.string().max(200),
    // employmentType: yup.string().required()
});
onMounted(async () => {
    let companyProfile = await apiFactory.employerService.viewCompanyProfile({});
    console.log(companyProfile.data.responseData);
    form.value.companyProfileId = companyProfile.data.responseData.id || ''

    // const route = useRoute();
    if (props.id) {
        let jobDetail = await apiFactory.employerService.getJobDetails(props.id, {});
        console.log(jobDetail.data.responseData);
        Object.assign(form.value, jobDetail.data.responseData);
    }
});
const addSkill = () => {
    if (newSkill.value !== '' && !form.value.skills.includes(newSkill.value)) {
        form.value.skills.push(newSkill.value);
        newSkill.value = '';
    } else {
        newSkill.value = '';
    }
};

const removeSkill = (index) => {
    form.value.skills.splice(index, 1);
};

const addCategory = () => {
    if (newTag.value !== '' && !form.value.categories.includes(newTag.value)) {
        form.value.categories.push(newTag.value);
        newTag.value = '';
    } else {
        newTag.value = '';
    }
};

const removeCategory = (index) => {
    form.value.categories.splice(index, 1);
};

const { setErrors } = useField('categories');

const validateCategories = () => {
    if (form.value.categories.length === 0) {
        setErrors('Please add at least one category');
        errorMessageCategories.value = 'Please add at least one category';
        return false;
    }
    setErrors('');
    errorMessageCategories.value = '';
    return true;
};


const submitForm = async () => {
    console.log(form.value);
    const isValid = validateCategories();
    console.log(isValid);
    if (isValid) {
        const formData = new FormData();
        Object.keys(form.value).forEach(key => {
            if (Array.isArray(form.value[key])) {
                form.value[key].forEach(item => formData.append(`${key}[]`, item));

            } else {
                formData.append(key, form.value[key]);
            }
        });

        if (form.value.id) {
            // Call update service => not test
            await apiFactory.employerService.updateJob(formData);
        } else {
            // Call create service
            await apiFactory.employerService.postNewJob(formData);
        }
    }

};
</script>

<style lang="scss" scoped>
ul {
    list-style: none;
}
</style>
