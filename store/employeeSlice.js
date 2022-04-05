import { createSlice } from "@reduxjs/toolkit";
import { getDateByYear } from "../utils/helpers";
import lodash from "lodash";

const employeeState = {
  employees: [],
  employee: {},
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
    setEmployee(state, action) {
      state.employee = action.payload;
      state.employee.pay.date = getDateByYear();
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
          state.employee.pay.date = value;
          break;
        case "hours":
          if (state.employee.pay.hourlyWage === 0) {
            state.employee.pay.hours = parseFloat(value);
            state.employee.pay.total =
              parseFloat(value) * state.employee.pay.wage;
          } else {
            state.employee.pay.hours = parseFloat(value);
            state.employee.pay.total =
              parseFloat(value) * state.employee.pay.hourlyWage;
          }
          break;
        case "amount":
          state.wage = false;
          state.employee.pay.hourlyWage = 0;
          state.employee.pay.wage = parseFloat(value);
          state.employee.pay.total =
            parseFloat(value) * state.employee.pay.hours;
          break;
        case "hourlyWage":
          state.wage = true;
          state.employee.pay.wage = 0;
          if (state.employee.pay.hours === 0) {
            state.employee.pay.hourlyWage = parseFloat(value);
          } else {
            state.employee.pay.hourlyWage = parseFloat(value);
            state.employee.pay.total =
              parseFloat(value) * state.employee.pay.hours;
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
      const { date } = action.payload;

      switch (date) {
        case "asc":
          state.employee.paidEntries.sort(function (a, b) {
            const aa = a.date.split("-").reverse().join(),
              bb = b.date.split("-").reverse().join();
            return aa < bb ? -1 : aa > bb ? 1 : 0;
          });
          break;
        case "desc":
          state.employee.paidEntries.sort(function (a, b) {
            const aa = a.date.split("-").reverse().join(),
              bb = b.date.split("-").reverse().join();
            return aa > bb ? -1 : aa < bb ? 1 : 0;
          });
          break;
      }
    },
    recordPaidEntry(state, action) {
      const { entry, wage } = action.payload;
      if (wage) {
        state.employee.paidEntries.unshift(entry);
        state.employee.pay.hours = 0;
        state.employee.pay.total = 0;
        state.employee.pay.date = getDateByYear();
      } else {
        state.employee.paidEntries.unshift(entry);
        state.employee.pay.hours = 0;
        state.employee.pay.total = 0;
        state.employee.pay.date = getDateByYear();
      }
    },

    removeAccountService(state, action) {
      const { entryId } = action.payload;
      const entryIndex = state.employee.paidEntries.findIndex(
        (emp) => emp._id.toString() === entryId
      );

      state.employee.paidEntries.splice(entryIndex, 1);
    },
    setEmpData(state, action) {
      state.employeeStats = action.payload;
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;
