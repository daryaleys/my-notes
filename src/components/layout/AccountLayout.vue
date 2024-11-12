<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import MyButton from "../UI/MyButton.vue";
import addIcon from "/src/assets/icons/add.svg?url";
import SingleNote from "../UI/SingleNote.vue";
import { Note } from "../../types/noteType";
import { sendRequest } from "../../helpers/requests";
import { ResponseResult } from "../../types/requestTypes";
import { onMounted, ref } from "vue";
import MyModal from "../UI/MyModal.vue";
import AddNoteForm from "../forms/AddNoteForm.vue";

const modalOpened = ref<boolean>(false);

const noteList = ref<Note[]>([]);
const getNotesError = ref<string>("");

const getUserNotes = () => {
    sendRequest("/api/notes", "GET", true).then((result: ResponseResult) => {
        if (!result.hasError && result.data) {
            noteList.value = result.data as Note[];
        } else {
            getNotesError.value = "Не удалось загрузить заметки. Пожалуйста, попробуйте обновить страницу";
        }
    });
};

const addNote = (note: Note) => {
    modalOpened.value = false;
    noteList.value.push(note);
};

const deleteNote = (id: number) => {
    sendRequest(`/api/notes/${id}`, "DELETE", true)
        .then((result: ResponseResult) => {
            if (!result.hasError) {
                noteList.value = noteList.value.filter((note) => note.id !== id);
            }
        })
}

onMounted(() => {
    getUserNotes();
})
</script>

<template>
    <div class="account">
        <h3 v-if="getNotesError" class="account__error" v-text="getNotesError"></h3>

        <div v-else class="container account__container">
            <TransitionGroup>
                <SingleNote v-for="note in noteList" :key="note.id" v-bind="note" @delete="deleteNote" />
            </TransitionGroup>
        </div>

        <MyButton btnType="round" class="account__add-btn" @click="modalOpened = true">
            <inline-svg :src="addIcon" width="20" height="20" aria-hidden="true"></inline-svg>
        </MyButton>
    </div>

    <MyModal v-model="modalOpened">
        <AddNoteForm @addNote="addNote" />
    </MyModal>
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

.account__add-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);
}

.account__error {
    font-weight: 600;
    font-size: 32px;
    line-height: 150%;
    color: var(--color-error);
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

@media screen and (width <=1366px) {
    .account {
        padding: 40px 80px;
    }

    .account__container {
        gap: 20px;
    }

    .account__add-btn {
        right: 12px;
    }
}

@media screen and (width <=1200px) {
    .account__container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (width <=1023px) {
    .account {
        padding: 40px;
    }

    .account__container {
        grid-template-columns: 1fr;
    }

    .account__add-btn {
        right: 8px;
    }
}

@media screen and (width <=767px) {
    .account {
        padding: 20px;
    }
}
</style>
