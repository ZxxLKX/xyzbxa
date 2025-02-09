// ✅ Register User
async function register() {
    let username = document.getElementById("reg-username").value;
    let password = document.getElementById("reg-password").value;

    let res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    let data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "login.html";
}

// ✅ Login User
async function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    let data = await res.json();
    alert(data.message);
    if (res.ok) {
        localStorage.setItem("token", data.token);
        let chatOutput = document.getElementById("chat-output");
    chatOutput.innerHTML += `<p><b>Kamu:</b> ${message}</p>`;
    chatOutput.innerHTML += `<p><b>NatoGPT:</b> ${data.message}</p>`;
    document.getElementById("chat-input").value = "";
}

// ✅ Upgrade User ke Premium (Admin)
async function upgradeUser() {
    let username = document.getElementById("admin-username").value;
    let token = localStorage.getItem("token");

    let res = await fetch("/admin/upgrade", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ username })
    });

    let data = await res.json();
    alert(data.message);
}

// ✅ Ambil List User (Admin)
async function getUsers() {
    let token = localStorage.getItem("token");

    let res = await fetch("/admin/users", {
        method: "GET",
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });

    let users = await res.json();
    let userList = document.getElementById("user-list");
    userList.innerHTML = users.map(u => `<p>${u.username} - ${u.role}</p>`).join("");
}

// ✅ Logout User
function logout() {
    localStorage.removeItem("token");
    alert("Berhasil Logout!");
    window.location.href = "login.html";
}

// ✅ Cek Jika User Tidak Login, Redirect ke Login
function checkAuth() {
    let token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";
}