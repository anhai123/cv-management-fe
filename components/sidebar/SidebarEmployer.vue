<template>
    <!-- <NuxtLink to="/" class="py-3 d-flex flex-row ps-4 text-decoration-none nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-fill"
            viewBox="0 0 16 16">
            <path
                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
        </svg>
        <div class="my-0 ms-2 ">Dashboard</div>
    </NuxtLink> -->
    <div class="sidebar">
        <ul class="navbar-nav justify-content-end flex-grow-1">
            <li class="nav-item ps-4">
                <a class="nav-link" aria-current="page" href="#"></a>
            </li>
            <li class="nav-item">
                <a class="text-primary text-decoration-none fw-bold ps-4" aria-current="page" href="#">Module</a>
            </li>
            <NuxtLink to="/employer/company-profile" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2">
                    <i class="bi bi-building text-info"></i> Company Profile
                </div>
            </NuxtLink>
            <NuxtLink to="/employer/manage-jobs" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2"> <i class="bi bi-briefcase-fill text-success"></i> Manage Jobs</div>
            </NuxtLink>
            <NuxtLink to="/employer/resumes" class="nav-link d-flex flex-row ps-4">
                <div class="my-0 ms-2 mt-2"> <i class="bi bi-file-earmark-text-fill text-danger"></i> Resumes</div>
            </NuxtLink>
            <NuxtLink to="/employer/post-job" class="nav-link d-flex flex-row ps-4">
                <!--TODO: Need to add to qdrant database -->
                <div class="my-0 ms-2 mt-2">
                    <i class="bi bi-file-earmark-plus-fill text-warning"></i>
                    Post a New Job
                </div>
            </NuxtLink>
        </ul>
    </div>
</template>

<script setup>

</script>

<style></style>
