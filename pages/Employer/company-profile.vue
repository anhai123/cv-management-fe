<template>

    <div class="column card margin-bottom-forFloatFooter">
        <div class="padding-left p-3">
            <VForm @submit="submitForm" :validation-schema="schema">
                <input type="hidden" v-model="form.id" />
                <div class="profile-title" id="mp">
                    <h3>Hồ sơ Công Ty</h3>
                    <div class="upload-img-bar">
                        <img v-if="form.imageUrl" :src="form.imageUrl" alt="Chưa có ảnh" class="img-thumbnail mt-2"
                            style="max-width: 200px;">
                        <input type="file" @change="onFileChange" class="form-control-file" id="uploadImage">
                    </div>
                </div>

                <div class="profile-form-edit">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="pf-title">Tên Công Ty</span>
                            <div class="pf-field">
                                <VField name="companyName" v-model="form.companyName" placeholder="Tera Planer" />
                                <ErrorMessage name="companyName" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <span class="pf-title">Thành Lập</span>
                            <div class="pf-field">
                                <VField name="since" v-model="form.since" placeholder="1991" />
                                <ErrorMessage name="since" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <span class="pf-title">Quy Mô Đội Ngũ</span>
                            <div class="pf-field">
                                <VField name="teamSize" v-model="form.teamSize" placeholder="100 - 201" />
                                <ErrorMessage name="teamSize" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <span class="pf-title">Danh Mục</span>
                            <div class="pf-field no-margin">
                                <ul class="tags list-unstyled">
                                    <li v-for="(tag, index) in form.categories" :key="index" class="addedTag">
                                        {{ tag }}
                                        <span class="tagRemove" @click="removeCategory(index)">x</span>
                                    </li>
                                    <li class="tagAdd taglist">
                                        <input type="text" v-model="newTag" @keypress.enter.prevent="addCategory"
                                            ref="searchField">
                                    </li>
                                </ul>
                                <ErrorMessage name="categories" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <span class="pf-title">Mô Tả</span>
                            <div class="pf-field">
                                <VField name="description" as="textarea" v-model="form.description" />
                                <ErrorMessage name="description" class="text-danger" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="social-edit" id="sn">
                    <h3>Mạng Xã Hội</h3>
                    <div class="row">
                        <div class="col-lg-6">
                            <span class="pf-title">Facebook</span>
                            <div class="pf-field">
                                <VField name="facebook" v-model="form.facebook"
                                    placeholder="www.facebook.com/TeraPlaner" />
                                <ErrorMessage name="facebook" class="text-danger" />
                                <i class="fa fa-facebook"></i>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <span class="pf-title">Twitter</span>
                            <div class="pf-field">
                                <VField name="twitter" v-model="form.twitter"
                                    placeholder="www.twitter.com/TeraPlaner" />
                                <ErrorMessage name="twitter" class="text-danger" />
                                <i class="fa fa-twitter"></i>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <span class="pf-title">Google</span>
                            <div class="pf-field">
                                <VField name="google" v-model="form.google"
                                    placeholder="www.google-plus.com/TeraPlaner" />
                                <ErrorMessage name="google" class="text-danger" />
                                <i class="la la-google"></i>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <span class="pf-title">LinkedIn</span>
                            <div class="pf-field">
                                <VField name="linkedin" v-model="form.linkedin"
                                    placeholder="www.Linkedin.com/TeraPlaner" />
                                <ErrorMessage name="linkedin" class="text-danger" />
                                <i class="fa fa-linkedin"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contact-edit" id="ci">
                    <h3>Liên Hệ</h3>
                    <div class="row">
                        <div class="col-lg-4">
                            <span class="pf-title">Số Điện Thoại</span>
                            <div class="pf-field">
                                <VField name="phoneNumber" v-model="form.phoneNumber" placeholder="+90 538 963 58 96" />
                                <ErrorMessage name="phoneNumber" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <span class="pf-title">Email</span>
                            <div class="pf-field">
                                <VField name="email" v-model="form.email" placeholder="demo@jobhunt.com" />
                                <ErrorMessage name="email" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <span class="pf-title">Trang Web</span>
                            <div class="pf-field">
                                <VField name="website" v-model="form.website" placeholder="www.jobhun.com" />
                                <ErrorMessage name="website" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <span class="pf-title">Địa Chỉ</span>
                            <div class="pf-field">
                                <VField name="address" v-model="form.address" placeholder="Hà Nội" />
                                <ErrorMessage name="address" class="text-danger" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <button type="submit">{{ form.id ? 'Cập Nhật' : 'Tạo Mới' }}</button>
                        </div>
                    </div>
                </div>
            </VForm>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Form as VForm, Field as VField, ErrorMessage, defineRule, configure } from 'vee-validate';
