import express from 'express'
import { transporter } from './../utils/mailerTransport'
import { adminMail, passwordReset, userMail } from './../utils/libroMailer'

const mailerController = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, username, name, type, registerURL } = req.body

  const nodejsMailerEnvs = {
    host: process.env.TITAN_MAILER_HOST,
    user: process.env.NODEJS_MAILER_USERNAME,
    pass: process.env.NODEJS_MAILER_PASSWORD,
  }

  const passwordResetData = passwordReset(email, registerURL)

  const adminMailData = adminMail(name, email, username)

  const userMailData = userMail(name, email, username, registerURL)

  if (type === 'reg-link-nodemailer') {
    await transporter(nodejsMailerEnvs).sendMail(userMailData)
    await transporter(nodejsMailerEnvs).sendMail(adminMailData)
  } else if (type === 'reset-password-nodemailer') {
    await transporter(nodejsMailerEnvs).sendMail(passwordResetData)
  }

  res.json('OKOKOKOK')
}

export { mailerController }
