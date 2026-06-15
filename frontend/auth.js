async function Register(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try{

        const res = await fetch("https://chess-124102054.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            alert("Registration successful");
            window.location.href = "index.html";
        } else {
            alert(data.message || "Registration failed");
        }
    }catch (err) {
        console.error(err);
        alert("Server error");
    }
}

async function Login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try{

        const res = await fetch("https://chess-124102054.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            alert("Login successful");
            localStorage.setItem("token",data.token);
            window.location.href = "index.html";
        } else {
            alert(data.message || "Login failed");
        }
    }catch (err) {
        console.error(err);
        alert("Server error");
    }
}