import { createUser, signUser, exitUser, sendMessage } from './service';

const form = document.querySelector('#registration');
const registrBtn = document.querySelector('.btn-registr');
const authorBtn = document.querySelector('.btn-author');
const exitBtn = document.querySelector('.btn-exit');
const formBtn = form.querySelector('button');
const formTitle = form.querySelector('h2');
const chatSection = document.querySelector('.chat-section');
const chatForm = document.querySelector('.chat-form');
const chatWindow = document.querySelector('.chat-window');

const elements = [form, registrBtn, authorBtn];
const elementsExit = [exitBtn, chatSection];

let typeForm = 'registration';
let userId = null;

chatForm.addEventListener('submit', getMessage);
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
  e.target.reset();
}

function classToggleElements(classElem, method, elements) {
  elements.forEach(element => element.classList[method](classElem));
}

function getMessage(e) {
  e.preventDefault();
  const message = e.target.elements.message.value.trim();
  if (!message) {
    return;
  }
  const data = createData(message);
  sendMessage(data);
  e.target.reset();
}

function createData(message) {
  return {
    message,
    id: userId,
    time: getTime(),
  };
}
function getUserId(id) {
  userId = id;
}

function getTime() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
}

function drowMarkup(markup) {
  chatWindow.innerHTML = markup;
}

export { classToggleElements, elements, elementsExit, getUserId, drowMarkup };
