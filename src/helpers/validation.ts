export const validateEmail = (email: string): string => {
	let result = "";

	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

	if (!email) {
		result = "Email не может быть пустым";
	} else if (!emailRegex.test(email)) {
		result = "Невалидный адрес электронной почты";
	}

	return result;
};

export const validatePassword = (password: string): string => {
	let result = "";

	if (!password) {
		result = "Пароль не может быть пустым";
	} else if (password.length < 4 || password.length > 12) {
		result = "Пароль должен содержать от 4 до 12 символов";
	}

	return result;
};

export const validatePasswordConfirmation = (password: string, confirmPassword: string): string => {
	let result = "";

	if (password !== confirmPassword) {
		result = "Пароли не совпадают";
	}

	return result;
};
