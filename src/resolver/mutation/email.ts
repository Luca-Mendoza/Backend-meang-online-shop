import { findOneElement } from './../../lib/db-operations';
import { MESSAGES, COLLECTIONS } from './../../config/constants';
import { IResolvers } from 'apollo-server-express';
import { EXPIRETIME } from '../../config/constants';
import { transport } from '../../config/mailer';
import JWT from '../../lib/jwt';
import UsersService from '../../services/users.service';

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
            // Información para que el usuario pueda activar la cuenta - tiempo 1hs
            const toke = new JWT().sign({ user: { id, email } }, EXPIRETIME.H1);
            // Informacion del HTML con el link para activar la cuenta
            const html = `Para activar la cuenta haz click sobre esto: <a href="${process.env.CLIENT_URL}/#/active/${toke}">Click aquí</a>`;
            return new Promise((resolve, reject) => {

                transport.sendMail({
                    from: '"🌹🍀🌹🌼🍀🌸<🥀Los.Jazmines🌷🍀🌼🌸> 🌹🍀" <floreria01.los.jazmines@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Activar usuario', // Subject line---
                    //text: `Hola`, // plain text body
                    html
                }, (error, _) => {
                    (error) ? reject({
                        status: false,
                        messge: error
                    }) : resolve({
                        status: true,
                        message: 'Email correctamente enviado a' + email,
                        email
                    });
                });
            });
        },
        async activeUserAction(_, { id, birthday, password }, { token, db }) {
            // Verificar el token
            const checkToken = new JWT().verify(token);
            if (checkToken === MESSAGES.TOKE_VERICATION_FAILED) {
                return {
                    status: false,
                    message: 'El periodo para activar el usuario ha finalizado. Contacta con el Administrador para mas información.',
                };
            }
            // Si el token es valido, asignamos la información
            const user = Object.values(checkToken)[0];
            console.log(user, { id, birthday, password });
            /**  return {
                 status: true,
                 message: 'Preparado para activar el Usuario'
             }; */
            return new UsersService(_, { id, user: { birthday, password } }, { token, db }).unblock(true);
        },
        async resetPassword(_, { email }, { db }) {
            //Coger información del usuario
            const user = await findOneElement(db, COLLECTIONS.USERS, { email });
            console.log(user);
            //Si usuario es indefinido mandamos un mensaje que no existe el usuario
            if (user === undefined) {
                return {
                    status: false,
                    message: `Usuario con el email ${email} no existe.`
                };
            }
            return {
                status: true,
                message: `Usuario con el email ${email} EXISTE.`
            };

        }
    },
};

export default resolversEmailMutation;