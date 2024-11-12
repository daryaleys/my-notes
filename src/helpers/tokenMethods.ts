const TOKEN_KEY = "accessToken";

export const setInfo = (token: string): void => {
	localStorage.setItem(TOKEN_KEY, token);
};

export const getInfo = (): string | null => {
	return localStorage.getItem(TOKEN_KEY);
};

export const removeInfo = (): void => {
	localStorage.removeItem(TOKEN_KEY);
};