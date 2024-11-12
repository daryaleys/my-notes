<script setup lang="ts">
import { ref } from "vue";
import InlineSvg from "vue-inline-svg";
import showPasswordIcon from "/src/assets/icons/on-password.svg?url";
import hidePasswordIcon from "/src/assets/icons/off-password.svg?url";

interface InputProps {
    type: "email" | "password" | "text" | "textarea";
    id: string;
    label: string;
    placeholder: string;
    maxlength?: number,
    error: string
}
defineProps<InputProps>();

const model = defineModel();

const showPassword = ref<boolean>(false);
</script>

<template>
    <div class="input-wrap">
        <!-- label -->
        <label :for="id">{{ label }}</label>

        <!-- input -->
        <textarea v-if="type === 'textarea'" :id :placeholder v-model="model" :maxlength></textarea>

        <div v-else-if="type === 'password'" class="password-wrap">
            <input :type="showPassword ? 'text' : 'password'" :id :placeholder v-model="model" :maxlength />
            <button type="button" class="password-btn" @click="showPassword = !showPassword">
                <inline-svg :src="showPassword ? hidePasswordIcon : showPasswordIcon" width="20"
                    height="20"></inline-svg>
            </button>
        </div>

        <input v-else :type :id :placeholder v-model="model" :maxlength />

        <!-- error and length -->
        <div class="bottom">
            <span v-if="error" class="error">{{ error }}</span>
            <span v-if="maxlength" class="input-length">
                {{ (model as string).length }}/{{ maxlength }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.input-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
}

label {
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    color: var(--color-gray);
    padding: 0 24px;
}

input,
textarea {
    width: 100%;
    border: 2px solid transparent;
    outline: none;
    border-radius: 36px;
    padding: 22px 28px;
    height: 72px;
    font-family: var(--main-font);
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    color: var(--color-dark);
    transition: border-color .3s ease-in-out;

    &::placeholder {
        color: var(--color-gray);
    }

    &:hover,
    &:focus {
        border: 2px solid var(--color-green-light);
    }
}

textarea {
    height: 168px;
}

.password-wrap {
    width: 100%;
    position: relative;
}

.password-btn {
    position: absolute;
    top: 26px;
    right: 26px;
    cursor: pointer;
}

.bottom {
    width: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}

.error {
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    color: var(--color-error);
}

.input-length {
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    text-align: right;
    color: var(--color-gray);
    margin-left: auto;
}


@media screen and (width <=1366px) {}

@media screen and (width <=1023px) {}

@media screen and (width <=767px) {}
</style>
