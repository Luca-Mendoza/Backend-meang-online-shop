import { IJwt } from './../interfaces/jwt.interface';
import { SECRET_KET, MESSAGES, EXPIRETIME } from './../config/constants';
import jwt from 'jsonwebtoken';




class JWT {
    private secretKey = SECRET_KET as string;
    // Informacion del payload con fecha de caducidad 24 horas por defecto
    sign(data: IJwt, expiresIn: number = EXPIRETIME.H24) {
        return jwt.sign(
            { user: data.user },
            this.secretKey,
            { expiresIn } // 24hs de caducidad
        );
    }

    verify(token: string) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (e) {
            return MESSAGES.TOKE_VERICATION_FAILED;
        }
    }
}

export default JWT; 