const socket = io();

let userName = ""; 

const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

socket.on('message', ({ author, content, newUser }) => {
  if (newUser) {
    if (author === 'Chat Bot') {
      if (content.includes('You have joined the conversation.')) {
        addWelcomeMessage(content);
      } else {
        addWelcomeMessage(content);
      }
    }
  } else {
    addMessage(author, content);
  }
});

loginForm.addEventListener("submit", function(e){
  login(e);
});

addMessageForm.addEventListener("submit", function(e){
  sendMessage(e);
})

function login(e) {
  e.preventDefault();

  const enterUserLogin = userNameInput.value;
  if (!enterUserLogin) {
    alert("You must enter Login.");
    return;
  }
  userName = enterUserLogin;
  loginForm.classList.remove("show");
  messagesSection.classList.add("show");
  socket.emit('user-login', userName);
}


function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;
  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContentInput.value = '';
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

function addWelcomeMessage(content) {
  const infoMessage = document.createElement("li");
  infoMessage.classList.add("message");
  infoMessage.classList.add("message--system");

  infoMessage.innerHTML = `
    <div class="message__content message__info">
      ${content}
    </div>
  `;
  messagesList.appendChild(infoMessage);
}