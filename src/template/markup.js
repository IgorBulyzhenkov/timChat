function createMarkup(array, userId) {
  return array
    .map(
      data => {
        if(data.type==='message')
        { return createMessage(data, userId) }
        else if(data.type==='img'){
          return createBoxImg(data, userId)
        }
      })
    .join('');
}
function createMessage({message, time, id},userId) {
  return `<div class="${
        userId === id ? 'message right' : 'message'
      }" data-id = "${id}">
                    <p class="message-text">${message}</p> <span class="message-time"> ${time}</span>
                </div>`
   
    
}
function createBoxImg({imgUrl, time, id}, userId) {
  return  `<div class="${
        userId === id ? 'message right' : 'message'
      }" data-id = "${id}">
                <img src="${imgUrl}" alt="image-test" class="mb-2 message-img"><span class="message-time"> ${time}</span>
                </div>`
  
}


export { createMarkup };
