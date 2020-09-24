import { IJwt } from './../interfaces/jwt.interface';
import { SECRET_KET } from './../config/constants';
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
}

export default JWT; 