import { userInfoStore } from "../store";
import { RequestParams, ResponseResult } from "../types/requestTypes";
import { getInfo, removeInfo } from "./tokenMethods";

const baseURL = "https://dist.nd.ru";

export const sendRequest = async (endpoint: string, method: string, useAuth: boolean, body?: any): Promise<ResponseResult> => {
	const request: RequestParams = {
		url: endpoint,
		method: method,
		baseURL: baseURL,
		data: body,
	};

	if (useAuth) {
		const token = getInfo();
		request.headers = { Authorization: "Bearer " + token };
	}

	const result: ResponseResult = {
		hasError: false,
		status: 200,
	};

	await axios(request)
		.then((response) => {
			result.data = response.data;
		})
		.catch((error) => {
			if (error.status === 401) {
				userInfoStore().userInfo = null;
				removeInfo();
			} else {
				const message = error.response.data.message;
				result.hasError = true;
				result.status = error.status;
				result.errorMessage = typeof message === "string" ? message : message[0];
			}
		});

	return result;
};
