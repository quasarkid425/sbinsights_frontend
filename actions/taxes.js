export const setUpTaxes = (user, allStates, selectedStates) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/taxes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      allStates,
      selectedStates,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
