<script setup lang="ts">
const opened = defineModel()
</script>

<template>
    <div v-if="opened" class="modal" @click.self="opened = false">
        <div class="modal-window">
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-window {
    width: 300px;
    height: 300px;
    background: white;
}
</style>
