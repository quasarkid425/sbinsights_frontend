import fetch from "isomorphic-fetch";

// export const retrieveAccount = (coName, acc) => {
//   return fetch(`${process.env.NEXT_PUBLIC_API}/accounts`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: {
//       coName,
//       acc,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// export const retrieveAccounts = (company) => {
//   return fetch(`${process.env.NEXT_PUBLIC_API}/users/accounts/${company}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

// export const firstAccount = (slug, firstAcc) => {
//   return fetch(`${process.env.NEXT_PUBLIC_API}/users/firstAccount`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       slug,
//       firstAcc,
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

export const updateProfile = (userId, updatedUser) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/users/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      updatedUser,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateQuickNotes = (user) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/users/quickNotes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateInvoice = (user, details) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/users/updateInvoice`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      details,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const retrieveDashboardPieData = (user) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/users/dashboardData/${user}`, {
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
