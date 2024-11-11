<script setup lang="ts">
import { ref } from "vue";
import MyForm from "../UI/MyForm.vue";
import MyInput from "../UI/MyInput.vue";
import { validateField } from "../../validation";
import { type LoginForm } from "./formTypes";

const formValues: LoginForm = {
    email: "",
    password: "",
};

const formErrors = ref<LoginForm>({
    email: "",
    password: "",
});

const commonFormError = ref<string>("");

const loginSubmit = () => {
    console.log(formValues);

    // clear form errors
    formErrors.value.email = "";
    formErrors.value.password = "";

    // check for new errors
    const emailError = validateField(formValues.email, true, true);
    const passwordError = validateField(formValues.password);

    if (emailError || passwordError) {
        formErrors.value.email = emailError;
        formErrors.value.password = passwordError;
        return;
    }
};
</script>

<template>
    <MyForm @submitForm="loginSubmit" :formError="commonFormError">
        <template #title>Вход в ваш аккаунт</template>

        <template #inputs>
            <MyInput id="email" type="email" label="E-mail" placeholder="Введите значение" :error="formErrors.email" v-model="formValues.email" />
            <MyInput id="password" type="password" label="Пароль" placeholder="Введите пароль" :error="formErrors.password" v-model="formValues.password" />
        </template>

        <template #actions>
            <div>
                <span>У вас нет аккаунта? </span>
                <button type="button" @click="$emit('changeStep', 'register')">Зарегистрируйтесь</button>
            </div>
        </template>

        <template #submit-button>Войти</template>
    </MyForm>
</template>

<style scoped></style>
