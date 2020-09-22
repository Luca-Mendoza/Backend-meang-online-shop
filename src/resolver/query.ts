import { IResolvers } from 'graphql-tools';

/**
 *  "Identificador único"
    id: ID!,
    "Nombre/s de pila"
    name: String!,
    "Apellido/s de pila"
    lastname: String!,
    "Correo electrónico único"
    email: String!,
    "Contraseña del usuario asociado a la cuenta"
    password: String!,
    "Fecha de registro en la base de datos"
    registerDate: String!,
    "Fecha de nacimiento - Solo mayores de 18 años"
    brithday: String!
 */
const resolversQuery: IResolvers = {
    Query: {
        users(root, args, context, info) {
            console.log(root);
            console.log(args);
            console.log(context);
            console.log(info);

            return [
                {
                    id: 1,
                    name: '',
                    lastname: '',
                    email: '',
                    password: '',
                    registerDate: '',
                    brithday: ''
                }
            ]
        }
    }

};

export default resolversQuery;