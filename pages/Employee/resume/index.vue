<template>
    <div class="padding-left">
        <div class="manage-jobs-sec">
            <div class="border-title">
                <h3>Candidates Dashboard</h3><a href="#" title=""><i class="la la-plus"></i> Add Education</a>
            </div>
            <div class="edu-history-sec">
                <div class="edu-history" v-for="(edu, index) in educationHistory" :key="index">
                    <i class="la la-graduation-cap"></i>
                    <div class="edu-hisinfo">
                        <h3>{{ edu.title }}</h3>
                        <i>{{ edu.period }}</i>
                        <span>{{ edu.institution }} <i>{{ edu.degree }}</i></span>
                        <p>{{ edu.description }}</p>
                    </div>
                    <ul class="action_job">
                        <li><span>Edit</span><a href="#" title=""><i class="la la-pencil"></i></a></li>
                        <li><span>Delete</span><a href="#" title=""><i class="la la-trash-o"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="border-title">
                <h3>Work Experience</h3><a href="#" title=""><i class="la la-plus"></i> Add Experience</a>
            </div>
            <div class="edu-history-sec">
                <div class="edu-history style2" v-for="(work, index) in workExperience" :key="index">
                    <i></i>
                    <div class="edu-hisinfo">
                        <h3>{{ work.title }} <span>{{ work.company }}</span></h3>
                        <i>{{ work.period }}</i>
                        <p>{{ work.description }}</p>
                    </div>
                    <ul class="action_job">
                        <li><span>Edit</span><a href="#" title=""><i class="la la-pencil"></i></a></li>
                        <li><span>Delete</span><a href="#" title=""><i class="la la-trash-o"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="border-title">
                <h3>Portfolio</h3><a href="#" title=""><i class="la la-plus"></i> Add Portfolio</a>
            </div>
            <div class="mini-portfolio">
                <div class="mp-row">
                    <div class="mp-col" v-for="(item, index) in portfolio" :key="index">
                        <div class="mportolio"><img :src="getImageUrl(item.imageUrl)" alt="" /><a href="#" title=""><i
                                    class="la la-search"></i></a></div>
                        <ul class="action_job">
                            <li><span>Edit</span><a href="#" title=""><i class="la la-pencil"></i></a></li>
                            <li><span>Delete</span><a href="#" title=""><i class="la la-trash-o"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="border-title">
                <h3>Professional Skills</h3><a href="#" title=""><i class="la la-plus"></i> Add Skills</a>
            </div>
            <div class="edu-history-sec">
                <div class="edu-history style2" v-for="(skill, index) in professionalSkills" :key="index">
                    <i></i>
                    <div class="edu-hisinfo">
                        <h3>{{ skill.title }}</h3>
                        <i>{{ skill.period }}</i>
                        <p>{{ skill.description }}</p>
                    </div>
                    <ul class="action_job">
                        <li><span>Edit</span><a href="#" title=""><i class="la la-pencil"></i></a></li>
                        <li><span>Delete</span><a href="#" title=""><i class="la la-trash-o"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Education {
    title: string;
    period: string;
    institution: string;
    degree: string;
    description: string;
}

interface WorkExperience {
    title: string;
    company: string;
    period: string;
    description: string;
}

interface PortfolioItem {
    imageUrl: string;
}

interface ProfessionalSkill {
    title: string;
    period: string;
    description: string;
}

const educationHistory = ref<Education[]>([
    {
        title: "University",
        period: "2008 - 2012",
        institution: "Middle East Technical University",
        degree: "Computer Science",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
        title: "High School",
        period: "2008 - 2012",
        institution: "Tomms College",
        degree: "Bachlors in Fine Arts",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    }
]);

const workExperience = ref<WorkExperience[]>([
    {
        title: "Web Designer",
        company: "Inwave Studio",
        period: "2008 - 2012",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
        title: "CEO Founder",
        company: "Inwave Studio",
        period: "2008 - 2012",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    }
]);

const portfolio = ref<PortfolioItem[]>([
    { imageUrl: "/assets/images/resource/p1.jpg" },
    { imageUrl: "/assets/images/resource/p2.jpg" },
    { imageUrl: "/assets/images/resource/p3.jpg" },
    { imageUrl: "/assets/images/resource/p4.jpg" }
]);

const professionalSkills = ref<ProfessionalSkill[]>([
    {
        title: "Perfect Attendance Programs",
        period: "2008 - 2012",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
        title: "Top Performer Recognition",
        period: "2008 - 2012",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
        title: "King LLC",
        period: "2008 - 2012",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    }
]);

const getImageUrl = (path: string) => {
    return `/_nuxt/assets/images/resource/${path.split('/').pop()}`;
};
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
