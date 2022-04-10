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
      const emps = action.payload.map((acc) => {
        return {
          ...acc,
          pay: {
            ...acc.pay,
            date: getDateByYear(),
          },
        };
      });
      state.employees = emps;
    },
    setEmployee(state, action) {
      state.employee = action.payload;
      state.employee.pay.date = getDateByYear();
    },
    addEmployee(state, action) {
      action.payload.pay.date = getDateByYear();
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
      const { field, empIndex, value } = action.payload;
      const employee = state.employees[empIndex];

      switch (field) {
        case "date":
          employee.pay.date = value;
          break;
        case "hours":
          if (employee.pay.hourlyWage === 0) {
            employee.pay.hours = parseFloat(value);
            employee.pay.total = parseFloat(value) * employee.pay.wage;
          } else {
            employee.pay.hours = parseFloat(value);
            employee.pay.total = parseFloat(value) * employee.pay.hourlyWage;
          }
          break;
        case "amount":
          state.wage = false;
          employee.pay.hourlyWage = 0;
          employee.pay.wage = parseFloat(value);
          employee.pay.total = parseFloat(value) * employee.pay.hours;
          break;
        case "hourlyWage":
          state.wage = true;
          employee.pay.wage = 0;
          if (employee.pay.hours === 0) {
            employee.pay.hourlyWage = parseFloat(value);
          } else {
            employee.pay.hourlyWage = parseFloat(value);
            employee.pay.total = parseFloat(value) * employee.pay.hours;
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
          employees.sort((a, b) => (a.empFullName > b.empFullName ? 1 : -1));
          break;
        case "Phone":
          employees.sort((a, b) =>
            a.empPhoneNumber > b.empPhoneNumber ? 1 : -1
          );
          break;
        case "Email":
          employees.sort((a, b) => (a.empEmail > b.empEmail ? 1 : -1));
          break;
        case "Gender":
          employees.sort((a, b) => (a.empGender > b.empGender ? 1 : -1));
          break;
        case "Address":
          employees.sort((a, b) =>
            a.empAddress.empStreet > b.empAddress.empStreet ? 1 : -1
          );
          break;
        case "City":
          employees.sort((a, b) =>
            a.empAddress.empCity > b.empAddress.empCity ? 1 : -1
          );
          break;
        case "State":
          employees.sort((a, b) =>
            a.empAddress.empState > b.empAddress.empState ? 1 : -1
          );
          break;
        case "Zip Code":
          employees.sort((a, b) =>
            a.empAddress.empZipCode > b.empAddress.empZipCode ? 1 : -1
          );
          break;
      }
    },

    sortCollectionDesc(state, action) {
      switch (action.payload) {
        case "Name":
          employees.sort((a, b) => (a.empFullName < b.empFullName ? 1 : -1));
          break;
        case "Phone":
          employees.sort((a, b) =>
            a.empPhoneNumber < b.empPhoneNumber ? 1 : -1
          );
          break;
        case "Email":
          employees.sort((a, b) => (a.empEmail < b.empEmail ? 1 : -1));
          break;
        case "Gender":
          employees.sort((a, b) => (a.empGender < b.empGender ? 1 : -1));
          break;
        case "Address":
          employees.sort((a, b) =>
            a.empAddress.empStreet < b.empAddress.empStreet ? 1 : -1
          );
          break;
        case "City":
          employees.sort((a, b) =>
            a.empAddress.empCity < b.empAddress.empCity ? 1 : -1
          );
          break;
        case "State":
          employees.sort((a, b) =>
            a.empAddress.empState < b.empAddress.empState ? 1 : -1
          );
          break;
        case "Zip Code":
          employees.sort((a, b) =>
            a.empAddress.empZipCode < b.empAddress.empZipCode ? 1 : -1
          );
          break;
      }
    },
    sortEntriesByDate(state, action) {
      const { empIndex, date } = action.payload;

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
      const { entry, empIndex, wage } = action.payload;
      const employee = state.employees[empIndex];
      if (wage) {
        employee.paidEntries.unshift(entry);
        employee.pay.hours = 0;
        employee.pay.total = 0;
        employee.pay.date = getDateByYear();
      } else {
        employee.paidEntries.unshift(entry);
        employee.pay.hours = 0;
        employee.pay.total = 0;
        employee.pay.date = getDateByYear();
      }
    },

    removeAccountService(state, action) {
      const { empIndex, entryId } = action.payload;
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
