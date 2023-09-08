const nodemailer = require('nodemailer'),
    config = require('../config/config'),
    promisify = require('util').promisify

const FRONTEND_URL = process.env.FRONTEND_URL || config.FRONTEND_URL

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_PATH || config.EMAIL_PATH,
        pass: process.env.EMAIL_KEY || config.EMAIL_KEY
    }
});

exports.sendVerificationEmail = (user) => {
    let link = FRONTEND_URL + "#/api/verify/" + user.hash;
    let mailOptions = {
        to: user.email,
        subject: "Please confirm your Email account",
        html: `Hello ${user.userId},<br><br> To continue setting up your account, please ‘click’ on the link below to verify your email.<br><br><a href="${link}">Click here to verify</a><br><br><br><Thank you for your interest and for participating in our project,<br>-The DW Discover Team`
    }
    console.log(`${new Date()} Sending Verification Email to: ${user.email}`)
    return smtpTransport.sendMail(mailOptions)
}