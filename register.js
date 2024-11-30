// Import the functions you need from Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Firebase configuration (make sure it's only here once)
const firebaseConfig = {
  apiKey: "AIzaSyBJFe0bbmk0G0zb5k7yBATjE-kNyxKdZxs",
  authDomain: "nutrevive-90e5a.firebaseapp.com",
  projectId: "nutrevive-90e5a",
  storageBucket: "nutrevive-90e5a.firebasestorage.app",
  messagingSenderId: "473673423821",
  appId: "1:473673423821:web:963d4b453b1544bb5f4284",
  measurementId: "G-8QHPEYBZ4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get references to form elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.querySelector('.btn-signin');
const errorMessageElement = document.getElementById('error-message');  // Display error messages
submit. addEventListener("click", function (event) {
  event.preventDefault(5)
})
// Get the Auth instance from Firebase
const auth = getAuth(app);

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Helper function for email validation
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Helper function for password validation
const validatePassword = (password) => {
  return password.length >= 6;  // Firebase requires at least 6 characters for password
};

// Add event listener for the submit button
submitButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent form submission

  // Get email and password from input fields
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Reset any previous error messages
  errorMessageElement.textContent = '';

  // Validation: Check if email and password are provided
  if (!email || !password) {
    errorMessageElement.textContent = 'Please fill in both email and password.';
    return;
  }

  // Email validation
  if (!validateEmail(email)) {
    errorMessageElement.textContent = 'Please enter a valid email address.';
    return;
  }

  // Password validation
  if (!validatePassword(password)) {
    errorMessageElement.textContent = 'Password must be at least 6 characters long.';
    return;
  }

  try {
    // Attempt to sign in with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // User signed in successfully
    console.log('User signed in:', userCredential.user);
    
    // Redirect to the dashboard or another page upon successful login
    window.location.href = "dashboard.html";  // Redirect to your dashboard or home page
    
  } catch (error) {
    // Handle Firebase sign-in errors
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessageElement.textContent = 'The email address is not valid.';
        break;
      case 'auth/user-disabled':
        errorMessageElement.textContent = 'This user has been disabled.';
        break;
      case 'auth/user-not-found':
        errorMessageElement.textContent = 'No user found with this email address.';
        break;
      case 'auth/wrong-password':
        errorMessageElement.textContent = 'Incorrect password.';
        break;
      default:
        errorMessageElement.textContent = 'Error: ' + error.message;
    }
  }
});