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
import { type Note } from "./types/noteTypes";
import { formContent } from "./types/formTypes";
import { sendRequest } from "./helpers/requests";
import { removeInfo } from "./helpers/tokenMethods";

const isAccount = ref<boolean>(false);
const userEmail = ref<string>("");
const userNotes = ref<Note[]>([]);
const getNotesError = ref<string>("");

const modalOpened = ref<boolean>(false);
const modalContent = ref<(typeof formContent)[number]>("login");

const openModal = (step: (typeof formContent)[number]) => {
    if (formContent.includes(step)) {
        modalContent.value = step;
        modalOpened.value = true;
    }
};

const getUser = () => {
    sendRequest("/api/auth", "GET", true)
        .then((result: ResponseResult) => {
            if (!result.hasError && result.data && result.data.email) {
                goToAccount(<string>result.data.email);
            } else {
                removeInfo();
            }
        });
}

const getUserNotes = () => {
    sendRequest("/api/notes", "GET", true)
        .then((result: ResponseResult) => {
            if (!result.hasError && result.data) {
                userNotes.value = result.data as Note[];
            } else {
                getNotesError.value = "Не удалось загрузить заметки. Пожалуйста, попробуйте обновить страницу"
            }
        });
}

const removeUser = () => {
    sendRequest("/api/auth", "DELETE", true)
        .then(() => {
            isAccount.value = false;
            removeInfo();
        })
}

const goToAccount = (email: string) => {
    modalOpened.value = false;
    isAccount.value = true;
    userEmail.value = email;
    getUserNotes();
}

const addNote = (note: Note) => {
    modalOpened.value = false;
    userNotes.value.push(note);
}

const deleteNote = (id: number) => {
    userNotes.value = userNotes.value.filter((note) => note.id !== id);
}

onMounted(() => {
    getUser();
})
</script>

<template>
    <HeaderLayout :isAccount :userEmail @openModal="openModal($event)" @unauthorize="removeUser" />

    <MainLayout v-if="!isAccount" />
    <AccountLayout v-else @openModal="openModal($event)" :noteList="userNotes" :getNotesError
        @deleteNote="deleteNote" />

    <MyModal v-model="modalOpened">
        <LoginForm v-if="modalContent === 'login'" @changeStep="openModal($event)" @authorize="goToAccount" />
        <RegisterForm v-else-if="modalContent === 'register'" @changeStep="openModal($event)" />
        <AddNoteForm v-else-if="modalContent === 'addNote'" @addNote="addNote" />
    </MyModal>
</template>

<style scoped></style>
