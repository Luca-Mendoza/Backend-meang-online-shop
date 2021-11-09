import { IStripeCard } from "../../interfaces/stripe/card.interface";
import StripeApi, { STRIPE_ACTION, STRIPE_OBJECTS } from "../../lib/stripe-api";

class StripeCardService extends StripeApi {
  async createToken(card: IStripeCard) {
    // 'this' hace referencia a la extencion 'StripeApi'
    return await this.execute(STRIPE_OBJECTS.TOKENS, STRIPE_ACTION.CREATE, {
      card: {
        number: card.number,
        exp_month: card.expMonth,
        exp_year: card.expYear,
        cvc: card.cvc,
      },
    })
      .then((result: { id: string }) => {
        return {
          status: true,
          message: `Token ${result.id} creado correctamente`,
          token: result.id,
        };
      })
      .catch((error: Error) => {
        this.getError(error);
      });
  }
  async create(customer: string, tokenCard: string) {
    // const card = await stripe.customers.createSource(
    // 	'cus_JqUZcxRGJbvxP3',
    // 	{ source: 'tok_mastercard' },
    // );
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTION.CREATE_SOURCE,
      customer,
      { source: tokenCard }
    )
      .then((result: IStripeCard) => {
        return {
          status: true,
          message: `Tarjeta con ${result.id} creado correctamente`,
          id: result.id,
          card: result,
        };
      })
      .catch((error: Error) => {
        this.getError(error);
      });
  }
  // card = await stripe.customers.retrieveSource(
  // 	'cus_JqUZcxRGJbvxP3',
  // 	'card_1JCnacLcAMPJSB0N6rlb3UkD',
  // );
  async get(customer: string, card: string) {
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTION.GET_RETRIEVE_SOURCE,
      customer,
      card
    )
      .then((result: IStripeCard) => {
        return {
          status: true,
          message: `Detalle de la tarjeta ${result.id} mostrado correctamente`,
          id: result.id,
          card: result,
        };
      })
      .catch((error: Error) => {
        this.getError(error);
      });
  }

  async update(customer: string, card: string, details: object) {
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTION.UPDATE_SOURCE,
      customer,
      card,
      details
    )
      .then((result: IStripeCard) => {
        return {
          status: true,
          message: `Detalle de la tarjeta ${result.id} actualizado correctamente`,
          id: result.id,
          card: result,
        };
      })
      .catch((error: Error) => {
        this.getError(error);
      });

    // customers.updateSource(
    // 'cus_4QE0wwLkjwjOjH',
    // 'card_1JtuuS2eZvKYlo2CNqAJ9tt7',
    // {name: 'Jenny Rosen'}
    //  )
  }

  async delete(customer: string, card: string) {
    return await this.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTION.DELETE_SOURCE,
      customer,
      card
    )
      .then((result: { id: string; deleted: boolean }) => {
        return {
          status: true,
          message: result.deleted
            ? `El item ${result.id} eliminado correctamente`
            : `El item ${result.id} no eliminado correctamente`,
          id: result.id,
        };
      })
      .catch((error: Error) => {
        this.getError(error);
      });
  }
}

export default StripeCardService;
