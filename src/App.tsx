import React from "react";
import "./App.css";
import UserList from "./components/user-list/user-list.comp";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <UserList />
    </Provider>
  );
}

export default App;
