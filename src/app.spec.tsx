import { fireEvent, render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import App from "./App";
import * as userReducer from "./store/features/users";
import { store } from "./store";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    const linkElement = screen.getByTestId("by-name");
    expect(linkElement).toBeInTheDocument();
  });

  test("should order by name on click name", () => {
    render(<App />);
    jest.spyOn(userReducer, "orderBy").mockReturnValue({
      type: "User/orderBy",
      payload: {
        field: "name",
      },
    });

    fireEvent.click(screen.getByTestId("by-name"));

    expect(userReducer.orderBy).toBeCalledWith({
      field: "name",
    });
  });

  test("should order by lastName on click lastName", () => {
    jest.resetAllMocks();

    render(<App />);

    jest.spyOn(userReducer, "orderBy").mockReturnValue({
      type: "User/orderBy",
      payload: {
        field: "lastName",
      },
    });

    fireEvent.click(screen.getByTestId("by-last-name"));

    expect(userReducer.orderBy).toBeCalledWith({
      field: "lastName",
    });
  });

  test("should order by email on click email", () => {
    jest.resetAllMocks();

    render(<App />);

    jest.spyOn(userReducer, "orderBy").mockReturnValue({
      type: "User/orderBy",
      payload: {
        field: "email",
      },
    });

    fireEvent.click(screen.getByTestId("by-email"));

    expect(userReducer.orderBy).toBeCalledWith({
      field: "email",
    });
  });

  test("should order by city on click city", () => {
    render(<App />);

    jest.spyOn(userReducer, "orderBy").mockReturnValue({
      type: "User/orderBy",
      payload: {
        field: "city",
      },
    });

    fireEvent.click(screen.getByTestId("by-city"));

    expect(userReducer.orderBy).toBeCalledWith({
      field: "city",
    });
  });

  test("should order by country on click country", () => {
    render(<App />);

    jest.spyOn(userReducer, "orderBy").mockReturnValue({
      type: "User/orderBy",
      payload: {
        field: "country",
      },
    });

    fireEvent.click(screen.getByTestId("by-country"));

    expect(userReducer.orderBy).toBeCalledWith({
      field: "country",
    });
  });

  test("should order by birthDate on click birthDate", () => {
    render(<App />);

    jest.spyOn(userReducer, "orderBy").mockReturnValue({
      type: "User/orderBy",
      payload: {
        field: "birthDate",
      },
    });

    fireEvent.click(screen.getByTestId("by-birth-date"));

    expect(userReducer.orderBy).toBeCalledWith({
      field: "birthDate",
    });
  });

  test("should delete user older than 18 years old on click delete", () => {
    jest.spyOn(store, "getState").mockReturnValue({
      userReducer: {
        users: [
          {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            city: faker.location.city(),
            country: faker.location.country(),
            birthDate: faker.date
              .birthdate({
                min: 18,
              })
              .toISOString()
              .split("T")[0],
          },
        ],
      },
    });

    render(<App />);

    const userDelete = store.getState().userReducer.users[0];

    jest.spyOn(userReducer, "deleteUser");

    const deleteButton = screen.getByTestId("delete-user");

    fireEvent.click(deleteButton);

    expect(userReducer.deleteUser).toBeCalledTimes(1);
    expect(userReducer.deleteUser).toBeCalledWith(userDelete);
  });
});
