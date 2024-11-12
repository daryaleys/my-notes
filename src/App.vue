<script setup lang="ts">
import { onMounted, ref } from "vue";
import MyModal from "./components/UI/MyModal.vue";
import HeaderLayout from "./components/layout/HeaderLayout.vue";
import MainLayout from "./components/layout/MainLayout.vue";
import AccountLayout from "./components/layout/AccountLayout.vue";
import LoginForm from "./components/forms/LoginForm.vue";
import RegisterForm from "./components/forms/RegisterForm.vue";
import { type ResponseResult } from "./types/requestTypes";
import { sendRequest } from "./helpers/requests";
import { removeInfo } from "./helpers/tokenMethods";
import { userInfoStore } from "./store";

type ModalContent = "login" | "register";

const userStore = userInfoStore();

const modalOpened = ref<boolean>(false);
const modalContent = ref<ModalContent>("login");

const openModal = (step: ModalContent) => {
    if (step === "login" || step === "register") {
        modalContent.value = step;
        modalOpened.value = true;
    }
};

const getUser = () => {
    sendRequest("/api/auth", "GET", true).then((result: ResponseResult) => {
        if (!result.hasError && result.data) {
            userStore.userInfo = result.data;
        } else {
            userStore.userInfo = null;
            removeInfo();
        }
    });
};

onMounted(() => {
    getUser();
});
</script>

<template>
    <HeaderLayout @openModal="openModal($event)" />

    <MainLayout v-if="!userStore.userInfo" />
    <AccountLayout v-else />

    <MyModal v-model="modalOpened">
        <LoginForm v-if="modalContent === 'login'" @changeStep="openModal($event)" @loginSuccess="() => { modalOpened = false; getUser();}" />
        <RegisterForm v-else-if="modalContent === 'register'" @changeStep="openModal($event)" />
    </MyModal>
</template>

<style scoped></style>
