async function login() {
  const user = Document.querySelector('#username');
  const pass = Document.querySelector('#password');
  const userText = user.innerText;
  const passText = pass.innerText;
  const request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: userText, password: passText})
  }
  const response = await fetch('/login');
  if (response.redirected) {
    window.location.assign(response.url)
  }
}