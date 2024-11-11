<script setup lang="ts">
defineProps<{ btnType?: "round" }>();
</script>

<template>
    <button class="btn" :class="btnType" @click="$emit('btnClick')">
        <slot />
    </button>
</template>

<style scoped lang="scss">
.btn {
    font-family: var(--main-font);
    font-weight: 500;
    font-size: 20px;
    line-height: 160%;
    color: var(--color-white);
    background-color: var(--color-green-light);
    height: 56px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0 24px;
    transition: 0.2s ease-in-out;
    transition-property: background-color;

    &.round {
        width: 56px;
        padding: 0;
    }

    &:hover {
        background-color: var(--color-green-middle);
    }

    &:active {
        background-color: var(--color-green-dark);
    }

    &:disabled {
        background-color: var(--color-gray);
    }
}
</style>
