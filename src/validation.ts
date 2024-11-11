const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validateField = (fieldValue: string, required: boolean = true, checkEmail: boolean = false, compareTo: string | null = null) => {
    let result = "";

    if (required && !fieldValue) {
        result = "Поле обязательно для заполнения";
    } else if (compareTo && fieldValue !== compareTo) {
        result = "Пароли не совпадают";
    } else if (checkEmail && !(emailRegex).test(fieldValue)) {
        console.log(fieldValue);
        result = "Некорректный e-mail";
    }

    return result;
};
