export const addAccount = (user, newAcc) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      newAcc,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateAccountInfo = (slug, accNo, updatedAcc) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug,
      accNo,
      updatedAcc,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeAccount = (slug, accNo) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug,
      accNo,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const cityCount = (slug) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/count/${slug}`, {
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

export const pay = (user, account, service, services, serviceIndex) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/pay`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      account,
      service,
      services,
      serviceIndex,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const unPay = (user, account, service, services, serviceIndex) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/unPay`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      account,
      service,
      services,
      serviceIndex,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeEntry = (user, account, service, services, serviceIndex) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/removeEntry`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      account,
      service,
      services,
      serviceIndex,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const invoiceDetails = (user, details) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/invoice`, {
    method: "POST",
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

export const accountData = (user, account) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API}/accounts/accountData/${user}/${account}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const payInvoice = (user, account, service, services) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/unPayInvoice`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      account,
      service,
      services,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const unPayInvoice = (user, account, service, services) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/unPayInvoice`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      account,
      service,
      services,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const retrieveAccountData = (user, account) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API}/accounts/accData/${user}/${account}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const chartData = (user, type) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API}/accounts/chart/${user}/${type}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const retrieveAccounts = (user) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/${user}`, {
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

export const retrieveAccount = (slug, acc) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/accounts/acc/${slug}/${acc}`, {
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
