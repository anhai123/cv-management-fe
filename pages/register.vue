<template>
    <Form @submit="onSubmit" @invalid-submit="onInvalidSubmit" :validation-schema="validationSchema" v-slot="{ errors }"
        ref="formRef">
        <section class="login min-vh-100 min-vw-100 justify-content-center align-items-center">
            <div class="block remove-bottom">
                <div class="container min-vw-100">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="account-popup-area signup-popup-box static">
                                <div class="account-popup p-3">
                                    <h3>Sign Up</h3>
                                    <span>To help people find happiness</span>
                                    <div class="select-user">
                                        <!-- Checkbox for user selection -->
                                        <div class="select-user d-flex justify-content-center gap-5">
                                            <div class="form-check">
                                                <Field type="radio" name="roleId" value=1 v-model="form.roleId"
                                                    class="form-check-input" />
                                                <label class="form-check-label">Candidate</label>
                                            </div>
                                            <div class="form-check">
                                                <Field type="radio" name="roleId" value=2 v-model="form.roleId"
                                                    class="form-check-input" />
                                                <label class="form-check-label">Employer</label>
                                            </div>
                                        </div>
                                        <div v-if="errors.roleId" class="error-message text-danger">{{ errors.roleId }}
                                        </div>
                                    </div>
                                    <div class="cfield">
                                        <Field name="fullName" v-model="form.fullName" type="text"
                                            placeholder="Full Name" class="form-control" />
                                        <i class="la la-user"></i>
                                        <div v-if="errors.fullName" class="error-message text-danger">{{
                                            errors.fullName }}</div>
                                    </div>
                                    <div class="cfield">
                                        <Field name="email" v-model="form.email" type="text" placeholder="Email"
                                            class="form-control" />
                                        <i class="la la-envelope-o"></i>
                                        <div v-if="errors.email" class="error-message text-danger">{{ errors.email
                                            }}</div>
                                    </div>
                                    <div class="cfield">
                                        <Field name="password" v-model="form.password" type="password"
                                            placeholder="********" class="form-control" />
                                        <i class="la la-key"></i>
                                        <div v-if="errors.password" class="error-message text-danger">{{
                                            errors.password }}</div>
                                    </div>
                                    <div class="cfield">
                                        <Field name="phone" v-model="form.phone" type="text" placeholder="Phone Number"
                                            class="form-control" />
                                        <i class="la la-phone"></i>
                                        <div v-if="errors.phone" class="error-message text-danger">{{ errors.phone
                                            }}</div>
                                    </div>
                                    <button type="submit">Signup</button>
                                </div>
                            </div><!-- SIGNUP POPUP -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Form>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field, defineRule } from 'vee-validate';
import * as yup from 'yup';
import { ROLE } from '~/assets/js/constants/constants';
import Api from '~/service/Base/api.ts';

const api = new Api();
definePageMeta({
    layout: 'login',
});
const createAccount = (formValue) => {
    api.postAPI('/Account/register', formValue).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}
const form = ref({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    roleId: ''
});


function onSubmit(values) {
    // Submit values to API...
    // alert(JSON.stringify(values, null, 2));
    createAccount(values);
}
function onInvalidSubmit({ values, errors, results }) {
    console.log(values); // current form values
    console.log(errors); // a map of field names and their first error message
    console.log(results); // a detailed map of field names and their validation results
}

const validationSchema = yup.object({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    phone: yup.string().required('Phone Number is required'),
    roleId: yup.string().required('Please select either Candidate or Employer')  // Ensure a selection is made
});

</script>

<style scoped>
@import url('/assets/css/style.css');

.active {
    background-color: #007bff;
    color: white;
}
</style>