import * as yup from 'yup';
import { uploadFileFirebase } from '~/assets/js/firebaseUploadFile.js';
import { apiFactory } from '~/plugins/api';

const schema = yup.object({
    imageUrl: yup.string().url('Vui lòng nhập URL hợp lệ.'),
    companyName: yup.string().required('Tên công ty là bắt buộc.').max(100, 'Tên công ty không được vượt quá 100 ký tự.'),
    since: yup.string().required('Năm thành lập là bắt buộc.').matches(/^\d{4}$/, 'Vui lòng nhập năm hợp lệ.'),
    teamSize: yup.string().required('Quy mô đội ngũ là bắt buộc.'),
    categories: yup.array().of(yup.string()).min(1, 'Ít nhất một danh mục là bắt buộc.'),
    description: yup.string().max(500, 'Mô tả không được vượt quá 500 ký tự.'),
    facebook: yup.string().url('Vui lòng nhập URL Facebook hợp lệ.'),
    twitter: yup.string().url('Vui lòng nhập URL Twitter hợp lệ.'),
    google: yup.string().url('Vui lòng nhập URL Google+ hợp lệ.'),
    linkedin: yup.string().url('Vui lòng nhập URL LinkedIn hợp lệ.'),
    phoneNumber: yup.string().matches(/^[0-9+\-() ]+$/, 'Vui lòng nhập số điện thoại hợp lệ.'),
    email: yup.string().email('Vui lòng nhập địa chỉ email hợp lệ.'),
    website: yup.string().url('Vui lòng nhập URL trang web hợp lệ.'),
    address: yup.string().required('Địa chỉ là bắt buộc.'),
});

// Cấu hình VeeValidate
configure({
    generateMessage: (ctx) => {
        const messages = {
            required: `${ctx.field} là bắt buộc.`,
            url: `Vui lòng nhập URL hợp lệ.`,
            email: `Vui lòng nhập địa chỉ email hợp lệ.`,
            max: `${ctx.field} không được vượt quá ${ctx.rule.params[0]} ký tự.`,
            matches: `Vui lòng nhập ${ctx.field} hợp lệ.`,
            min: `Ít nhất một danh mục là bắt buộc.`,
        };
        return messages[ctx.rule.name] ? messages[ctx.rule.name] : `Trường ${ctx.field} không hợp lệ.`;
    },
});

const form = ref({
    id: '',
    imageUrl: '',
    companyName: '',
    since: '',
    teamSize: '',
    categories: [],
    description: '',
    facebook: '',
    twitter: '',
    google: '',
    linkedin: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: '',
});

const newTag = ref('');
const searchField = ref(null);

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            form.value.imageUrl = e.target.result;
        };
        uploadFileFirebase(file).then((url) => {
            form.value.imageUrl = url;
        });
    } else {
        form.value.imageUrl = null;
    }
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

const submitForm = async () => {
    if (form.value.id) {
        // Call update service
        await apiFactory.employerService.updateCompanyProfile(form.value);
    } else {
        // Call create service
        await apiFactory.employerService.createCompanyProfile(form.value);
    }
};

onMounted(async () => {
    let companyProfile = await apiFactory.employerService.viewCompanyProfile({});
    console.log(companyProfile.data.responseData);
    form.value = {
        id: companyProfile.data.responseData.id || '',
        appUserId: companyProfile.data.responseData.appUserId || '',
        imageUrl: companyProfile.data.responseData.imageUrl || '',
        companyName: companyProfile.data.responseData.companyName || '',
        since: companyProfile.data.responseData.since || '',
        teamSize: companyProfile.data.responseData.teamSize || '',
        categories: companyProfile.data.responseData.categories || [],
        description: companyProfile.data.responseData.description || '',
        facebook: companyProfile.data.responseData.facebook || '',
        twitter: companyProfile.data.responseData.twitter || '',
        google: companyProfile.data.responseData.google || '',
        linkedin: companyProfile.data.responseData.linkedin || '',
        phoneNumber: companyProfile.data.responseData.phoneNumber || '',
        email: companyProfile.data.responseData.email || '',
        website: companyProfile.data.responseData.website || '',
        address: companyProfile.data.responseData.address || '',
    };
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
