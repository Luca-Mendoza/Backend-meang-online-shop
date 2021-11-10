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


  
  async list(
    customer: string,
    limit: number,
    startingAfter: string,
    endingBefore: string
  ) {
    const pagination = this.getPagination(startingAfter, endingBefore);
    return await new StripeApi()
      .execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTION.LIST_SOURCE, customer, {
        object: "card",
        limit: 3,
        ...pagination,
      })
      .then((result: { has_more: boolean; data: Array<IStripeCard> }) => {
        return {
          status: true,
          message: `Lista de tarjeta mostrado correctamente`,
          card: result.data,
          hasmore: result.has_more,
        };
      })
      .catch((error: Error) => {
        this.getError(error);
      });
  }
}

export default StripeCardService;
