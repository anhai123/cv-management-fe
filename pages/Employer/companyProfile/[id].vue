<template>
    <div class="column card margin-bottom-forFloatFooter">
        <div class="padding-left p-3">
            <div class="profile-title" id="mp">
                <div class="d-flex  align-items-center gap-2">
                    <span class="h3">Hồ sơ Công Ty</span>
                    <button v-if="currentUser && currentUser.role == ROLE.EMPLOYEE && !normalArray.includes(form.id)"
                        @click="followCompany" class="btn btn-primary">Follow</button>

                    <button v-if="currentUser && currentUser.role == ROLE.EMPLOYEE && normalArray.includes(form.id)"
                        class="btn bg-warning-subtle" @click="unFollowCompany()">UnFollow</button>
                </div>
                <div class="upload-img-bar mb-3">
                    <img v-if="form.imageUrl" :src="form.imageUrl" alt="Chưa có ảnh" class="img-thumbnail mt-2"
                        style="max-width: 200px;">
                </div>
            </div>

            <div class="profile-form-view">
                <div class="row">
                    <div class="col-lg-12">
                        <span class="pf-title fw-bold">Tên Công Ty</span>
                        <p class="form-control-plaintext">{{ form.companyName }}</p>
                    </div>
                    <div class="col-lg-6">
                        <span class="pf-title fw-bold">Thành Lập</span>
                        <p class="form-control-plaintext">{{ form.since }}</p>
                    </div>
                    <div class="col-lg-6">
                        <span class="pf-title fw-bold">Quy Mô Đội Ngũ</span>
                        <p class="form-control-plaintext">{{ form.teamSize }}</p>
                    </div>
                    <div class="col-lg-12">
                        <span class="pf-title fw-bold">Danh Mục</span>
                        <div class="pf-field no-margin">
                            <ul class="tags list-unstyled">
                                <li v-for="(tag, index) in form.categories" :key="index" class="addedTag">
                                    {{ tag }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <span class="pf-title fw-bold">Mô Tả</span>
                        <p class="form-control-plaintext">{{ form.description }}</p>
                    </div>
                </div>
            </div>

            <div class="social-view mt-4" id="sn">
                <span class="h3">Mạng Xã Hội</span>
                <div class="row">
                    <div class="col-lg-6" v-for="social in socialMediaLinks" :key="social.name">
                        <span class="pf-title fw-bold">{{ social.label }}</span>
                        <p class="form-control-plaintext">{{ form[social.field] }}</p>
                    </div>
                </div>
            </div>

            <div class="contact-view mt-4" id="ci">
                <span class="h3">Liên Hệ</span>
                <div class="row">
                    <div class="col-lg-4">
                        <span class="pf-title fw-bold">Số Điện Thoại</span>
                        <p class="form-control-plaintext">{{ form.phoneNumber }}</p>
                    </div>
                    <div class="col-lg-4">
                        <span class="pf-title fw-bold">Email</span>
                        <p class="form-control-plaintext">{{ form.email }}</p>
                    </div>
                    <div class="col-lg-4">
                        <span class="pf-title fw-bold">Trang Web</span>
                        <p class="form-control-plaintext">{{ form.website }}</p>
                    </div>
                    <div class="col-lg-12">
                        <span class="pf-title fw-bold">Địa Chỉ</span>
                        <p class="form-control-plaintext">{{ form.address }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { ROLE } from '~/assets/js/constants/constants';
import { apiFactory } from '~/plugins/api';
import { UserInformationLocal } from '~/service/userInformationLocal';

const currentUser = ref(null)
const route = useRoute();
const companyId = route.params.id
const companyIdsFollowed = ref([]);
const normalArray = computed(() => toRaw(companyIdsFollowed.value));
const form = ref({
    imageUrl: 'https://via.placeholder.com/200',  // Sample image for placeholder
    companyName: 'Tera Planer',
    since: '1991',
    teamSize: '100 - 201',
    categories: ['Technology', 'Development'],
    description: 'Leading tech solutions company.',
    facebook: 'www.facebook.com/TeraPlaner',
    twitter: 'www.twitter.com/TeraPlaner',
    google: 'www.google-plus.com/TeraPlaner',
    linkedin: 'www.linkedin.com/TeraPlaner',
    phoneNumber: '+90 538 963 58 96',
    email: 'demo@jobhunt.com',
    website: 'www.jobhun.com',
    address: 'Hà Nội'
});

const socialMediaLinks = [
    { label: 'Facebook', field: 'facebook' },
    { label: 'Twitter', field: 'twitter' },
    { label: 'Google', field: 'google' },
    { label: 'LinkedIn', field: 'linkedin' }
];

const followCompany = async () => {
    console.log('Follow company:', companyId);
    console.log('Current User:', currentUser.value);

    let followUniDTO = new FormData();
    followUniDTO.append('appUserId', currentUser.value.accountId);
    followUniDTO.append('companyProfileId', companyId);

    await apiFactory.employeeService.userFollowCompany(followUniDTO);
    reloadData();
};

const reloadData = async () => {
    console.log('Company Profile ID:', companyId);
    var companyDTO = await apiFactory.employerService.getCompanyProfileById(companyId);
    let dataQuery = await apiFactory.employeeService.allCompanyIdUserFollow();

    companyIdsFollowed.value = dataQuery.data.responseData;
    form.value = companyDTO.data.responseData;
}

onMounted(async () => {
    await reloadData()
    currentUser.value = UserInformationLocal.getUserInformation();


    // const normalArray1 = toRaw(companyIdsFollowed.value);
    // console.log('Array:', normalArray1);
    // console.log('Array Type:', typeof normalArray1[0]);
    // console.log('Company ID:', companyId);
    // console.log('Company ID Type:', typeof companyId);
    // console.log('Includes:', normalArray1.includes(companyId));

});

const unFollowCompany = async () => {
    console.log('Unfollow company:', companyId);
    console.log('Current User:', currentUser.value);
    let followUniDTO = {
        appUserId: currentUser.value.accountId,
        companyProfileId: companyId
    };

    await apiFactory.employeeService.userUnFollowCompany(followUniDTO);
    reloadData();
};
</script>
