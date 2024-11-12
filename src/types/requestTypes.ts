export type RequestParams = {
	url: string;
	method: string;
	baseURL: string;
	data: any;
	headers?: any;
};

export type ResponseResult = {
	hasError: boolean;
	data?: any;
	errorMessage?: string;
};
