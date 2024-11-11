<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import NotesButton from "../UI/NotesButton.vue";
import InlineSvg from "vue-inline-svg";
import logo from "/src/assets/logo.svg?url";
import loginIcon from "/src/assets/icons/login.svg?url";
import userIcon from "/src/assets/icons/user.svg?url";

defineProps<{ isAccount: boolean }>();

const dropdownOpened = ref<boolean>(false);

/* close drop down on click outside */
const dropdownTarget = ref(null);
onClickOutside(dropdownTarget, () => (dropdownOpened.value = false));
</script>

<template>
    <header class="header">
        <div class="container header__container">
            <div class="logo" :class="{ 'account-logo': isAccount }">
                <img :src="logo" alt="" class="logo-img" width="219" height="50" />
            </div>

            <NotesButton type="icon-text" v-if="!isAccount">
                <inline-svg :src="loginIcon" width="34" height="34" aria-hidden="true"></inline-svg>
                Вход
            </NotesButton>

            <div class="user" v-else>
                <span class="user-name">e-mail@mail.mail</span>
                <button class="user-btn" @click="dropdownOpened = !dropdownOpened" ref="dropdownTarget">
                    <inline-svg :src="userIcon" width="22" height="28" aria-hidden="true" class="user-icon"></inline-svg>
                    <Transition>
                        <a href="/logout" class="dropdown" v-if="dropdownOpened">Выйти</a>
                    </Transition>
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    padding: 40px 160px;
}

.header__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.logo-img {
    width: 100%;
    height: auto;
}

.user {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
}

.user-name {
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    text-align: center;
    color: var(--color-white);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.user-btn {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-dark-middle);
    flex-shrink: 0;
}

.dropdown {
    position: absolute;
    top: 77px;
    right: 0;
    background: var(--color-dark-middle);
    border-radius: 12px;
    padding: 40px;
    z-index: 10;
    font-weight: 700;
    font-size: 18px;
    line-height: 156%;
    color: var(--color-green-light);

    &::after {
        content: "";
        position: absolute;
        top: -18px;
        right: 20px;
        border: 9px solid transparent;
        border-bottom: 9px solid var(--color-dark-middle);
    }
}

.v-enter-active,
.v-leave-active {
    transition: 0.3s ease-in-out;
    transition-property: opacity, transform;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

@media screen and (width <= 1366px) {
    .header {
        padding: 20px 80px;
    }
}

@media screen and (width <= 1023px) {
    .header {
        padding: 20px 40px;
    }
}

@media screen and (width <= 767px) {
    .header {
        padding: 20px;
    }

    .logo {
        width: 154px;

        &.account-logo {
            width: 37px;

            & > .logo-img {
                width: 37px;
                height: 35px;
                object-fit: cover;
                object-position: 0 0;
            }
        }
    }

    .user {
        width: 75%;
    }

    .user-name {
        display: block;
        font-size: 14px;
    }

    .user-btn {
        width: 36px;
        height: 36px;
    }

    .user-icon {
        width: 16px;
        height: auto;
    }

    .dropdown {
        top: 50px;
        padding: 20px;
        font-size: 14px;

        &::after {
            top: -12px;
            right: 12px;
            border-width: 7px;
            border-bottom-width: 7px;
        }
    }
}
</style>
