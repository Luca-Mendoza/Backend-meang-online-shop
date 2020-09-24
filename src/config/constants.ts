import environment from './environments';

if (process.env.NODE_ENV !== 'production') {
    const env = environment;
}

export const SECRET_KET = process.env.SECRET || 'LucaMendozaCursoGrophQLTiendaOnliine';

export enum COLLECTIONS {
    USERS='users'
};

export enum MESSAGES {
    TOKE_VERICATION_FAILED = 'Token no valido, inicia sesion de nuevo'
}