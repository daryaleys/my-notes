export type LoginForm = {
	email: string;
	password: string;
};

export type RegisterForm = {
	email: string;
	password: string;
	confirm_password: string;
};

export type AddNoteForm = {
	title: string;
	content: string;
};
