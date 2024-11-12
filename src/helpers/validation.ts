export const validateField = (fieldValue: string, required: boolean = true, checkEmail: boolean = false, compareTo: string | null = null, minLength: number | null = null, maxLength: number | null = null) => {
	let result = "";

	if (required && !fieldValue) {
		result = "Поле обязательно для заполнения";
	} else if (compareTo && fieldValue !== compareTo) {
		result = "Пароли не совпадают";
	} else if (checkEmail && !emailRegex.test(fieldValue)) {
		result = "Некорректный e-mail";
	} else if (minLength && fieldValue.length < minLength) {
		result = "Поле должно содержать не менее 4 символов";
	}

	return result;
};

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
