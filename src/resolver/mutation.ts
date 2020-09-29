import { COLLECTIONS } from '../config/constants';
import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';

const resolversMutation: IResolvers = {
    Mutation: {
        async register(_, { user }, { db }) {
            // Comprobar el Último usuarios registrado para asignar ID
            const lastUser = await db.collection(COLLECTIONS.USERS).
                find().
                limit(1).
                sort({ registerDate: -1 }).toArray();

            if (lastUser.length === 0) {
                user.id = 1;
            } else {
                user.id = lastUser[0].id + 1;
            }
            // Asignar la fecha en formato ISO en la propiedad registerDate
            user.registerDate = new Date().toISOString();
            // Encriptar password
            user.password = bcrypt.hashSync(user.password, 10);
            // Guardad el documento (registro) en la colección
            return await db.
                collection(COLLECTIONS.USERS).
                insertOne(user).then(
                    async () => {
                        return user;
                    }
                ).catch((err: Error) => {
                    console.log(err.message);
                    return null;
                });
        }
    }
};

export default resolversMutation;