export interface Icontext {
    req: Irequest;
    connection: IConnection;
}

interface Irequest {
    headers: {
        authorization : string;
    };
}

interface IConnection {
    authorization: string;
}