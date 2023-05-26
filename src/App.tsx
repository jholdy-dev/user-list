import React from "react";
import UserList from "./components/user-list/user-list.comp";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserList />
      </div>
    </Provider>
  );
}

export default App;
