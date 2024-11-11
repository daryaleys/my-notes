<script setup lang="ts">
import { onMounted, ref } from "vue";
import InlineSvg from "vue-inline-svg";
import NotesButton from "../UI/NotesButton.vue";
import addIcon from "/src/assets/icons/add.svg?url";
import SingleNote from "../notes/SingleNote.vue";

const noteList = ref([
    {
        id: 1,
        title: "Заметка 1",
        content: "А также явные признаки победы институционализации могут быть объединены в целые кластеры себе подобных.",
    },
    {
        id: 2,
        title: "Заметка 1",
        content:
            "Не следует, однако, забывать, что базовый вектор развития предопределяет высокую востребованность позиций, занимаемых участниками в отношении поставленных задач. Вот вам яркий пример современных тенденций — повышение уровня гражданского сознания требует анализа переосмысления внешнеэкономических политик.",
    },
    {
        id: 3,
        title: "Заметка 1",
        content: "А также явные признаки победы институционализации могут быть объединены в целые кластеры себе подобных.",
    },
    {
        id: 4,
        title: "Пример заголовока заметки в две строчки",
        content: "А также явные признаки победы институционализации могут быть объединены в целые кластеры себе подобных.",
    },
    {
        id: 5,
        title: "Заголовок",
        content: "А также явные признаки победы институционализации могут быть объединены в целые кластеры себе подобных.",
    },
]);

onMounted(() => {
    // запрос заметок пользователя
});

const deleteNote = (id: number) => {
    console.log(id);
};
</script>

<template>
    <div class="account">
        <div class="container account__container">
            <SingleNote v-for="note in noteList" :key="note.id" v-bind="note" @delete="deleteNote" />
        </div>

        <NotesButton type="round" class="add-btn">
            <inline-svg :src="addIcon" width="20" height="20" aria-hidden="true" class="user-icon"></inline-svg>
        </NotesButton>
    </div>
</template>

<style scoped>
.account {
    padding: 40px 160px;
}

.account__container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
}

.add-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);
}

@media screen and (width <= 1366px) {
    .account {
        padding: 40px 80px;
    }

    .account__container {
        gap: 20px;
    }

    .add-btn {
        right: 12px;
    }
}

@media screen and (width <= 1200px) {
    .account__container {
        grid-template-columns: repeat(2, 1fr);
    }

}

@media screen and (width <= 1023px) {
    .account {
        padding: 40px;
    }

    .account__container {
        grid-template-columns: 1fr;
    }
    
    .add-btn {
        right: 8px;
    }
}

@media screen and (width <= 767px) {
    .account {
        padding: 20px;
    }
}
</style>
