<script setup lang="ts">
import MyButton from "./MyButton.vue";
import InlineSvg from "vue-inline-svg";
import closeIcon from "/src/assets/icons/close.svg?url";
import { onMounted, onUnmounted, watch } from "vue";

const opened = defineModel();

const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") opened.value = false;
};

onMounted(() => {
    window.addEventListener("keydown", closeOnEscape);
});

onUnmounted(() => {
    window.removeEventListener("keydown", closeOnEscape);
});

watch(opened, () => {
    document.body.classList.toggle("_hidden");
});
</script>

<template>
    <Transition>
        <div v-if="opened" class="modal" @mousedown.self="opened = false">
            <div class="modal__wrap">
                <div class="modal__content">
                    <MyButton btnType="round" @btnClick="opened = false" class="modal__close-btn">
                        <inline-svg :src="closeIcon" width="20" height="20" aria-hidden="true"></inline-svg>
                    </MyButton>

                    <slot />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal {
    width: 100vw;
    height: 100vh;
    height: 100svh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    background: rgba(10, 31, 56, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal__wrap {
    max-height: 100%;
    max-width: 100%;

    &::before,
    &::after {
        content: "";
        display: block;
        flex-shrink: 0;
        width: 100%;
        height: 20px;
    }
}

.modal__content {
    position: relative;
    border-radius: 40px;
    padding: 80px;
    background: var(--color-dark-middle);
    width: 780px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
}

.modal__close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

@media screen and (width <= 1366px) {
    .modal__content {
        padding: 56px;
        width: 594px;
        max-width: 100%;
    }
}

@media screen and (width <= 767px) {
    .modal__close-btn {
        top: 12px;
        right: 12px;
    }
}

@media screen and (width <= 425px) {
    .modal__content {
        padding: 16px 24px;
        height: 100vh;
        height: 100svh;
    }

    .modal__wrap {
        &::before,
        &::after {
            height: 1px;
        }
    }
}
</style>
