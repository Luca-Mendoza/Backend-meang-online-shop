import { transport } from '../config/mailer';
import { IMailOpiotns } from '../interfaces/email.interface';

class MailService {
	send(mail: IMailOpiotns) {
		return new Promise((resolve, reject) => {
			transport.sendMail(
				{
					from:
						'"🎮 Gamezonia Online Shop 🎮" <gamezoniashop@gmail.com>', // sender address
					to: mail.to, // list of receivers
					subject: mail.subject, // Subject line---
					//text: `Hola`, // plain text body
					html: mail.html, // html body
				},
				(error, _) => {
					error
						? reject({
								status: false,
								messge: error,
						  })
						: resolve({
								status: true,
								message: 'Email correctamente enviado a ' + mail.to,
								mail,
						  });
				},
			);
		});
	}
}

export default MailService;
