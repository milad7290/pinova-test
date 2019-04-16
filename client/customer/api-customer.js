const customerList = value => {
  return fetch("/api/customers/" + value, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export { customerList };
