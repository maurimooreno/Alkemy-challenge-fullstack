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

export const fetchDeleteTransactions = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
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
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchUpdateTransactions = createAsyncThunk(
  "transactions/updateTransaction",
  async (data) => {
    try {
      const response = await axios.patch(url, data);
      return response.data;
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
      const transactions = state.allTransactions;
      const filterTransactions =
        action.payload === "costs"
          ? transactions.filter((t) => t.type === "costs")
          : transactions.filter((t) => t.type === "income");
      state.transactionsFiltered = filterTransactions;
    },
    filteredTransactionsRegistered: (state, action) => {
      const transactions = state.transactionsRegistered;
      const filterTransactions =
        action.payload === "costs"
          ? transactions.filter((t) => t.type === "costs")
          : transactions.filter((t) => t.type === "income");
      state.transactionsFiltered = filterTransactions;
    },
    deleteTransactionRegister: (state, action) => {
      state.transactionsRegistered = state.transactionsRegistered.filter(
        (t) => t.id !== action.payload
      );
      state.transactionsFiltered = state.transactionsFiltered.filter(
        (t) => t.id !== action.payload
      );
    }
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
      })
    builder
      .addCase(fetchPostTransactions.pending, (state, action) => {
        state.allTransactions = [...state.allTransactions];
        state.transactionsFiltered = [...state.transactionsFiltered];
      })
      .addCase(fetchPostTransactions.fulfilled, (state, action) => {
        state.allTransactions = [...state.allTransactions, action.payload];
        state.transactionsRegistered = [
          ...state.transactionsRegistered,
          action.payload,
        ];
        state.transactionsFiltered = [
          ...state.transactionsFiltered,
          action.payload,
        ];
      })
      .addCase(fetchPostTransactions.rejected, (state, action) => {
        state.error = action.error.message;
      })
    builder
      .addCase(fetchDeleteTransactions.pending, (state, action) => {
        state.allTransactions = [...state.allTransactions];
        state.transactionsFiltered = [...state.transactionsFiltered];
      })
      .addCase(fetchDeleteTransactions.fulfilled, (state, action) => {
        state.allTransactions = state.allTransactions.filter(
          (t) => t.id !== action.payload.id
        );
        state.transactionsRegistered = state.transactionsRegistered.filter(
          (t) => t.id !== action.payload.id
        );
        state.transactionsFiltered = state.transactionsFiltered.filter(
          (t) => t.id !== action.payload.id
        );
      })
      .addCase(fetchDeleteTransactions.rejected, (state, action) => {
        state.error = action.error.message;
      })
    builder
      .addCase(fetchUpdateTransactions.pending, (state, action) => {
        state.allTransactions = [...state.allTransactions];
        state.transactionsFiltered = [...state.transactionsFiltered];
      })
      .addCase(fetchUpdateTransactions.fulfilled, (state, action) => {
        state.allTransactions = state.allTransactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
        state.transactionsRegistered = state.transactionsRegistered.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
        state.transactionsFiltered = state.transactionsFiltered.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      })
      .addCase(fetchUpdateTransactions.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});

export const {
  getAllTransactions,
  filteredTransactionsByType,
  filteredTransactionsRegistered,
  deleteTransactionRegister,
} = rootReducer.actions;

export default rootReducer.reducer;
