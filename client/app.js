let userName = ""; 

const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

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
}

function sendMessage(e) {
  e.preventDefault();

  const messageContent = messageContentInput.value;
  if (!messageContent) {
    alert("Please enter message.");
    return;
  }
  addMessage(userName, messageContent);
  messageContentInput.value = "";
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