<script setup lang="ts">
import { onMounted, ref } from "vue";
import NotesPopup from "./components/UI/NotesPopup.vue";
import HeaderLayout from "./components/layout/HeaderLayout.vue";
import MainLayout from "./components/layout/MainLayout.vue";
import AccountLayout from "./components/layout/AccountLayout.vue";

let popupOpened = ref<boolean>(false);

let isAccount = ref<boolean>(true);

onMounted(() => {
    // запрос на получение инфы о пользователе
});
</script>

<template>
    <HeaderLayout :isAccount />

    <MainLayout v-if="!isAccount" />
    <AccountLayout v-else />

    <NotesPopup v-model="popupOpened">
        <!-- <Account /> -->
    </NotesPopup>
</template>

<style scoped></style>
