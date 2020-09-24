import { IJwt } from './../interfaces/jwt.interface';
import { SECRET_KET, MESSAGES } from './../config/constants';
import jwt from 'jsonwebtoken';



class JWT {
    private secretKey = SECRET_KET as string;

    sign(data: IJwt) {
        return jwt.sign(
            { user: data.user },
            this.secretKey,
            {expiresIn: 24 * 60 * 60 } // 24hs de caducidad
        );
    }

    verify(token: string){
        try{
            return jwt.verify(token, this.secretKey) as string;
        } catch(e) {
            return MESSAGES.TOKE_VERICATION_FAILED;
        }
    }
}

export default JWT; 