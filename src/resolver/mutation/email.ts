import { IResolvers } from 'apollo-server-express';
import { EXPIRETIME } from '../../config/constants';
import { transport } from '../../config/mailer';
import JWT from '../../lib/jwt';

const resolversEmailMutation: IResolvers = {
    Mutation: {
        async sendEmail(_, { mail }) {
            // Añadimos la llamada al servicio
            console.log(mail);
            return new Promise((resolve, reject) => {

                transport.sendMail({
                    from: '"🌹🍀🌹🌼🍀🌸<🥀Los.Jazmines🌷🍀🌼🌸> 🌹🍀" <floreria01.los.jazmines@gmail.com>', // sender address
                    to: mail.to, // list of receivers
                    subject: mail.subject, // Subject line---
                    //text: `Hola`, // plain text body
                    html: mail.html, // html body
                }, (error, _) => {
                    (error) ? reject({
                        status: false,
                        messge: error
                    }) : resolve({
                        status: true,
                        message: 'Email correctamente enviado a' + mail.to,
                        mail
                    });
                });
            });
        },
        async activeUserEmail(_, { id, email }) {
            // Añadimos la llamada al servicio
            console.log(email);
            // Información para que el usuario pueda activar la cuenta - tiempo 1hs
            const toke = new JWT().sign({id, email}, EXPIRETIME.H1);
            return new Promise((resolve, reject) => {

                transport.sendMail({
                    from: '"🌹🍀🌹🌼🍀🌸<🥀Los.Jazmines🌷🍀🌼🌸> 🌹🍀" <floreria01.los.jazmines@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Activar usuario', // Subject line---
                    //text: `Hola`, // plain text body
                    html: email.html, // html body
                }, (error, _) => {
                    (error) ? reject({
                        status: false,
                        messge: error
                    }) : resolve({
                        status: true,
                        message: 'Email correctamente enviado a' + email.to,
                        email
                    });
                });
            });
        }
    },
};

export default resolversEmailMutation;