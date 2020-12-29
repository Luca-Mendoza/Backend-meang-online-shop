import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import { IContextData } from '../interfaces/context-data.interface';
import { findOneElement } from '../lib/db-operations';
import JWT from '../lib/jwt';
import MailService from './email.service';
import ResolversOperationsService from './resolvers-operations.service';



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

}

export default PasswordService;