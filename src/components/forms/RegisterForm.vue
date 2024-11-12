<script setup lang="ts">
import { reactive, ref } from "vue";
import MyForm from "../UI/MyForm.vue";
import MyInput from "../UI/MyInput.vue";
import { validateEmail, validatePassword, validatePasswordConfirmation } from "../../helpers/validation";
import { type RegisterForm } from "../../types/formTypes";
import { sendRequest } from "../../helpers/requests";
import { ResponseResult } from "../../types/requestTypes";

const emit = defineEmits(['changeStep'])

const formValues = reactive<RegisterForm>({
    email: "",
    password: "",
    confirm_password: "",
});

const formErrors = reactive<RegisterForm>({
    email: "",
    password: "",
    confirm_password: ""
});

const commonFormError = ref<string>("");

const registerSubmit = () => {
    formErrors.email = validateEmail(formValues.email);
    formErrors.password = validatePassword(formValues.password);
    formErrors.confirm_password = validatePasswordConfirmation(formValues.password, formValues.confirm_password);

    // check if all errors are empty
    const isValid = Object.values(formErrors).every(item => item === '');

    if (isValid) {
        sendRequest("/api/reg", "POST", false, formValues)
            .then((result: ResponseResult) => {
                if (result.hasError) {
                    commonFormError.value = result.errorMessage ?? "Не удалось зарегистрироваться";
                } else {
                    emit("changeStep", "login")
                }
            })
    }
};
</script>

<template>
    <MyForm @submitForm="registerSubmit" :formError="commonFormError">
        <template #title>Регистрация</template>

        <template #inputs>
            <MyInput id="email" type="email" label="E-mail" placeholder="Введите значение" :error="formErrors.email"
                v-model="formValues.email" />
            <MyInput id="password" type="password" label="Пароль" placeholder="Введите пароль"
                :error="formErrors.password" v-model="formValues.password" />
            <MyInput id="password-repeat" type="password" label="Пароль" placeholder="Повторите пароль"
                :error="formErrors.confirm_password" v-model="formValues.confirm_password" />
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
