import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import users from "../../mock/users";

export interface User {
  name: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  birthDate: string;
}

export interface UserState {
  users: User[];
  sortingState?: {
    field: keyof User;
    order: "asc" | "desc";
  };
}

const initialState: UserState = {
  users,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    reset: () => initialState,
    deleteUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter(
        (user) => user.email !== action.payload.email
      );
    },
    orderBy: (
      state,
      action: PayloadAction<{
        field: keyof User;
      }>
    ) => {
      const order = state.sortingState?.order === "asc" ? "desc" : "asc";
      state.sortingState = {
        field: action.payload.field,
        order: order,
      };

      state.users = state.users.sort((a, b) => {
        if (order === "asc") {
          return a[action.payload.field] > b[action.payload.field] ? 1 : -1;
        } else {
          return a[action.payload.field] < b[action.payload.field] ? 1 : -1;
        }
      });
    },
  },
});

export const { deleteUser, orderBy, reset } = UserSlice.actions;

export default UserSlice.reducer;
