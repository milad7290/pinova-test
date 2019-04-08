
const customerList = () => {
  return fetch('/api/customers/', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}


export {
  customerList,
}
