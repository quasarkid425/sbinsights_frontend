import { createSlice } from "@reduxjs/toolkit";

let date = new Date();
let day = `${date.getDate()}`.padStart(2, "0");
let month = `${date.getMonth() + 1}`.padStart(2, "0");
let year = date.getFullYear();

let newDate = `${year}-${month}-${day}`;

const expenseState = {
  expenses: [],
  expenseStats: [],
  expense: {
    date: newDate,
    amount: 0,
    desc: "",
  },

  quickExpenses: {
    amount: [],
    desc: [],
  },
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: expenseState,
  reducers: {
    setExpense(state, action) {
      state.expense.date = action.payload;
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    setAllExpenses(state, action) {
      const { expenses, quickExpAmount, quickExpDesc } = action.payload;
      state.expenses = expenses;
      state.quickExpenses.amount = quickExpAmount;
      state.quickExpenses.desc = quickExpDesc;
    },
    setAmount(state, action) {
      state.expense.amount = action.payload;
    },
    setDesc(state, action) {
      state.expense.desc = action.payload;
    },

    clearFields(state, action) {
      state.expense.desc = "";
      state.expense.amount = 0;
      state.expense.date = newDate;
    },
    addToExpenses(state, action) {
      const { date, amount, desc } = action.payload;
      const newDate = date.split("-");
      const newExpenseDate = `${newDate[1]}-${newDate[2]}-${newDate[0]}`;
      const entry = {
        date: newExpenseDate,
        amount,
        desc,
      };

      state.expenses.unshift(entry);
    },

    sortCollectionAsc(state, action) {
      switch (action.payload) {
        case "Date":
          state.expenses.sort(function (a, b) {
            const aa = a.date.split("-").reverse().join(),
              bb = b.date.split("-").reverse().join();
            return aa < bb ? -1 : aa > bb ? 1 : 0;
          });
          break;
        case "Amount":
          state.expenses.sort((a, b) => (a.amount > b.amount ? 1 : -1));
          break;
        case "Description":
          state.expenses.sort((a, b) => (a.desc > b.desc ? 1 : -1));
          break;
      }
    },

    sortCollectionDesc(state, action) {
      switch (action.payload) {
        case "Date":
          state.expenses.sort(function (a, b) {
            const aa = a.date.split("-").reverse().join(),
              bb = b.date.split("-").reverse().join();
            return aa > bb ? -1 : aa < bb ? 1 : 0;
          });
          break;
        case "Amount":
          state.expenses.sort((a, b) => (a.amount < b.amount ? 1 : -1));
          break;
        case "Description":
          state.expenses.sort((a, b) => (a.desc < b.desc ? 1 : -1));
          break;
      }
    },

    clearExpenses(state, action) {
      state.expenses = [];
    },
    addFirstAmount(state, action) {
      state.quickExpenses.amount.push("");
    },
    addFirstDescription(state, action) {
      state.quickExpenses.desc.push("");
    },
    updateService(state, action) {
      const { type, index, value } = action.payload;

      switch (type) {
        case "amount":
          state.quickExpenses.amount[index] = value;
          break;
        case "desc":
          state.quickExpenses.desc[index] = value;
          break;
      }
    },
    addAmount(state, action) {
      state.quickExpenses.amount.push("");
    },
    removeAmount(state, action) {
      state.quickExpenses.amount.splice(action.payload, 1);
    },
    addDescription(state, action) {
      state.quickExpenses.desc.push("");
    },
    removeDescription(state, action) {
      state.quickExpenses.desc.splice(action.payload, 1);
    },

    quickAmt(state, action) {
      state.expense.amount = action.payload;
    },
    quickDesc(state, action) {
      state.expense.desc = action.payload;
    },

    removeExpense(state, action) {
      state.expenses.splice(action.payload, 1);
    },
    setExpData(state, action) {
      state.expenseStats = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
