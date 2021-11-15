import { IStripeCard } from './card.interface';

export interface IStripeCustomer {
	id?: string;
	name?: string;
	email?: string;
	description?: string;
	default_source?: string;
	currency?: string;
	phone?: string;
}
