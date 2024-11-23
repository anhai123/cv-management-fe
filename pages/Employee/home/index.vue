<template>
    <section>
        <div class="block remove-top bg-light">
            <div class="container">
                <div class="row no-gape">
                    <aside class="col-lg-3 column">
                        <form @submit.prevent="handleSubmit">
                            <button type="submit">Submit</button>
                            <div class="widget border">
                                <h3 class="sb-title closed">Date Posted</h3>
                                <div class="posted_widget">
                                    <input type="radio" name="choose" id="232" :value="CreatedAtOptions.LastHour"
                                        v-model="form.createdAt">
                                    <label for="232">Last Hour</label><br />
                                    <input type="radio" name="choose" id="wwqe" :value="CreatedAtOptions.Last24Hours"
                                        v-model="form.createdAt">
                                    <label for="wwqe">Last 24 hours</label><br />
                                    <input type="radio" name="choose" id="erewr" :value="CreatedAtOptions.Last7Days"
                                        v-model="form.createdAt">
                                    <label for="erewr">Last 7 days</label><br />
                                    <input type="radio" name="choose" id="qwe" :value="CreatedAtOptions.Last14Days"
                                        v-model="form.createdAt">
                                    <label for="qwe">Last 14 days</label><br />
                                    <input type="radio" name="choose" id="wqe" :value="CreatedAtOptions.Last30Days"
                                        v-model="form.createdAt">
                                    <label for="wqe">Last 30 days</label><br />
                                    <input type="radio" name="choose" id="qweqw" :value="CreatedAtOptions.All"
                                        v-model="form.createdAt">
                                    <label for="qweqw">All</label><br />
                                </div>
                            </div>
                            <div class="widget border">
                                <h3 class="sb-title closed">Job Type</h3>
                                <div class="type_widget">
                                    <p class="flchek">
                                        <input type="checkbox" name="choosetype" id="33r" :value="JobTypes.Freelance"
                                            v-model="form.employmentType">
                                        <label for="33r">Freelance</label>
                                    </p>
                                    <p class="ftchek">
                                        <input type="checkbox" name="choosetype" id="dsf" :value="JobTypes.FullTime"
                                            v-model="form.employmentType">
                                        <label for="dsf">Full Time</label>
                                    </p>
                                    <p class="ischek">
                                        <input type="checkbox" name="choosetype" id="sdd" :value="JobTypes.Internship"
                                            v-model="form.employmentType">
                                        <label for="sdd">Internship</label>
                                    </p>
                                    <p class="ptchek">
                                        <input type="checkbox" name="choosetype" id="sadd" :value="JobTypes.PartTime"
                                            v-model="form.employmentType">
                                        <label for="sadd">Part Time</label>
                                    </p>
                                    <p class="tpchek">
                                        <input type="checkbox" name="choosetype" id="assa" :value="JobTypes.Temporary"
                                            v-model="form.employmentType">
                                        <label for="assa">Temporary</label>
                                    </p>
                                    <p class="vtchek">
                                        <input type="checkbox" name="choosetype" id="ghgf" :value="JobTypes.Volunteer"
                                            v-model="form.employmentType">
                                        <label for="ghgf">Volunteer</label>
                                    </p>
                                </div>
                            </div>
                            <div class="widget border">
                                <h3 class="sb-title closed">Offered Salary</h3>
                                <div class="specialism_widget">
                                    <div class="simple-checkbox">
                                        <div class="range-slider">
                                            <span @change="slider" class="d-flex align-items-center">from <input
                                                    v-model.number="form.offeredSalaryFrom" type="number" min="0"
                                                    max="120000" class="form-control mx-2" /> to <input
                                                    v-model.number="form.offeredSalaryTo" type="number" min="0"
                                                    max="120000" class="form-control mx-2" /></span>
                                            <input @change="slider" v-model.number="form.offeredSalaryFrom" min="0"
                                                max="120000" step="500" type="range" />
                                            <input @change="slider" v-model.number="form.offeredSalaryTo" min="0"
                                                max="120000" step="500" type="range" />
                                            <!-- <svg width="100%" height="24">
                                                <line x1="4" y1="0" x2="300" y2="0" stroke="#444" stroke-width="12"
                                                    stroke-dasharray="1 28"></line>
                                            </svg> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="widget border">
                                <h3 class="sb-title closed">Career Level</h3>
                                <div class="specialism_widget">
                                    <div class="simple-checkbox">
                                        <p><input type="checkbox" name="careerLevel" id="5" value="Intermediate"
                                                v-model="form.careerLevel">
                                            <label for="5">Intermediate</label>
                                        </p>
                                        <p><input type="checkbox" name="careerLevel" id="6" value="Normal"
                                                v-model="form.careerLevel">
                                            <label for="6">Normal</label>
                                        </p>
                                        <p><input type="checkbox" name="careerLevel" id="7" value="Special"
                                                v-model="form.careerLevel">
                                            <label for="7">Special</label>
                                        </p>
                                        <p><input type="checkbox" name="careerLevel" id="8" value="Experienced"
                                                v-model="form.careerLevel">
                                            <label for="8">Experienced</label>
                                        </p>
                                    </div>
                                </div>
                            </div> -->
                            <div class="widget border">
                                <h3 class="sb-title closed">Experience</h3>
                                <div class="specialism_widget">
                                    <div class="simple-checkbox">
                                        <p>
                                            <input type="checkbox" name="experience" id="entry"
                                                :value="ExperienceLevels.Entry" v-model="form.experience">
                                            <label for="entry">Entry</label>
                                        </p>
                                        <p>
                                            <input type="checkbox" name="experience" id="midlevel"
                                                :value="ExperienceLevels.MidLevel" v-model="form.experience">
                                            <label for="midlevel">Mid-Level</label>
                                        </p>
                                        <p>
                                            <input type="checkbox" name="experience" id="senior"
                                                :value="ExperienceLevels.Senior" v-model="form.experience">
                                            <label for="senior">Senior</label>
                                        </p>
                                        <p>
                                            <input type="checkbox" name="experience" id="executive"
                                                :value="ExperienceLevels.Executive" v-model="form.experience">
                                            <label for="executive">Executive</label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="widget border">
                                <h3 class="sb-title closed">Gender</h3>
                                <div class="specialism_widget">
                                    <div class="simple-checkbox">
                                        <p><input type="checkbox" name="gender" id="13" value="Male"
                                                v-model="form.gender">
                                            <label for="13">Male</label>
                                        </p>
                                        <p><input type="checkbox" name="gender" id="14" value="Female"
                                                v-model="form.gender">
                                            <label for="14">Female</label>
                                        </p>
                                        <p><input type="checkbox" name="gender" id="15" value="Others"
                                                v-model="form.gender">
                                            <label for="15">Others</label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="widget border">
                                <h3 class="sb-title closed">Industry</h3>
                                <div class="specialism_widget">
                                    <div class="simple-checkbox">
                                        <p><input type="checkbox" name="industry" id="16" value="Meezan Job"
                                                v-model="form.industry">
                                            <label for="16">Meezan Job</label>
                                        </p>
                                        <p><input type="checkbox" name="industry" id="17" value="Specialize Jobs"
                                                v-model="form.industry">
                                            <label for="17">Specialize Jobs</label>
                                        </p>
                                        <p><input type="checkbox" name="industry" id="18" value="Business Jobs"
                                                v-model="form.industry">
                                            <label for="18">Business Jobs</label>
                                        </p>
                                    </div>
                                </div>
                            </div> -->
                            <div class="widget border mb-5">
                                <h3 class="sb-title closed">Qualification</h3>
                                <div class="specialism_widget">
                                    <div class="simple-checkbox">
                                        <p>
                                            <input type="checkbox" name="qualification" id="highschool"
                                                :value="EducationLevels.HighSchool" v-model="form.qualification">
                                            <label for="highschool">High School</label>
                                        </p>
                                        <p>
                                            <input type="checkbox" name="qualification" id="bachelorsdegree"
                                                :value="EducationLevels.BachelorsDegree" v-model="form.qualification">
                                            <label for="bachelorsdegree">Bachelor's Degree</label>
                                        </p>
                                        <p>
                                            <input type="checkbox" name="qualification" id="mastersdegree"
                                                :value="EducationLevels.MastersDegree" v-model="form.qualification">
                                            <label for="mastersdegree">Master's Degree</label>
                                        </p>
                                        <p>
                                            <input type="checkbox" name="qualification" id="phd"
                                                :value="EducationLevels.PhD" v-model="form.qualification">
                                            <label for="phd">PhD</label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="widget border">
                                <h3 class="sb-title closed">Specialism</h3>
                                <div class="specialism_widget">
                                    <div class="field_w_search">
                                        <input type="text" placeholder="Search Specialisms"
                                            v-model="form.specialismSearch" />
                                    </div>
                                    <div class="simple-checkbox scrollbar overflow-scroll">
                                        <p><input type="checkbox" name="specialism" id="as" value="Accountancy"
                                                v-model="form.specialism">
                                            <label for="as">Accountancy (2)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="asd" value="Banking"
                                                v-model="form.specialism">
                                            <label for="asd">Banking (2)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="errwe"
                                                value="Charity & Voluntary" v-model="form.specialism">
                                            <label for="errwe">Charity & Voluntary (3)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="fdg" value="Digital & Creative"
                                                v-model="form.specialism">
                                            <label for="fdg">Digital & Creative (4)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="sc" value="Estate Agency"
                                                v-model="form.specialism">
                                            <label for="sc">Estate Agency (3)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="aw" value="Graduate"
                                                v-model="form.specialism">
                                            <label for="aw">Graduate (2)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="ui" value="IT Contractor"
                                                v-model="form.specialism">
                                            <label for="ui">IT Contractor (7)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="saas"
                                                value="Charity & Voluntary" v-model="form.specialism">
                                            <label for="saas">Charity & Voluntary (3)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="rrrt" value="Digital & Creative"
                                                v-model="form.specialism">
                                            <label for="rrrt">Digital & Creative (4)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="eweew" value="Estate Agency"
                                                v-model="form.specialism">
                                            <label for="eweew">Estate Agency (3)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="bnbn" value="Graduate"
                                                v-model="form.specialism">
                                            <label for="bnbn">Graduate (2)</label>
                                        </p>
                                        <p><input type="checkbox" name="specialism" id="ffd" value="IT Contractor"
                                                v-model="form.specialism">
                                            <label for="ffd">IT Contractor (7)</label>
                                        </p>
                                    </div>
                                </div>
                            </div> -->
                        </form>
                    </aside>
                    <div class="col-lg-9 column">
                        <div class="modrn-joblist np">
                            <div class="filterbar">

                                <h5>{{ pagination.totalCount }} Jobs & Vacancies</h5>
                            </div>
                        </div><!-- MOdern Job LIst -->
                        <div class="job-list-modern">
                            <div class="job-listings-sec no-border">
                                <div v-for="job in listPostedJob" :key="job.id" class="job-listing wtabs">
                                    <div class="job-title-sec">
                                        <div class="c-logo"> <img src="/assets/images/resource/l1.png" alt="" /> </div>
                                        <h3><a :href="'/Employer/job-detail/' + job.id" title="">{{ job.jobTitle }}</a>
                                        </h3>
                                        <span>{{ job.username }}</span>
                                        <div class="job-lctn"><i class="la la-map-marker"></i>{{ job.address }}</div>
                                    </div>
                                    <div class="job-style-bx">
                                        <span class="job-is">{{ job.employmentType }}</span>
                                        <span class="fav-job"><i class="la la-heart-o"></i></span>
                                        <i>{{ new Date(job.createdAt).toLocaleDateString() }}</i>
                                    </div>
                                </div>

                                <div class="job-title-sec">
                                    <Pagination :current-page="pageNumber" :total-pages="pageTotal"
                                        :next-page="nextPage" :previous-page="previousPage" :set-page="setPage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { apiFactory } from '~/plugins/api';
