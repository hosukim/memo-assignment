import { createSlice } from "@reduxjs/toolkit";
import { MEMO_SLICE } from "../sliceKeys";
import { useSelector } from "react-redux";

export type MEMO_STATE = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const initialState: MEMO_STATE[] = [];

const memoSlice = createSlice({
  name: MEMO_SLICE,
  initialState,
  reducers: {
    addMemo: (state, action) => {
      state.push(action.payload);
    },
    deleteMemo: (state, action) => {
      return state.filter((memo) => memo.id !== action.payload);
    },
    updateMemo: (state, action) => {
      const index = state.findIndex((memo) => memo.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addMemo, deleteMemo, updateMemo } = memoSlice.actions;

export const useMemoList = () => useSelector((state: any) => state[MEMO_SLICE]);

export const useGetMemoDetail = (id: string) =>
  useSelector((state: any) =>
    state[MEMO_SLICE].find((memo: MEMO_STATE) => memo.id === id)
  );

export default memoSlice.reducer;
