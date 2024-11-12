<script setup lang="ts">
import { reactive, ref } from "vue";
import MyForm from "../UI/MyForm.vue";
import MyInput from "../UI/MyInput.vue";
import { validateEmail, validatePassword } from "../../helpers/validation";
import { type LoginForm } from "../../types/formTypes";
import { sendRequest } from "../../helpers/requests";
import { ResponseResult } from "../../types/requestTypes";
import { setInfo } from "../../helpers/tokenMethods";

const emit = defineEmits(['authorize', 'changeStep'])

const formValues = reactive<LoginForm>({
    email: "",
    password: "",
});

const formErrors = reactive<LoginForm>({
    email: "",
    password: "",
});

const commonFormError = ref<string>("");

const loginSubmit = () => {
    commonFormError.value = "";

    formErrors.email = validateEmail(formValues.email);
    formErrors.password = validatePassword(formValues.password);

    // check if all errors are empty
    const isValid = Object.values(formErrors).every(item => item === '');

    if (isValid) {
        sendRequest("/api/auth", "POST", false, formValues)
            .then((result: ResponseResult) => {
                if (result.hasError) {
                    commonFormError.value = result.errorMessage ?? "Не удалось авторизоваться";
                } else {
                    setInfo(result.data.accessToken);
                    emit('authorize', formValues.email);
                }
            });
    }
};
</script>

<template>
    <MyForm @submitForm="loginSubmit" :formError="commonFormError">
        <template #title>Вход в ваш аккаунт</template>

        <template #inputs>
            <MyInput id="email" type="email" label="E-mail" placeholder="Введите значение" :error="formErrors.email"
                v-model="formValues.email" />
            <MyInput id="password" type="password" label="Пароль" placeholder="Введите пароль"
                :error="formErrors.password" v-model="formValues.password" />
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
