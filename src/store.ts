import { defineStore } from "pinia";
import { ref } from "vue";
import { type UserInfo } from "./types/userInfoType";

export const userInfoStore = defineStore("userInfo", () => {
    const userInfo = ref<UserInfo | null>(null);
    return { userInfo };
});
