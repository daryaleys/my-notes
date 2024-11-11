<script setup lang="ts">
import { onMounted, ref } from "vue";
import MyModal from "./components/UI/MyModal.vue";
import HeaderLayout from "./components/layout/HeaderLayout.vue";
import MainLayout from "./components/layout/MainLayout.vue";
import AccountLayout from "./components/layout/AccountLayout.vue";
import LoginForm from "./components/forms/LoginForm.vue";
import RegisterForm from "./components/forms/RegisterForm.vue";
import { formContent } from "./components/forms/formTypes";
import AddNoteForm from "./components/forms/AddNoteForm.vue";

const isAccount = ref<boolean>(true);
const modalOpened = ref<boolean>(false);
const modalContent = ref<(typeof formContent)[number]>("login");

onMounted(() => {
    // запрос на получение инфы о пользователе
});

const openModal = (step: (typeof formContent)[number]) => {
    if (formContent.includes(step)) {
        modalContent.value = step;

        if (!modalOpened.value) modalOpened.value = true;
    }
};
</script>

<template>
    <HeaderLayout :isAccount @openModal="openModal($event)" />

    <MainLayout v-if="!isAccount" />
    <AccountLayout v-else @openModal="openModal($event)" />

    <MyModal v-model="modalOpened">
        <LoginForm v-if="modalContent === 'login'" @changeStep="openModal($event)" />
        <RegisterForm v-else-if="modalContent === 'register'" @changeStep="openModal($event)" />
        <AddNoteForm v-else-if="modalContent === 'addNote'" />
    </MyModal>
</template>

<style scoped></style>