import { EducationLevels, JobTypes, CreatedAtOptions, ExperienceLevels } from '~/assets/js/constants/constants';

const form = reactive({
    createdAt: '',
    employmentType: [],
    offeredSalaryFrom: '',
    offeredSalaryTo: '',
    experience: [],
    gender: [],
    qualification: [],
});
const listPostedJob = ref([]);
const pagination = ref({});
const pageSize = ref(5);
const pageNumber = ref(1);
const totalCount = ref(0);
const pageTotal = ref(0);
const handleSubmit = () => {
    console.log('Selected Date Posted:', form.createdAt);
    console.log('Selected Job Types:', form.employmentType);
    console.log('Selected Experience:', form.experience);
    console.log('Selected Gender:', form.gender);
    console.log('Selected Qualification:', form.qualification);

    // Handle form submission logic here
    getJobs({
        createdAt: form.createdAt,
        employmentType: form.employmentType,
        offeredSalaryFrom: form.offeredSalaryFrom,
        offeredSalaryTo: form.offeredSalaryTo,
        experience: form.experience,
    })

};

onMounted(() => {
    getJobs();
});

const getJobs = async (params = {}) => {
    let listPostedJobResponse = await apiFactory.employerService.getAllJobs({
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        ...params
    });
    listPostedJob.value = listPostedJobResponse.data.responseData.data;
    pagination.value = listPostedJobResponse.data.responseData.pagination;
    totalCount.value = pagination.value.totalCount;
    pageTotal.value = Math.ceil(totalCount.value / pageSize.value);
};

