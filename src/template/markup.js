function createMarkup(array, userId) {
  return array
    .map(
      ({ message, time, id }) => `<div class="${
        userId === id ? 'message right' : 'message'
      }" data-id = "${id}">
                    <p class="message-text">${message}</p> <span class="message-time"> ${time}</span>
                </div>`
    )
    .join('');
}

export { createMarkup };
