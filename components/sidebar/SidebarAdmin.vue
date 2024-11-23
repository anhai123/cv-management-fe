<template>
    <NuxtLink to="/Dashboard" class="py-3 d-flex flex-row ps-4 text-decoration-none nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-fill"
            viewBox="0 0 16 16">
            <path
                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
        </svg>
        <div class="my-0 ms-2 ">Dashboard</div>
    </NuxtLink>
    <div class="sidebar">
        <ul class="navbar-nav justify-content-end flex-grow-1">
            <li class="nav-item ps-4">
                <a class="nav-link" aria-current="page" href="#"></a>
            </li>
            <li class="nav-item">
                <a class="text-primary text-decoration-none fw-bold ps-4" aria-current="page" href="#">Module</a>
            </li>
            <NuxtLink to="/Source" class="nav-link d-flex flex-row ps-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-tree-fill mt-2 text-success" viewBox="0 0 16 16">
                        <path
                            d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777z" />
                    </svg>
                </div>
                <div class="my-0 ms-2 mt-2">Quản lý nguồn CV</div>
            </NuxtLink>
            <NuxtLink to="/Position" class="nav-link d-flex flex-row ps-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-bag-dash-fill text-info" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M6 9.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                    </svg>
                </div>
                <div class="my-0 ms-2 mt-1">Quản lý vị trí</div>
            </NuxtLink>
            <li class="quanlitaikhoan position-fixed bottom m-0 w-100">
                <div class="pt-3 text d-flex flex-row ps-4 col-lg-2">
                    <div class="sidebar ms-2 text-primary fw-bold">
                        Admin
                    </div>
                </div>
                <NuxtLink to="/account" class="nav-link d-flex flex-row ps-4 col-lg-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-key-fill mt-2" viewBox="0 0 16 16">
                            <path
                                d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                        </svg>
                    </div>
                    <div class="my-0 ms-2 mt-2">Quản lý tài khoản</div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>
<script>
import { ROLE } from '~/assets/js/constants/constants';
let roleAdminRef = ref(ROLE.ADMIN);

</script>
