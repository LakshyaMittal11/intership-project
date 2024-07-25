const db = require("../router/database-config");
const nodemailer = require("nodemailer");

const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      status: "error",
      error: "Please enter your email address",
    });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.json({
        status: "error",
        error: "Email not found",
      });
    }

    const otp = Math.floor(Math.random()*1000000);
    const expirationTime = new Date(Date.now() + 10 * 60000);

    db.query(
      "UPDATE users SET otp = ?, otp_expiration = ? WHERE email = ?",
      [otp, expirationTime, email],
      (err) => {
        if (err) throw err;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Your OTP Code",
          text: `Your OTP code is ${otp} \n this otp will expire in 10 minutes`,
        };

        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.json({
              status: "error",
              error: "Error sending email",
            });
          }
          res.json({
            status: "success",
            success: "OTP sent",
          });
        });
      }
    );
  });
};

module.exports = sendOtp;