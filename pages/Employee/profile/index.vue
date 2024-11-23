<template>
    <div class="padding-left mb-5">
        <VForm @submit="handleSubmit" :validation-schema="schema">
            <input type="hidden" v-model="form.id" />
            <div class="profile-title">
                <h3>My Profile</h3>
                <div class="upload-img-bar">
                    <h3>Thông tin cá nhân cơ bản</h3>
                    <div class="upload-img-bar">
                        <img v-if="form.imageUrl" :src="form.imageUrl" alt="Chưa có ảnh" class="img-thumbnail mt-2"
                            style="max-width: 200px;">
                        <input type="file" @change="onFileChange" class="form-control-file" id="uploadImage">
                    </div>
                </div>
            </div>
            <div class="profile-form-edit">
                <div class="row">
                    <div class="col-lg-12">
                        <span class="pf-title">Họ và tên</span>
                        <div class="pf-field">
                            <VField name="fullName" v-model="form.fullName" type="text" placeholder="Ali TUFAN" />
                            <ErrorMessage name="fullName" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <span class="pf-title">Số điện thoại</span>
                        <div class="pf-field">
                            <VField name="phone" v-model="form.phone" type="text" placeholder="UX / UI Designer" />
                            <ErrorMessage name="phone" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <span class="pf-title">Email</span>
                        <div class="pf-field">
                            <VField name="email" v-model="form.email" type="text" placeholder="UX / UI Designer" />
                            <ErrorMessage name="email" class="text-danger" />
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <button type="submit">Lưu</button>
                    </div>
                </div>
            </div>
        </VForm>
    </div>
</template>

<script setup>
import { Form as VForm, Field as VField, ErrorMessage, configure } from 'vee-validate';
import * as yup from 'yup';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Api from '~/service/Base/api.ts';
import { apiFactory } from '~/plugins/api';
import { UserInformationLocal } from '~/service/userInformationLocal';
import { uploadFileFirebase } from '~/assets/js/firebaseUploadFile.js';
const api = new Api();
const form = ref({
    id: '',
    fullName: '',
    phone: '',
    email: '',
    imageUrl: ''
});

const schema = yup.object({
    fullName: yup.string().required('Họ và tên là bắt buộc'),
    phone: yup.string().required('Số điện thoại là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
});

configure({
    validateOnInput: true, // Validate on input rather than on blur
});

const handleSubmit = async () => {
    let userId = UserInformationLocal.getUserInformation().accountId;
    let response = await apiFactory.accountService.updateAccount(userId, form.value);
};

const fetchData = async () => {
    try {
        let userId = UserInformationLocal.getUserInformation().accountId;
        console.log(userId);
        const response = await apiFactory.accountService.getAccountById(userId);
        console.log(response.data.responseData);
        form.value = response.data.responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            form.value.imageUrl = e.target.result;
        };
        uploadFileFirebase(file).then((url) => {
            console.log(url);
            form.value.imageUrl = url;
        });
    } else {
        form.value.imageUrl = null;
    }
};

onMounted(() => {
    fetchData();
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
