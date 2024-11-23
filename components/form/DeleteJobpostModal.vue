<template>
    <CVModal id_model="deleteJobModal">
        <template #icon>
            <slot name="icon"></slot>
        </template>
        <template #title>
            <slot name="header">Delete this Job post</slot>
        </template>
        <template #body>
            <p>Are you sure you want to delete this Job post?</p>
            <div class="modal-footer align-content-center justify-content-center">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                </button>
                <button type="button" class="btn btn-danger" @click="deleteSource">
                    Delete
                </button>
            </div>
        </template>
    </CVModal>
</template>

<script setup>
import axios from 'axios';
import { defineProps, defineEmits } from 'vue';
import Api from '~/service/Base/api.ts';
import { apiFactory } from '~/plugins/api';
import { JobStatus } from '~/models/dtos/JobPostingDTO';
const props = defineProps({
    sourceId: {
        type: String,
        required: true,
    },
});
const emits = defineEmits(['source-deleted', 'hide-modal']);

const deleteSource = async () => {
    const id = props.sourceId;
    let res = await apiFactory.employerService.updateJobStatus(id, JobStatus.Deactivate)
        .then((res) => {
            emits('source-deleted', id);
            emits('hide-modal');
            $('.btn-close').click();
        })
        .catch((error) => {
            console.error('Error when deleting source:', error);
        });;


};
</script>

<style scoped></style>
