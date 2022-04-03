import { createSlice } from "@reduxjs/toolkit";
import { getDateByYear } from "../utils/helpers";

const accountState = {
  accounts: [],
  accountStats: [],
  printInfo: {
    account: {},
    service: {},
  },
  count: 0,
};

const accountSlice = createSlice({
  name: "accounts",
  initialState: accountState,
  reducers: {
    setAccounts(state, action) {
      state.accounts = action.payload;
    },
    addAccount(state, action) {
      state.accounts.unshift(action.payload);
    },

    sortCollectionAsc(state, action) {
      switch (action.payload) {
        case "Name":
          state.accounts.sort((a, b) =>
            a.accFullName > b.accFullName ? 1 : -1
          );
          break;
        case "Phone":
          state.accounts.sort((a, b) =>
            a.accPhoneNumber > b.accPhoneNumber ? 1 : -1
          );
          break;
        case "Email":
          state.accounts.sort((a, b) => (a.accEmail > b.accEmail ? 1 : -1));
          break;
        case "Billing Name":
          state.accounts.sort((a, b) =>
            a.accAddress.addrFullName > b.accAddress.addrFullName ? 1 : -1
          );
          break;
        case "Billing Street":
          state.accounts.sort((a, b) =>
            a.accAddress.addrStreet > b.accAddress.addrStreet ? 1 : -1
          );
          break;
        case "Billing City":
          state.accounts.sort((a, b) =>
            a.accAddress.addrCity > b.accAddress.addrCity ? 1 : -1
          );
          break;
        case "Billing State":
          state.accounts.sort((a, b) =>
            a.accAddress.addrState > b.accAddress.addrState ? 1 : -1
          );
          break;
        case "Billing Zip":
          state.accounts.sort((a, b) =>
            a.accAddress.addrZipCode > b.accAddress.addrZipCode ? 1 : -1
          );
          break;
      }
    },

    sortCollectionDesc(state, action) {
      switch (action.payload) {
        case "Name":
          state.accounts.sort((a, b) =>
            a.accFullName < b.accFullName ? 1 : -1
          );
          break;
        case "Phone":
          state.accounts.sort((a, b) =>
            a.accPhoneNumber < b.accPhoneNumber ? 1 : -1
          );
          break;
        case "Email":
          state.accounts.sort((a, b) => (a.accEmail < b.accEmail ? 1 : -1));
          break;
        case "Billing Name":
          state.accounts.sort((a, b) =>
            a.accAddress.addrFullName < b.accAddress.addrFullName ? 1 : -1
          );
          break;
        case "Billing Street":
          state.accounts.sort((a, b) =>
            a.accAddress.addrStreet < b.accAddress.addrStreet ? 1 : -1
          );
          break;
        case "Billing City":
          state.accounts.sort((a, b) =>
            a.accAddress.addrCity < b.accAddress.addrCity ? 1 : -1
          );
          break;
        case "Billing State":
          state.accounts.sort((a, b) =>
            a.accAddress.addrState < b.accAddress.addrState ? 1 : -1
          );
          break;
        case "Billing Zip":
          state.accounts.sort((a, b) =>
            a.accAddress.addrZipCode < b.accAddress.addrZipCode ? 1 : -1
          );
          break;
      }
    },

    updateAccountDetails(state, action) {
      const { accNo, updatedCustomerAccount } = action.payload;

      const index = state.accounts.findIndex(
        (acc) => acc._id.toString() === accNo
      );
      state.accounts.splice(index, 1, updatedCustomerAccount);
    },
    removeAccount(state, action) {
      const accNo = action.payload;
      const index = state.accounts.findIndex(
        (acc) => acc._id.toString() === accNo
      );
      state.accounts.splice(index, 1);
    },
    addServices(state, action) {
      const { accNo, entry } = action.payload;

      const index = state.accounts.findIndex(
        (acc) => acc._id.toString() === accNo
      );

      state.accounts[index].services.unshift(entry);
    },
    pay(state, action) {
      const { acc, service } = action.payload;
      const accIndex = state.accounts.findIndex(
        (account) => account._id.toString() === acc
      );
      const serviceIndex = state.accounts[accIndex].services.findIndex(
        (acc) => acc._id.toString() === service
      );

      state.accounts[accIndex].services[serviceIndex].paid = true;
    },
    unPay(state, action) {
      const { acc, service } = action.payload;
      const accIndex = state.accounts.findIndex(
        (account) => account._id.toString() === acc
      );
      const serviceIndex = state.accounts[accIndex].services.findIndex(
        (acc) => acc._id.toString() === service
      );

      state.accounts[accIndex].services[serviceIndex].paid = false;
    },
    removeAccountService(state, action) {
      const { acc, service } = action.payload;
      const accIndex = state.accounts.findIndex(
        (account) => account._id.toString() === acc
      );
      const serviceIndex = state.accounts[accIndex].services.findIndex(
        (acc) => acc._id.toString() === service
      );

      state.accounts[accIndex].services.splice(serviceIndex, 1);
    },
    sortServicesByDate(state, action) {
      const { accNo, date } = action.payload;
      const accountIndex = state.accounts.findIndex((acc) => acc._id === accNo);
      switch (date) {
        case "asc":
          state.accounts[accountIndex].services.sort(function (a, b) {
            const aa = a.date.split("-").reverse().join(),
              bb = b.date.split("-").reverse().join();
            return aa < bb ? -1 : aa > bb ? 1 : 0;
          });
          break;
        case "desc":
          state.accounts[accountIndex].services.sort(function (a, b) {
            const aa = a.date.split("-").reverse().join(),
              bb = b.date.split("-").reverse().join();
            return aa > bb ? -1 : aa < bb ? 1 : 0;
          });
          break;
      }
    },
    sortServicesByPay(state, action) {
      const { accNo, paid } = action.payload;
      const accountIndex = state.accounts.findIndex((acc) => acc._id === accNo);
      switch (paid) {
        case "yes":
          state.accounts[accountIndex].services.sort((a, b) =>
            a.paid < b.paid ? 1 : -1
          );
          break;
        case "no":
          state.accounts[accountIndex].services.sort((a, b) =>
            a.paid > b.paid ? 1 : -1
          );
          break;
      }
    },

    setPrintAccount(state, action) {
      const { accountId, index } = action.payload;
      const account = state.accounts.find((acc) => acc._id === accountId);
      state.printInfo.account = account;
      state.printInfo.service = account.services[index];
    },

    //entry actions
    recordField(state, action) {
      const { field, accountIndex, value, index } = action.payload;
      const account = state.accounts[accountIndex].entries[index];

      switch (field) {
        case "service":
          account.chartDate = account.date;
          account.service = value;
          break;
        case "description":
          account.chartDate = account.date;
          account.desc = value;
          break;
        case "qty":
          let qty = parseInt(value);
          if (account.tax) {
            let total = qty * account.amount;
            let qtyTax = total * account.taxRate;
            account.total = total + qtyTax;
            account.qty = qty;
          } else {
            account.total = account.amount * qty;
            account.qty = qty;
          }
          break;
        case "amount":
          let amtTax;
          if (account.tax) {
            amtTax = (parseInt(value) * account.qty * account.taxRate).toFixed(
              2
            );
            account.total = parseInt(value) * account.qty + parseFloat(amtTax);
            account.amount = parseFloat(value);
          } else {
            account.total = parseFloat(value) * account.qty;
            account.amount = parseFloat(value);
          }
          break;
        case "tax":
          //set tax to true for entry
          account.tax = true;
          // set tax values to entry for state
          account.abbrevation = value.abbrevation;
          account.taxState = value.name;
          account.taxRate = value.taxRate;

          let finalTax = parseFloat(
            (account.amount * account.qty * value.taxRate).toFixed(2)
          );
          account.total = account.amount * account.qty + finalTax;
          break;
        case "date":
          account.date = value;
          account.chartDate = value;
          break;
      }
    },
    newField(state, action) {
      const { accountIndex } = action.payload;
      //this needs to be changed to the format of the new entry
      state.accounts[accountIndex].entries.push({
        service: "",
        desc: "",
        qty: 1,
        amount: 0,
        tax: false,
        date: getDateByYear(),
        chartDate: getDateByYear(),
        total: 0,
        taxState: "",
        abbrevation: "",
        taxRate: 0,
      });
    },
    removeField(state, action) {
      const { accountIndex, index } = action.payload;
      state.accounts[accountIndex].entries.splice(index, 1);
    },
    setQuickNote(state, action) {
      const { type, accountIndex, value, index } = action.payload;
      const account = state.accounts[accountIndex].entries[index];
      account.chartDate = account.date;
      switch (type) {
        case "service":
          account.service = value;
          break;
        case "desc":
          account.desc = value;
          break;
      }
    },
    clearEntries(state, action) {
      //this needs to be changed to the modal entry
      const { accountIndex } = action.payload;

      state.accounts[accountIndex].entries = [
        {
          service: "",
          desc: "",
          qty: 1,
          amount: 0,
          tax: false,
          date: getDateByYear(),
          total: 0,
          taxState: "",
          abbrevation: "",
          taxRate: 0,
        },
      ];
    },

    noSalesTax(state, action) {
      const { accountIndex, index } = action.payload;
      const account = state.accounts[accountIndex].entries[index];
      account.tax = false;
      account.total = account.amount * account.qty;
    },
    setAccData(state, action) {
      state.accountStats = action.payload;
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
