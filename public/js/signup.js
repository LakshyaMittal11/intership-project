form.addEventListener("submit", () => {
    const signup = {
      name:name.value,
      email: email.value,
      password: password.value,
    };
  
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(signup),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "error") {
          success.style.display = "none";
          error.style.display = "block";
          error.innerText = data.error;
        } else {
          
          setTimeout(() => {
            window.location.href = "/home";
          },1);
        }
      });
  });