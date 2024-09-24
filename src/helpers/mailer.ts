/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '@/models/user.model'
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'
export const sendMail = async ({ email, emailType, userId }: any) => {

    try {
        const userIdString = userId.toString();

        const hashedToken = await bcryptjs.hash(userIdString, 10)
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 36000000
            })
        } else if (emailType === 'RESETPASSWORD') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 36000000
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAPUSER,
                pass: process.env.MAILTRAPPASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MYEMAIL,
            to: email,
            subject: emailType === 'VERIFY' ? 'verify your email' : 'reset your password',
            html: `<p><a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}">Click here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return {
            mailResponse,
            success:true
        }


    } catch (error: any) {
        console.log(error)

    }
}