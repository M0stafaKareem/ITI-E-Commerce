const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
const submitbtn = document.querySelector(".submit-btn");
const entereduser = document.querySelector(".in-name");
const enteredpass = document.querySelector(".in-pass");
const enteredmail = document.querySelector(".up-mail");
const entereduppass = document.querySelector(".up-pass");
const signupbtn = document.querySelector(".signup-btn");



// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
    });
});

submitbtn.addEventListener("click", (event) =>{
    event.preventDefault();
     // Check credentials in local storage
     if (checkLocalStorage(entereduser.value, enteredpass.value)) {
        alert('Login successful using local storage!');
    } else {
        // If not found in local storage, check via API
        checkAPI(entereduser.value, enteredpass.value)
            .then(success => {
                if (success) {
                    alert('Login successful using API!');
                } else {
                    alert('Invalid username or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while verifying credentials.');
            });
    }

function checkLocalStorage(username, password) {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    return storedUsername === username && storedPassword === password;
}

async function checkAPI(username, password) {
    try {
        const response = await fetch('https://dummyjson.com/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            
            })
        });

        if (response.ok) {
            const result = await response.json();
            return result.token != null; // Assume API returns a token on successful login
        } else {
            return false;
        }
    } catch (error) {
        console.error('API error:', error);
        return false;
    }
}

});

signupbtn.addEventListener('click', function() {
   const username = enteredmail.value;
    const password = entereduppass.value;

    // Save email and password to local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    console.log(localStorage);

    alert('Signup successful! Credentials saved to local storage.');
});
