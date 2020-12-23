import { IResolvers } from 'apollo-server-express';
import { transport } from '../../config/mailer';

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
        }
    },
};

export default resolversEmailMutation;