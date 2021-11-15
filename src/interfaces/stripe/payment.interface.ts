export interface IPayment {
	amount: string | number;
	description: string;
	currency: string;
	token?: string;
	customer: string;
}
