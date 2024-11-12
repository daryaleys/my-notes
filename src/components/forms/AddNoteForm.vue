<script setup lang="ts">
import { ref } from "vue";
import MyForm from "../UI/MyForm.vue";
import MyInput from "../UI/MyInput.vue";
import { validateField } from "../../helpers/validation";
import { type AddNoteForm } from "../../types/formTypes";

const formValues: AddNoteForm = {
    title: "",
    comment: "",
};

const formErrors = ref<AddNoteForm>({
    title: "",
    comment: "",
});

const commonFormError = ref<string>("");

const addNoteSubmit = () => {
    console.log(formValues);

    // clear form errors
    formErrors.value.title = "";
    formErrors.value.comment = "";

    // check for new errors
    const titleError = validateField(formValues.title);
    const commentError = validateField(formValues.comment);

    if (titleError || commentError) {
        formErrors.value.title = titleError;
        formErrors.value.comment = commentError;
        return;
    }
};
</script>

<template>
    <MyForm @submitForm="addNoteSubmit" :formError="commonFormError">
        <template #title>Добавление заметки</template>

        <template #inputs>
            <MyInput id="title" type="text" label="Название заметки" placeholder="Введите название"
                :error="formErrors.title" v-model="formValues.title" />
            <MyInput id="comment" type="textarea" label="Текст заметки" placeholder="Введите текст"
                :error="formErrors.comment" v-model="formValues.comment" />
        </template>

        <template #submit-button>Добавить</template>
    </MyForm>
</template>

<style scoped></style>
