export interface IStripeCard {
	id?: string;
	brand: string;
	country: string;
	customer: string;
	number: string;
	expMonth: number;
	expYear: number;
	cvc: string;
}

