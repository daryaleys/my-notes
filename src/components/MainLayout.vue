<script setup lang="ts">
import mainNotes from "/src/assets/main-notes.webp?url";
</script>

<template>
    <div class="main">
        <div class="container main__container">
            <div class="main__info">
                <h1 class="main__title">Мои заметки</h1>
                <h3 class="main__subtitle">Не забывай о важном,<br aria-hidden="true" /> храни его в облаке.</h3>
            </div>
            <img width="898" height="864" :src="mainNotes" alt="" class="main__image" />
        </div>
    </div>
</template>

<style scoped>
.main {
    padding: 0 160px;
}

.main__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
}

.main__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    padding-bottom: 48px;
}

.main__title {
    font-size: 104px;
    font-weight: 900;
    line-height: 100%;
    color: var(--color-white);
}

.main__subtitle {
    font-weight: 400;
    font-size: 32px;
    line-height: 150%;
    color: var(--color-gray);
}

.main__image {
    max-width: 56%;
    height: auto;
}

@media screen and (width <= 1366px) {
    .main {
        padding: 0 80px;
    }

    .main__container {
        gap: 0;
    }

    .main__image {
        max-width: 52%;
    }
}

@media screen and (width <= 1023px) {
    .main {
        padding: 40px 40px 0 40px;
    }

    .main__container {
        flex-direction: column;
        justify-content: flex-start;
    }

    .main__info {
        align-items: center;
        gap: 20px;
        padding-bottom: 0;
    }

    .main__title {
        text-align: center;
    }

    .main__subtitle {
        text-align: center;

        & > br {
            display: none;
        }
    }

    .main__image {
        max-width: 100%;
        width: 560px;
    }
}

@media screen and (width <= 767px) {
    .main {
        padding: 20px 20px 0 20px;
    }

    .main__container {
        gap: 17px;
    }

    .main__title {
        font-size: 60px;
    }

    .main__subtitle {
        font-size: 24px;
    }
}
</style>
