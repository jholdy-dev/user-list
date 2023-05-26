import { configureStore } from "@reduxjs/toolkit";
import { deleteUser, orderBy, UserSlice, User, reset } from "./users";
import userReducer from "./users";

const store = configureStore({
  reducer: { userReducer },
});

describe("UserSlice", () => {
  beforeAll(() => {
    store.dispatch(reset());
  });

  it("should delete a user", () => {
    const userToDelete: User = {
      name: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      city: "New York",
      country: "USA",
      birthDate: "1990-01-01",
    };

    const expectedActions = {
      type: UserSlice.actions.deleteUser.type,
      payload: userToDelete,
    };

    const action = store.dispatch(deleteUser(userToDelete));
    expect(action).toEqual(expectedActions);
  });

  it("should order users by field in ascending order", () => {
    const field = "name";

    const expectedActions = {
      type: UserSlice.actions.orderBy.type,
      payload: { field },
    };

    const action = store.dispatch(orderBy({ field }));
    expect(action).toEqual(expectedActions);
    expect(store.getState().userReducer.sortingState?.order).toEqual("asc");
  });

  it("should order users by field in descending order", () => {
    const field = "name";
    store.dispatch(orderBy({ field }));
    expect(store.getState().userReducer.sortingState?.order).toEqual("desc");
  });
  it("should reset the state", () => {
    const expectedActions = {
      type: UserSlice.actions.reset.type,
    };

    const action = store.dispatch(reset());
    expect(action.type).toEqual(expectedActions.type);
  });
});
