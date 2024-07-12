const firebaseConfig = {
  // ... your firebase config 
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const messagesRef = database.ref('messages');

const loginBtn = document.getElementById('login-btn');
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');

loginBtn.addEventListener('click', () => {
  // Use Firebase Authentication to sign in (e.g., email/password, Google, etc.)
  // ... authentication logic ...

  // After successful login:
  chatContainer.style.display = 'block';
  loginBtn.style.display = 'none';

  // Listen for new messages
  messagesRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('p');
    messageElement.textContent = message.user + ': ' + message.text;
    messagesDiv.appendChild(messageElement);
  });
});

sendBtn.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    messagesRef.push({
      user: auth.currentUser.displayName, 
      text: message
    });
    messageInput.value = '';
  }
});
