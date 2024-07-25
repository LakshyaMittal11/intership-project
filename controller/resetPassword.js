const express = require("express");
const router = express.Router();
const db = require("../router/database-config");
const bcrypt = require("bcryptjs");
const { error } = require("console");

router.post('/resetpassword', (req, res) => {
    const { email, otp, newPassword } = req.body;

    db.query('SELECT * FROM users WHERE email = ? AND otp = ? AND otp_expiration > NOW()', [email, otp], (err, results) => {
        if (err) return res.json({status:'500',error:'Database error'});
        if (results.length === 0) return res.json({status:'400',error:'Invalid or expired OTP'});

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        db.query('UPDATE users SET password = ?, otp = NULL, otp_expiration = NULL WHERE email = ?', [hashedPassword, email], (err) => {
            if (err) return res.json({status:'500',error:'Database error'});
            res.json({status:'success',success:'Password reset successful'});
        });
    });
});

module.exports = router;