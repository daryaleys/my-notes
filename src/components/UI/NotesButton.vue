<script setup lang="ts">
defineProps<{ type: "icon-text" | "round" }>();
</script>

<template>
    <button class="btn" :class="type" @click="$emit('btnClick')">
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
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease-in-out;
    transition-property: background-color;

    &.icon-text {
        gap: 12px;
        padding: 11px 24px 11px 23px;
    }

    &.round {
        padding: 19px;
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
