export const addExpense = (user, entry) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/expenses`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      entry,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateQuickExps = (user, quickExpenses) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/expenses/quickExps`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      quickExpenses,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const removeExpense = (user, expenses, index) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/expenses/remove`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      expenses,
      index,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const retrieveExpenseData = (user) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/expenses/expData/${user}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
