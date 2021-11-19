export interface IStripeCharge {
	id: string;
	amount: number;
	status: string;
	paid: boolean;
	receiptEmail: string;
	receiptUrl: string;

	created: string;
	typeOrder: string;
	description: string;
	card: string;
	customer: string;
}
