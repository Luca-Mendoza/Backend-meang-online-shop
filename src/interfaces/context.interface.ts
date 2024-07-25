export interface IContext {
  req: IRequest;
  connection: IConnection;
}

interface IRequest {
  headers: {
    authorization: string;
  };
}

interface IConnection {
  authorization: string;
}

interface ErrorResult {
  status: boolean;
  message: string;
  hasMore: boolean;
  customer?: any;
  card?: any;
  cards?: any;
}
