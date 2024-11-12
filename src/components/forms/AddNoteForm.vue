<script setup lang="ts">
import { reactive, ref } from "vue";
import MyForm from "../UI/MyForm.vue";
import MyInput from "../UI/MyInput.vue";
import { type AddNoteForm } from "../../types/formTypes";
import { sendRequest } from "../../helpers/requests";
import { ResponseResult } from "../../types/requestTypes";

const emit = defineEmits(['addNote', 'changeStep', 'authorizationRequired'])

const formValues = reactive<AddNoteForm>({
    title: "",
    content: "",
});

const formErrors = reactive<AddNoteForm>({
    title: "",
    content: "",
});

const commonFormError = ref<string>("");

const addNoteSubmit = () => {
    // clear form errors
    commonFormError.value = "";
    formErrors.title = "";
    formErrors.content = "";

    if (!formValues.title) {
        formErrors.title = "Заголовок не может быть пустым";
    }
    if (!formValues.content) {
        formErrors.content = "Описание не может быть пустым";
    }

    // check if all errors are empty
    const isValid = Object.values(formErrors).every(item => item === '');

    if (isValid) {
        sendRequest("/api/notes", "POST", true, formValues)
            .then((result: ResponseResult) => {
                if (result.status === 401) {
                    emit('authorizationRequired');
                } else if (result.hasError) {
                    commonFormError.value = result.errorMessage ?? "Не удалось создать заметку";
                } else {
                    emit('addNote', result.data);
                }
            });
    }
};
</script>

<template>
    <MyForm @submitForm="addNoteSubmit" :formError="commonFormError">
        <template #title>Добавление заметки</template>

        <template #inputs>
            <MyInput id="title" type="text" label="Название заметки" placeholder="Введите название"
                :error="formErrors.title" :maxlength="100" v-model="formValues.title" />
            <MyInput id="content" type="textarea" label="Текст заметки" placeholder="Введите текст"
                :error="formErrors.content" :maxlength="500" v-model="formValues.content" />
        </template>

        <template #submit-button>Добавить</template>
    </MyForm>
</template>

<style scoped></style>
