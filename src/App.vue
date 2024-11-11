<script setup lang="ts">
import { onMounted, ref } from "vue";
import NotesPopup from "./components/UI/NotesPopup.vue";
import HeaderLayout from "./components/HeaderLayout.vue";
import MainLayout from "./components/MainLayout.vue";

let popupOpened = ref<boolean>(false);

let isAccount = ref<boolean>(false);

onMounted(() => {
    // запрос на получение инфы о пользователе
})
</script>

<template>
    <HeaderLayout />
    <MainLayout />

    <NotesPopup v-model="popupOpened">
        <!-- <Account /> -->
    </NotesPopup>
</template>

<style scoped></style>
