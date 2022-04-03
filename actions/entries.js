export const submitServiceEntry = (user, account, entry) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/entries`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      account,
      entry,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const saveEntries = (user, account, entries) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/entries/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      account,
      entries,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
