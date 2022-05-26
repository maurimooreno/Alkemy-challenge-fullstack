import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.REACT_APP_URL;

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransaction",
  async () => {
    try {
      const response = await axios.get(url);
      return [...response.data];
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchPostTransactions = createAsyncThunk(
  "transactions/postTransaction",
  async (body) => {
    try {
      const response = await axios.post(url, body);
      return [...response.data];
    } catch (err) {
      console.log(err);
    }
  }
);

export const rootReducer = createSlice({
  name: "transaction",
  initialState: {
    allTransactions: [],
    transactionsRegistered: [],
    transactionsFiltered: [],
    error: "",
  },
  reducers: {
    getAllTransactions: (state, action) => {
      state.allTransactions = action.payload;
    },
    filteredTransactionsByType: (state, action) => {
      const transactions = state.transactionsRegistered;
      const filterTransactions =
        action.payload === "costs"
          ? transactions.filter((t) => t.type === "costs")
          : transactions.filter((t) => t.type === "income");
      state.transactionsFiltered = filterTransactions;
    },
    filteredTransactionByState: (state, action) => {
      if (action.payload === "charged") {
        state.transactionsFiltered = state.allTransactions;
        state.transactionsRegistered = state.allTransactions
      }
      if (action.payload === "registered") {
        state.transactionsFiltered = state.transactionsRegistered;
      }
    },
    addTransactionsRegister: (state, action) => {
      const id = state.transactionsRegistered.length;
      const transaction = {
        concept: action.payload.concept,
        amount: action.payload.amount,
        date: action.payload.date,
        type: action.payload.type,
        id: id,
      };
      state.transactionsRegistered = [
        ...state.transactionsRegistered,
        transaction,
      ];
      state.transactionsFiltered = [...state.transactionsFiltered, transaction];
    },
    deleteTransactionRegister: (state, action) => {
      state.transactionsFiltered = state.transactionsFiltered.filter(
        (t) => t.id !== parseInt(action.payload)
      );
      state.transactionsRegistered = state.transactionsRegistered.filter(
        (t) => t.id !== parseInt(action.payload)
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.allTransactions = [];
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.allTransactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(fetchPostTransactions.fulfilled, (state, action) => {
        state.allTransactions = action.payload;
      })
      .addCase(fetchPostTransactions.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  getAllTransactions,
  filteredTransactionsByType,
  addTransactionsRegister,
  deleteTransactionRegister,
  filteredTransactionByState,
} = rootReducer.actions;

export default rootReducer.reducer;
