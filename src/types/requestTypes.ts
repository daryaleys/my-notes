import { AddNoteForm, LoginForm, RegisterForm } from "./formTypes";

export type RequestParams = {
	url: string;
	method: string;
	baseURL: string;
	data: LoginForm | RegisterForm | AddNoteForm;
	headers?: any;
};

export type ResponseResult = {
	hasError: boolean;
	status: number;
	data?: any;
	errorMessage?: string;
};
