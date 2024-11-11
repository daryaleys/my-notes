export const formContent = ["login", "register", "addNote"];

export type LoginForm = {
    email: string;
    password: string;
}

export type RegisterForm = {
    email: string;
    password: string;
    password_repeat: string;
}

export type AddNoteForm = {
    title: string;
    comment: string;
}