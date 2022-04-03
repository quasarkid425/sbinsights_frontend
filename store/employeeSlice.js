import { createSlice } from "@reduxjs/toolkit";

const employeeState = {
  employees: [],
  employeeStats: [],
  wage: false,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: employeeState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    addEmployee(state, action) {
      state.employees.unshift(action.payload);
    },
    updateEmployeeDetails(state, action) {
      const { empNo, updatedEmployee } = action.payload;
      const index = state.employees.findIndex(
        (emp) => emp._id.toString() === empNo
      );
      state.employees.splice(index, 1, updatedEmployee);
    },
    recordField(state, action) {
      const { field, index, value } = action.payload;

      switch (field) {
        case "date":
          state.employees[index].pay.date = value;
          break;
        case "hours":
          if (state.employees[index].pay.hourlyWage === 0) {
            state.employees[index].pay.hours = parseInt(value);
            state.employees[index].pay.total =
              parseInt(value) * state.employees[index].pay.wage;
          } else {
            state.employees[index].pay.hours = parseInt(value);
            state.employees[index].pay.total =
              parseInt(value) * state.employees[index].pay.hourlyWage;
          }
          break;
        case "amount":
          state.wage = false;
          state.employees[index].pay.hourlyWage = 0;
          state.employees[index].pay.wage = parseFloat(value);
          state.employees[index].pay.total =
            parseFloat(value) * state.employees[index].pay.hours;
          break;
        case "hourlyWage":
          state.wage = true;
          state.employees[index].pay.wage = 0;
          if (state.employees[index].pay.hours === 0) {
            state.employees[index].pay.hourlyWage = parseFloat(value);
          } else {
            state.employees[index].pay.hourlyWage = parseFloat(value);
            state.employees[index].pay.total =
              parseFloat(value) * state.employees[index].pay.hours;
          }
          break;
      }
    },
    removeAccount(state, action) {
      const empNo = action.payload;
      const index = state.employees.findIndex(
        (emp) => emp._id.toString() === empNo
      );
      state.employees.splice(index, 1);
    },
    sortCollectionAsc(state, action) {
      switch (action.payload) {
        case "Name":
          state.employees.sort((a, b) =>
            a.empFullName > b.empFullName ? 1 : -1
          );
          break;
        case "Phone":
          state.employees.sort((a, b) =>
            a.empPhoneNumber > b.empPhoneNumber ? 1 : -1
          );
          break;
        case "Email":
          state.employees.sort((a, b) => (a.empEmail > b.empEmail ? 1 : -1));
          break;
        case "Gender":
          state.employees.sort((a, b) => (a.empGender > b.empGender ? 1 : -1));
          break;
        case "Address":
          state.employees.sort((a, b) =>
            a.empAddress.empStreet > b.empAddress.empStreet ? 1 : -1
          );
          break;
        case "City":
          state.employees.sort((a, b) =>
            a.empAddress.empCity > b.empAddress.empCity ? 1 : -1
          );
          break;
        case "State":
          state.employees.sort((a, b) =>
            a.empAddress.empState > b.empAddress.empState ? 1 : -1
          );
          break;
        case "Zip Code":
          state.employees.sort((a, b) =>
            a.empAddress.empZipCode > b.empAddress.empZipCode ? 1 : -1
          );
          break;
      }
    },

    sortCollectionDesc(state, action) {
      switch (action.payload) {
        case "Name":
          state.employees.sort((a, b) =>
            a.empFullName < b.empFullName ? 1 : -1
          );
          break;
        case "Phone":
          state.employees.sort((a, b) =>
            a.empPhoneNumber < b.empPhoneNumber ? 1 : -1
          );
          break;
        case "Email":
          state.employees.sort((a, b) => (a.empEmail < b.empEmail ? 1 : -1));
          break;
        case "Gender":
          state.employees.sort((a, b) => (a.empGender < b.empGender ? 1 : -1));
          break;
        case "Address":
          state.employees.sort((a, b) =>
            a.empAddress.empStreet < b.empAddress.empStreet ? 1 : -1
          );
          break;
        case "City":
          state.employees.sort((a, b) =>
            a.empAddress.empCity < b.empAddress.empCity ? 1 : -1
          );
          break;
        case "State":
          state.employees.sort((a, b) =>
            a.empAddress.empState < b.empAddress.empState ? 1 : -1
          );
          break;
        case "Zip Code":
          state.employees.sort((a, b) =>
            a.empAddress.empZipCode < b.empAddress.empZipCode ? 1 : -1
          );
          break;
      }
    },
    sortEntriesByDate(state, action) {
      const { empNo, date } = action.payload;
      const empIndex = state.employees.findIndex((emp) => emp._id === empNo);

      switch (date) {
        case "asc":
          state.employees[empIndex].paidEntries.sort(function (a, b) {
            const aa = a.date.split("-").reverse().join(),
              bb = b.date.split("-").reverse().join();
            return aa < bb ? -1 : aa > bb ? 1 : 0;
          });
          break;
        case "desc":
          state.employees[empIndex].paidEntries.sort(function (a, b) {
            const aa = a.date.split("-").reverse().join(),
              bb = b.date.split("-").reverse().join();
            return aa > bb ? -1 : aa < bb ? 1 : 0;
          });
          break;
      }
    },
    recordPaidEntry(state, action) {
      let date = new Date();
      let day = `${date.getDate()}`.padStart(2, "0");
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let year = date.getFullYear();

      let newDate = `${year}-${month}-${day}`;
      const { entry, index, wage } = action.payload;
      if (wage) {
        state.employees[index].paidEntries.unshift(entry);
        state.employees[index].pay.hours = 0;
        state.employees[index].pay.total = 0;
        state.employees[index].pay.date = newDate;
      } else {
        state.employees[index].paidEntries.unshift(entry);
        state.employees[index].pay.hours = 0;
        state.employees[index].pay.total = 0;
        state.employees[index].pay.date = newDate;
      }
    },

    removeAccountService(state, action) {
      const { empNo, entryId } = action.payload;

      const empIndex = state.employees.findIndex(
        (emp) => emp._id.toString() === empNo
      );

      const entryIndex = state.employees[empIndex].paidEntries.findIndex(
        (emp) => emp._id.toString() === entryId
      );

      state.employees[empIndex].paidEntries.splice(entryIndex, 1);
    },
    setEmpData(state, action) {
      state.employeeStats = action.payload;
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;
