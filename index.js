'use strict'

const nodemailer = require('nodemailer');

class Mail {
    constructor(mail_from, smtp_host, smtp_port, smtp_secure, username, password) {
        this.mail_from = mail_from;
        this.transporter = nodemailer.createTransport({
            host: smtp_host,
            port: smtp_port,
            secure: smtp_secure,
            auth: {
                user: username,
                pass: password
            }
        })
    }

    send(to, subject, text, html) {
        return new Promise((resolve, reject) => {
            let options = {
                from: this.mail_from,
                to: to,
                subject: subject,
                text: text,
                html: html
            }
            this.transporter.sendMail(options, (err, info) => {
                if(err)
                {
                    reject(err);
                    return;
                }
                resolve(info);
                return;
            })
        })
    }

    // init() {
    //     return new Promise((resolve, reject) => {
    //         nodemailer.createTransport()
    //     })
    // }
}

module.exports = Mail;