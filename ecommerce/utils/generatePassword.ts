import { faker } from "@faker-js/faker";

export function generatePassword() {
    const length = 6;
    let password = '';
    while (!/[a-zA-Z]/.test(password) || !/\d/.test(password) || password.length < length) {
        password = faker.internet.password(length, false, /[a-zA-Z0-9]/);
    }
    return password;
}