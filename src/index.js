import { createUser, signUser, exitUser } from './service';

const form = document.querySelector('#registration');
const registrBtn = document.querySelector('.btn-registr');
const authorBtn = document.querySelector('.btn-author');
const exitBtn = document.querySelector('.btn-exit');
const formBtn = form.querySelector('button');
const formTitle = form.querySelector('h2');

const elements = [form, registrBtn, authorBtn];
const elementsExit = [exitBtn];

let typeForm = 'registration';

form.addEventListener('submit', onSubmitForm);
exitBtn.addEventListener('click', exitUser);
authorBtn.addEventListener('click', () => {
  typeForm = 'authorization';
  updateForm();
});
registrBtn.addEventListener('click', () => {
  typeForm = 'registration';
  updateForm();
});

updateForm();

function updateForm() {
  const title = typeForm === 'authorization' ? 'Авторизація' : 'Реєстрація';
  const text =
    typeForm === 'authorization' ? 'Авторизуватися' : 'Зареєструватися';
  formBtn.textContent = text;
  formTitle.textContent = title;
}

function onSubmitForm(e) {
  e.preventDefault();

  const { email, password } = e.currentTarget.elements;

  console.log(email.value, password.value);
  if (typeForm === 'authorization') {
    signUser(email.value, password.value);
  } else {
    createUser(email.value, password.value);
  }
}

function classToggleElements(classElem, method, elements) {
  elements.forEach(element => element.classList[method](classElem));
}

export { classToggleElements, elements, elementsExit };
