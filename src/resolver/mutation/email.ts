import { IResolvers } from 'apollo-server-express';
import { transport } from '../../config/mailer';

const resolversEmailMutation: IResolvers = {
    Mutation: {
        async sendEmail() {
            // Añadimos la llamada al servicio

            return new Promise((resolve, reject) => {
                
                transport.sendMail({
                    from: '"🌹🍀🌹🌼🍀🌸<🥀Los.Jazmines🌷🍀🌼🌸> 🌹🍀" <floreria01.los.jazmines@gmail.com>', // sender address
                    to: 'mendozaluca34@gmail.com', // list of receivers
                    subject: 'Hello ✔', // Subject line
                    //text: `Hola`, // plain text body
                    html: '<b>Hello world?</b>', // html body
                }, (error, _) => {
                    (error) ? reject(error) :  resolve('Email correctamente enviado');
                });
            });
        }
    },
};

export default resolversEmailMutation;