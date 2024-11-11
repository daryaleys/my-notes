<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import deleteIcon from "/src/assets/icons/close.svg?url";
defineProps<{ id: number; title: string; content: string }>();
</script>

<template>
    <div class="note">
        <h4 class="note__title">{{ title }}</h4>
        <p class="note__content">{{ content }}</p>

        <button class="note__delete" @click="$emit('delete', id)">
            <inline-svg :src="deleteIcon" width="20" height="20" aria-hidden="true" class="delete-icon"></inline-svg>
            Удалить
        </button>
    </div>
</template>

<style scoped>
.note {
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    background: linear-gradient(-135deg, transparent 28px, var(--color-green-light) 28px);
    border-radius: 12px;
    box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);

    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        border-bottom: 40px solid var(--color-green);
        border-right: 40px solid transparent;
        border-bottom-left-radius: 12px;
    }
}

.note__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 133%;
    color: var(--color-white);
    width: 100%;
    padding: 20px 96px 20px 28px;
    border-bottom: 1px solid var(--color-green-middle);
}

.note__content {
    font-weight: 500;
    font-size: 20px;
    line-height: 160%;
    color: var(--color-white);
    padding: 20px 28px;
    width: 100%;
}

.note__delete {
    align-self: flex-end;
    padding: 28px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-weight: 500;
    font-size: 20px;
    line-height: 160%;
    color: var(--color-white);
}

@media screen and (width <= 767px) {
    .note {
        border-radius: 12px;
    }

    .note__title {
        font-size: 20px;
    }

    .note__content {
        font-size: 16px;
    }
}
</style>
