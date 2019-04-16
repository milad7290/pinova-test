const create = invoice => {
  return fetch("/api/invoices", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(invoice)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const invoiceListWithFilter = params => {
  return fetch(
    "/api/invoices/by/" +
      params.from +
      "/" +
      params.to +
      "/" +
      params.page +
      "/" +
      params.offset,
    {
      method: "GET"
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const invoiceList = () => {
  return fetch("/api/invoices", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const getNextInvoiceNumber = () => {
  return fetch("/api/invoices/getNextInvoiceNumber", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const iranStates = () => {
  return fetch("/api/invoices/iranStates", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export {
  create,
  invoiceList,
  invoiceListWithFilter,
  getNextInvoiceNumber,
  iranStates
};
