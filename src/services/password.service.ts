import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import { IContextData } from '../interfaces/context-data.interface';
import { findOneElement, updateOneElement } from '../lib/db-operations';
import JWT from '../lib/jwt';
import MailService from './email.service';
import ResolversOperationsService from './resolvers-operations.service';
import bcrypt from 'bcrypt';



class PasswordService extends ResolversOperationsService {
    collection = COLLECTIONS.TAGS;
    constructor(root: object, variables: object, context: IContextData) {
        super(root, variables, context);
    }

    async SendEmail() {
        const email = this.getVariables().user?.email || '';
        // comprobar el Email sea correcto y no ste vacío
        if (email === undefined || email === '') {
            return {
                status: false,
                message: 'El email no se ha definido correctamente.'
            };
        }
        //Coger información del usuario
        const user = await findOneElement(this.getDb(), COLLECTIONS.USERS, { email });
        console.log(user);
        //Si usuario es indefinido mandamos un mensaje que no existe el usuario
        if (user === undefined || user === null) {
            return {
                status: false,
                message: `Usuario con el email ${email} no existe.`
            };
        }
        const newUser = {
            id: user.id,
            email
        };
        const token = new JWT().sign({ user: newUser }, EXPIRETIME.M15);

        // Informacion del HTML con el link para activar la cuenta
        const html = `Para cambiar de contraseña haz click sobre esto: <a href="${process.env.CLIENT_URL}/#/reset/${token}">Click aquí</a>`;
        const mail = {
            to: email,
            subject: 'Petición para cambiar de contraseña',
            html
        };
        return new MailService().send(mail);
    }

    async chenge() {
        const id = this.getVariables().user?.id;
        let password = this.getVariables().user?.password;
        // Comprobar el id es correcto: no inddefinido y no en blanco
        if (id === undefined || id === '') {
            return {
                status: false,
                message: 'El ID necesita una información correcta'
            };
        }
        // Comprobar el password es correcto: no inddefinido y no en blanco
        if (password === undefined || password === '' || password === '1234') {
            return {
                status: false,
                message: 'El password necesita una información correcta'
            };
        }
        // Encriptar el password
        password = bcrypt.hashSync(password, 10);
        // Actualizar el id seleccionado de la colección usuarios
        const result = await this.update(
            COLLECTIONS.USERS,
            { id },
            { password },
            'users'
        );

        return {
            status: result.status,
            message: (result.status) ? 'Contraseña cambiada correctamente' : result.message
        };
    }
}

export default PasswordService;