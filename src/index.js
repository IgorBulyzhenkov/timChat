import { createUser, signUser } from './service';

const registration = document.querySelector('#registration');
const authorization = document.querySelector('#authorization');
// console.log(registration);

registration.addEventListener('submit', onSubmitRegistration)
authorization.addEventListener('submit',onSubmitAuthorization)

function onSubmitRegistration(e) {
    e.preventDefault();
    const { email, password } = e.currentTarget.elements;

    console.log(email.value, password.value);
    createUser(email.value, password.value);
}

function onSubmitAuthorization(e) {
    e.preventDefault();
    const { email, password } = e.currentTarget.elements;

    console.log(email.value, password.value);
    signUser(email.value, password.value);
}

// console.log(registration.value);