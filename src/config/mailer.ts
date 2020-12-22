import chalk from 'chalk';
import nodemailer from 'nodemailer';


export const transport = nodemailer.createTransport(
    {
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.USER_EMAIL, // generated ethereal user
            pass:process.env.USER_PASSWORD , // generated ethereal password
        },
    }
);


transport.verify().then(() => {
    console.log('=============================NODEMAILER CONFIG=============================');
    console.log(`STATUS: ${chalk.greenBright('ONLINE')}`);
    console.log(`MESSAGE: ${chalk.greenBright('MAILER CONNECT')}`);
}).catch( error => {
    console.log('=============================NODEMAILER CONFIG=============================');
    console.log(`STATUS: ${chalk.greenBright('OFFLINE')}`);
    console.log(`MESSAGE: ${chalk.greenBright(error)}`);
});