<template>
    <div class="login min-vh-100 min-vw-100 row justify-content-center align-items-center">
        <div class="main pt-5 col-6 bg-info bg-gradient shadow p-3 mb-5 rounded ">
            <div class="text-center p-5">
                <img src="/assets/images/logo.png" style="border-radius: 5%" alt="logo" />
            </div>
            <div class="h1 text-white text-center mb-4">Tìm kiếm việc làm</div>
            <form @submit.prevent="login" class="">
                <div class="mt-10">
                    <div class="col-lg-3 mx-auto">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" aria-label="Sizing example input"
                                v-model="User.email" placeholder="Email" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" aria-label="Sizing example input"
                                placeholder="Password" v-model="User.password"
                                aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-4 gap-3">
                    <button type="submit" class="btn btn-primary">Đăng Nhập</button>
                    <a href="/register" class="text-white fw-bold">Đăng ký</a>
                </div>
            </form>
            <div class="text-danger"></div>
        </div>
        <div class="text-danger text-center fs-5">{{ errorMessage }}</div>
    </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import Api from '~/service/Base/api.ts';
import { jwtDecode } from 'jwt-decode';
import { ROLE } from '~/assets/js/constants/constants';
/**
 * Handle submit form add or edit CV
 */
const note = ref('')
const evaluate = ref('')
watch(note, (newNote, oldNote) => {
    console.log(newNote)
})
const submitForm = async (event) => {
    if (true) {
        const formData = new FormData();
        formData.append('note', note.value);
        formData.append('evalutte', evaluate.value);
        var response = await api.postAPI('/CV/AddCV', formData);
        emit('reloadCV');
        $('.btn-close').click();
    } else {
        const formData = new FormData();
        formData.append('id', "aaa");
        // var response = await api.putAPI('/CV/PutCV/' + props.idCv, formData);
        emit('reloadCV');
        $('.btn-close').click();
    }
};
definePageMeta({
    layout: 'login',
});
const User = ref({
    email: '',
    password: '',
});
const router = useRouter();
const errorMessage = ref('');
const api = new Api();


const login = async () => {
    try {
        const formData = new FormData();
        formData.append('email', User.value.email);
        formData.append('password', User.value.password);

        const response = await api.postAPI('/Account/login', formData);
        localStorage.setItem('token', response.data.responseData.accessToken);
        const decodedToken = jwtDecode(response.data.responseData.accessToken);
        let role = decodedToken.Role;
        console.log(role)
        if (role === ROLE.ADMIN) {
            navigateTo('/Dashboard');

        } else if (role === ROLE.EMPLOYEE) {
            navigateTo('/employee/home');
        } else {
            navigateTo('/employer/Home');
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'AxiosError') {
            errorMessage.value = 'Warning : Email or Password is incorrect!';
        }
    }
};
</script>
