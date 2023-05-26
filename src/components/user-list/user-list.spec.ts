import * as reactRedux from "react-redux";
import { renderHook } from "@testing-library/react-hooks";
import { faker } from "@faker-js/faker";
import useUserList from "./user-list.hook";
import { deleteUser as deleteUserRedux } from "../../store/features/users";

import users from "../../mock/users";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("useUserList", () => {
  const mockedState = {
    users,
  };
  it("should call dispatch with deleteUserRedux when deleteUser is called with adult user", () => {
    const dispatchMock = jest.fn();

    jest.spyOn(reactRedux, "useSelector").mockReturnValue(mockedState);
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(dispatchMock);

    const user = {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      country: faker.location.country(),
      birthDate: faker.date
        .birthdate({
          min: 18,
          max: 70,
        })
        .toISOString()
        .split("T")[0],
    };
    const { result } = renderHook(() => useUserList());
    result.current.deleteUser(user);

    expect(reactRedux.useDispatch).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(deleteUserRedux(user));
  });

  it("should not call dispatch with deleteUserRedux when deleteUser is called with minor user", () => {
    const dispatchMock = jest.fn();

    jest.spyOn(reactRedux, "useSelector").mockReturnValue(mockedState);
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(dispatchMock);

    const user = {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      country: faker.location.country(),
      birthDate: faker.date
        .birthdate({
          min: 0,
          max: 17,
        })
        .toISOString()
        .split("T")[0],
    };
    const { result } = renderHook(() => useUserList());
    result.current.deleteUser(user);

    expect(reactRedux.useDispatch).toHaveBeenCalled();
    expect(reactRedux.useDispatch).not.toHaveBeenCalledWith(
      deleteUserRedux(user)
    );
  });
  it("should call dispatch with orderByRedux when orderBy is called", () => {
    const dispatchMock = jest.fn();

    jest.spyOn(reactRedux, "useSelector").mockReturnValue(mockedState);
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(dispatchMock);

    const { result } = renderHook(() => useUserList());
    result.current.orderBy("name");

    expect(reactRedux.useDispatch).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "User/orderBy",
      payload: { field: "name" },
    });
  });
});
