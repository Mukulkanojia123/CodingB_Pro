
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById('signupForm')
    const loginForm = document.getElementById('loginForm')
    const messageForm = document.getElementById('messageForm')
    const messagesBox = document.getElementById('messages')

    // Sign UP
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            const username = document.getElementById('username').value
            const password = document.getElementById('password').value
            console.log('frontend', username, password)
            try {
                const res = await fetch("/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
                console.log(res);
                if (res.status == 201) {
                    window.location.href = "login.html"
                    alert('Signup succesfull')
                } else {
                    const err = await res.json();
                    console.log('line 28', err.error)
                }
            } catch (err) {
                console.log('ERROR', err)
            }
        })

    }
    // login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            const username = document.getElementById('username').value
            const password = document.getElementById('password').value
            try {
                const res = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                })

                if (res.status == 200) {
                    const data = await res.json();
                    localStorage.setItem('token', data.token)
                    window.location.href = "chat.html"
                    alert('login succesfull')
                } else {
                    const err = await res.json();
                    console.log(err.error)
                }
            } catch (err) {
                console.log('ERROR', err)
            }
        })

    }
    /// chat 
    if (messageForm) {
        const socket = io({
            auth: {
                token: localStorage.getItem('token')
            }
        })

        socket.on('message', (message) => {
            const userMsge = document.createElement('div')
            userMsge.textContent = `${message.user} : ${message.text}`;
            messagesBox.appendChild(userMsge)
        })
        // sending message through socket
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msgText = document.getElementById('message').value
            socket.emit('message', msgText)
        })

    }
})