const nextPage = () => {
    pageNumber.value++;
    getJobs();
};

const previousPage = () => {
    pageNumber.value--;
    getJobs();
};

const setPage = (number) => {
    pageNumber.value = number;
    getJobs();
};

const slider = () => {
    if (form.offeredSalaryFrom > form.offeredSalaryTo) {
        let tmp = form.offeredSalaryTo;
        form.offeredSalaryTo = form.offeredSalaryFrom;
        form.offeredSalaryFrom = tmp;
    }
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

.range-slider {
    /* width: 300px; */
    margin: auto;
    text-align: center;
    position: relative;
    height: 6em;
}

.range-slider svg,
.range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
}

input[type=number] {
    border: 1px solid #ddd;
    text-align: center;
    /* font-size: 1.6em; */
    -moz-appearance: textfield;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type=number]:invalid,
input[type=number]:out-of-range {
    border: 2px solid #ff6347;
}

input[type=range] {
    -webkit-appearance: none;
    width: 100%;
}

input[type=range]:focus {
    outline: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background: #2497e3;
}

input[type=range]:focus::-ms-fill-lower {
    background: #2497e3;
}

input[type=range]:focus::-ms-fill-upper {
    background: #2497e3;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    background: #2497e3;
    border-radius: 1px;
    box-shadow: none;
    border: 0;
}

input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    box-shadow: 0px 0px 0px #000;
    border: 1px solid #2497e3;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #a1d0ff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
}
</style>
