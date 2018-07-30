import fs from 'fs'
import handlebars from 'handlebars'
import ENV from "../../env"
import path from 'path'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(ENV.MAIL_CONFIG.options)

export const doMail = (context, templateFile) => sendMail(context.to, context.subject, genMail(context, templateFile))

export const genMail = (context, templateFile) => {
    const source = fs.readFileSync(path.join(ENV.MAIL_TEMPLATE_PATH, templateFile), 'utf8')
    const template = handlebars.compile(source)
    return template(context)
}

export const sendMail = async (to, subject, html) => await new Promise(function (resolve, reject) {
    transporter.sendMail({
        to, subject, text: html, html, from: ENV.MAIL_CONFIG.from
    }, function (error, info) {
        if (error) {
            console.log(error)
            reject(error)
        } else {
            console.log('Email sent: ' + info.response)
            resolve(null)
        }
    })
})
