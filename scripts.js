document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Simple validation for demo purposes
    if (username === "user" && password === "pass") {
        window.location.href = "dashboard.html";  // Redirect to a dashboard or another page
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
});
