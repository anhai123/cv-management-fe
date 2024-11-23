<script setup>
// definePageMeta({
//     middleware: 'auth'
// })

import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
console.log(id);
</script>

<template>
    <PostJob :id="id" />
</template>
