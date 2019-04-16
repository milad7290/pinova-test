const create = product => {
  return fetch("/api/products", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const productList = () => {
  return fetch("/api/products", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export { create, productList };
