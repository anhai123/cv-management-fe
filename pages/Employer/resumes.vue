<template>

    <div class="card bg-light">
        <div class="padding-left">

            <div class="emply-resume-sec">
                <h3>Resume</h3>
                <div class="emply-resume-list">
                    <div class="emply-resume-thumb">
                        <img src="/assets/images/resource/er1.jpg" alt="" />
                    </div>
                    <div class="emply-resume-info">
                        <h3><a href="#" title="">Ali TUFAN</a></h3>
                        <span><i>UX / UI Designer</i> at Atract Solutions</span>
                        <p><i class="la la-map-marker"></i>Istanbul / Turkey</p>
                    </div>
                    <div class="action-resume">
                        <div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                                @click.prevent="toggleDropdown" :aria-expanded="isOpen">
                                Dropdown link
                            </a>

                            <ul class="dropdown-menu" :class="{ 'show': isOpen }">
                                <li><a class="dropdown-item" href="#" @click.prevent="selectItem('Action')">Action</a>
                                </li>
                                <li><a class="dropdown-item" href="#"
                                        @click.prevent="selectItem('Another action')">Another action</a></li>
                                <li><a class="dropdown-item" href="#"
                                        @click.prevent="selectItem('Something else here')">Something else here</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Delete icon -->
                    <div class="del-resume">
                        <a href="#" title=""><i class="la la-trash-o"></i></a>
                    </div>
                </div><!-- Emply List -->
            </div>
        </div>

    </div>

</template>

<script setup>

const isOpen = ref(false)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const selectItem = (item) => {
    console.log(`Selected: ${item}`)
    isOpen.value = false
}
</script>

<style></style>
