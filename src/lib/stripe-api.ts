// Referencia para los clientes
export const STRIPE_OBJECTS = {
  CHARGES: "charges",
  CUSTOMERS: "customers",
  TOKENS: "tokens",
};

// Referencia para la acción Crear / Editat / Actualizar / etc..
export const STRIPE_ACTIONS = {
  CREATE: "create", // Crear cliente y tarjeta
  CREATE_SOURCE: "createSource", // crear token para unificar cliente y tarjeta
  LIST: "list", // Obtener lista de usuario
  GET: "retrieve", //  Obtener detalles existentes
  GET_RETRIEVE_SOURCE: "retrieveSource", // Obtener detalles de la tarjeta y cliente
  UPDATE: "update", // Actualizar un cliente
  DELETE: "del", // Elimina un cliente
  UPDATE_SOURCE: "updateSource", // Actualizar una tarjeta
  DELETE_SOURCE: "deleteSource", // Elimina un tarjeta
  LIST_SOURCE: "listSources", // list all tarjeta
};

class StripeApi {
  // Configuración de la Autenticación de la API de Stripe
  private stripe = require("stripe")(process.env.STRIPE_API_KEY, {
    apiVersion: process.env.STRIPE_API_VERSION,
  });
  /**
   * execute: función para ejecutar
   * object : Customer/ Los cargos/ targert/ los productos/ etc..
   * action:  Crear / Editat / Actualizar / etc..
   *  args:  Argumento / etc..
   */
  async execute(
    object: string,
    action: string,
    ...args: [string | object, (string | object)?, (string | object)?]
  ) {
    return await this.stripe[object][action](...args);
  }
  // funcion  que retorna los errores y solo se puede utilisar desde sus hijos o propia clase
  protected async getError(error: Error) {
    return {
      status: false,
      message: "Error: ".concat(error.message),
      hasMore: false,
      customer: undefined,
      card: undefined,
      cards: undefined,
    };
  }

  protected getPagination(startingAfter: string, endingBefore: string) {
    let pagination;
    if (startingAfter !== "" && endingBefore === "") {
      pagination = { starting_after: startingAfter };
    } else if (startingAfter === "" && endingBefore !== "") {
      pagination = { ending_before: endingBefore };
    } else {
      pagination = {};
    }
    return pagination;
  }
}

export default StripeApi;
