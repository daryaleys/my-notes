<script setup lang="ts">
import { onMounted, ref } from "vue";
import MyModal from "./components/UI/MyModal.vue";
import HeaderLayout from "./components/layout/HeaderLayout.vue";
import MainLayout from "./components/layout/MainLayout.vue";
import AccountLayout from "./components/layout/AccountLayout.vue";
import LoginForm from "./components/forms/LoginForm.vue";
import RegisterForm from "./components/forms/RegisterForm.vue";
import AddNoteForm from "./components/forms/AddNoteForm.vue";
import { type ResponseResult } from "./types/requestTypes";
import { formContent } from "./types/formTypes";
import { sendRequest } from "./helpers/requests";
import { removeInfo } from "./helpers/tokenMethods";

const isAccount = ref<boolean>(false);
const userEmail = ref<string>("");
const modalOpened = ref<boolean>(false);
const modalContent = ref<(typeof formContent)[number]>("login");

const openModal = (step: (typeof formContent)[number]) => {
    if (formContent.includes(step)) {
        modalContent.value = step;
        if (!modalOpened.value) modalOpened.value = true;
    }
};

const checkUser = () => {
    sendRequest("/api/auth", "GET", true)
        .then((result: ResponseResult) => {
            if (result.hasError) {
                removeInfo();
            } else {
                authorize(result.data.email);
            }
        });
}

const authorize = (email: string) => {
    modalOpened.value = false;
    userEmail.value = email;
    isAccount.value = true;
}

const unauthorize = () => {
    sendRequest("/api/auth", "DELETE", true)
        .then(() => {
            isAccount.value = false;
            removeInfo();
        })
}

onMounted(() => {
    checkUser();
})
</script>

<template>
    <HeaderLayout :isAccount :userEmail @openModal="openModal($event)" @unauthorize="unauthorize" />

    <MainLayout v-if="!isAccount" />
    <AccountLayout v-else @openModal="openModal($event)" />

    <MyModal v-model="modalOpened">
        <LoginForm v-if="modalContent === 'login'" @changeStep="openModal($event)" @authorize="authorize" />
        <RegisterForm v-else-if="modalContent === 'register'" @changeStep="openModal($event)" />
        <AddNoteForm v-else-if="modalContent === 'addNote'" />
    </MyModal>
</template>

<style scoped></style>
