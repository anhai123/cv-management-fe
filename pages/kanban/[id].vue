<script setup>
definePageMeta({
    middleware: 'auth'
})

import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
</script>

<template>
    <the-kanban-table :id="id"></the-kanban-table>
</template>
