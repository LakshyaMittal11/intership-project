function sendOtp() {
    const email = document.getElementById("email").value;
    fetch("/api/sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        //   alert(data.status);
        if (data.status === "success") {
          document.getElementById("otp-form").style.display = "none";
          document.getElementById("reset-form").style.display = "block";
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  
  function resetPassword() {
    const email = document.getElementById("email").value;
    const otp = document.getElementById("otp").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    fetch("/api/resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "success") {
          alert(data.error);
        } else {
          alert(data.success);
          console.log(data);
          if (data.status === "success") {
            window.location.href = "/login";
          }
        }
      })
      .catch((error) => console.error("Error:", error));
  }