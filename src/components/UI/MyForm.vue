<script setup lang="ts">
import MyButton from "./MyButton.vue";

defineProps<{ formError?: string }>();
</script>

<template>
    <form novalidate class="form" @submit.prevent="$emit('submitForm')">
        <h2 class="form__title">
            <slot name="title" />
        </h2>

        <div class="form__inputs">
            <slot name="inputs" />
        </div>

        <div class="form__actions">
            <slot name="actions" />
            <MyButton type="submit" class="form__btn">
                <slot name="submit-button" />
            </MyButton>
        </div>

        <span v-if="formError" class="form__error">{{ formError }}</span>
    </form>
</template>

<style scoped>
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.form__title {
    font-weight: 600;
    font-size: 48px;
    line-height: 150%;
    color: var(--color-white);
}

.form__inputs {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    &:global(span) {
        font-weight: 400;
        font-size: 18px;
        line-height: 156%;
        color: var(--color-gray);
    }

    &:global(button) {
        font-weight: 700;
        font-size: 18px;
        line-height: 156%;
        color: var(--color-green-light);
        transition: color 0.3s ease-in-out;
    }

    &:global(button:hover) {
        color: var(--color-white);
    }
}

.form__btn {
    margin-left: auto;
    flex-shrink: 0;
}

.form__error {
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    color: var(--color-error);
    border-radius: 24px;
    padding: 8px 20px;
    background: rgba(255, 116, 97, 0.1);
    margin-top: -20px;
}

@media screen and (width <=767px) {
    .form {
        gap: 28px;
    }

    .form__title {
        font-size: 32px;
        padding-right: 80px;
    }

    .form__actions {
        flex-direction: column-reverse;
        gap: 20px;

        &:global(div) {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
        }

        &:global(span),
        &:global(button) {
            font-size: 14px;
        }
    }

    .form__btn {
        width: 100%;
    }
}
</style>
