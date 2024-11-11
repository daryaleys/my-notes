<script setup lang="ts">
import { ref } from "vue";
import MyForm from "../UI/MyForm.vue";
import MyInput from "../UI/MyInput.vue";
import { validateField } from "../../validation";
import { type RegisterForm } from "./formTypes";

const formValues: RegisterForm = {
    email: "",
    password: "",
    password_repeat: "",
};

const formErrors = ref<RegisterForm>({
    email: "",
    password: "",
    password_repeat: ""
});

const commonFormError = ref<string>("");

const registerSubmit = () => {
    console.log(formValues);

    // clear form errors
    formErrors.value.email = "";
    formErrors.value.password = "";
    formErrors.value.password_repeat = "";

    // check for new errors
    const emailError = validateField(formValues.email, true, true);
    const passwordError = validateField(formValues.password);
    const passwordRepeatError = validateField(formValues.password_repeat, true, false, formValues.password);

    if (emailError || passwordError || passwordRepeatError) {
        formErrors.value.email = emailError;
        formErrors.value.password = passwordError;
        formErrors.value.password_repeat = passwordRepeatError;
        return;
    }

};
</script>

<template>
    <MyForm @submitForm="registerSubmit" :formError="commonFormError">
        <template #title>Регистрация</template>

        <template #inputs>
            <MyInput id="email" type="email" label="E-mail" placeholder="Введите значение" :error="formErrors.email" v-model="formValues.email" />
            <MyInput id="password" type="password" label="Пароль" placeholder="Введите пароль" :error="formErrors.password" v-model="formValues.password" />
            <MyInput id="password-repeat" type="password" label="Пароль" placeholder="Повторите пароль" :error="formErrors.password_repeat" v-model="formValues.password_repeat" />
        </template>

        <template #actions>
            <div>
                <span>У вас есть аккаунт? </span>
                <button type="button" @click="$emit('changeStep', 'login')">Войдите</button>
            </div>
        </template>

        <template #submit-button>Зарегистрироваться</template>
    </MyForm>
</template>

<style scoped></style>
