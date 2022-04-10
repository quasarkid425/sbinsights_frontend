export const addEmployee = (user, newEmp) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/employees`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      newEmp,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateEmployeeInfo = (userId, empNo, updatedEmp) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/employees`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      empNo,
      updatedEmp,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeEmployee = (userId, empNo) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/employees`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      empNo,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const setHourlyWage = (userId, empNo, wage) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/employees/wage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      empNo,
      wage,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const submitPaidEntry = (user, employee, entry) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/employees/pay`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      employee,
      entry,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removePaidEntry = (user, employee, entry, entries, entryIndex) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/employees/removePaidEntry`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      employee,
      entry,
      entries,
      entryIndex,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const retrieveEmployeeData = (user, employee) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API}/employees/empData/${user}/${employee}`,
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

export const retrieveEmployees = (userId) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/employees/${userId}`, {
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

export const retrieveEmployee = (slug, emp) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/employees/emp/${slug}/${emp}`, {
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
