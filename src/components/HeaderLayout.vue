<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import NotesButton from "./UI/NotesButton.vue";
import logo from "/src/assets/logo.svg?url";
import loginIcon from "/src/assets/icons/login.svg?url";
</script>

<template>
    <header class="header">
        <div class="container header__container">
            <img :src="logo" alt="" class="logo" width="219" height="50" />

            <NotesButton type="icon-text">
                <inline-svg :src="loginIcon" width="34" height="34" aria-hidden="true"></inline-svg>
                Вход
            </NotesButton>
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
        height: auto;
    }
}
</style>
