import { findOneElement, updateOneElement } from './../../lib/db-operations';
import { MESSAGES, COLLECTIONS } from './../../config/constants';
import { IResolvers } from 'apollo-server-express';
import { EXPIRETIME } from '../../config/constants';
import { transport } from '../../config/mailer';
import JWT from '../../lib/jwt';
import UsersService from '../../services/users.service';
import bcrypt from 'bcrypt';
import MailService from '../../services/email.service';
import PasswordService from '../../services/password.service';

const resolversEmailMutation: IResolvers = {

    Mutation: {
        // Enviar un Email - pasamos información del receptor - asunto - información del contenido del correo (env-instruciones)
        async sendEmail(_, { mail }) {
            // Añadimos la llamada al servicio para enviar un mail
            return new MailService().send(mail);
        },
        // Intruciones - Activar el Usuario (env- instrciones para activar el usuario)
        async activeUserEmail(_, { id, email }) {
            // Información para que el usuario pueda activar la cuenta - tiempo 1hs
            return new UsersService(_, { user: { id, email } }, {}).active();
        },
        // activeUserAction() ACTIVA EL USUARIO SELECCIONADO
        async activeUserAction(_, { id, birthday, password }, { token, db }) {
            // Verificar el token
            const verify = verifyToken(token, id);
            if (verify?.status === false) {
                return {
                    status: false,
                    message: verify.message
                };
            }
            // Si el token es valido, asignamos la información
            return new UsersService(_, { id, user: { birthday, password } }, { token, db }).unblock(true);
        },
        // resetPassword() RESETEA PASSWORD DEL USUARIO SELECCIONADO
        async resetPassword(_, { email }, { db }) {
            return new PasswordService(_, { user: { email } }, {db}).SendEmail();
        },
        // changePassword() CAMBIAR PASSWORD DEL USUARIO SELECCIONADO
        async changePassword(_, { id, password }, { token, db }) {
            // Verificar token
            const verify = verifyToken(token, id);
            if (verify?.status === false) {
                return {
                    status: false,
                    message: verify.message
                };
            }
            // Comprobar el id es correcto: no inddefinido y no en blanco
            if (id === undefined || id === '') {
                return {
                    status: false,
                    message: 'El ID necesita una información correcta'
                };
            }
            // Comprobar el password es correcto: no inddefinido y no en blanco
            if (password === undefined || password === '') {
                return {
                    status: false,
                    message: 'El password necesita una información correcta'
                };
            }
            // Encriptar el password
            password = bcrypt.hashSync(password, 10);
            // Actualizar el id seleccionado de la colección usuarios
            return await updateOneElement(
                db,
                COLLECTIONS.USERS,
                { id },
                { password }
            ).then(
                res => {
                    if (res.result.nModified === 1 && res.result.ok) {
                        return {
                            status: true,
                            message: `Contraseña cambiada correctamente.`
                        };
                    }
                    return {
                        status: false,
                        message: `Contraseña no actualizada por no encontrar el usuario o por no sufir cambios`
                    };
                }
            ).catch(
                error => {
                    return {
                        status: false,
                        message: `Contraseña no actualizada: ${error}`
                    };
                }
            );

            return {
                status: true,
                message: `${password} correcto.`
            };
        }
    },
};

function verifyToken(token: string, id: string) {
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
    if (user.id !== id) {
        return {
            status: false,
            message: 'El usuario del token no corresponde al añadido en el argumento'
        };
    }

}
export default resolversEmailMutation;