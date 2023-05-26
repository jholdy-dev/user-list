import React from "react";
import useUserList from "./user-list.hook";
import "./user-list.style.css";
type Props = {};

const UserList: React.FC<Props> = () => {
  const { deleteUser, users, orderBy } = useUserList();

  return (
    <table className="content-table">
      <thead>
        <tr>
          <th onClick={(e) => orderBy("name")}>name</th>
          <th onClick={(e) => orderBy("lastName")}>lastName</th>
          <th onClick={(e) => orderBy("email")}>email</th>
          <th onClick={(e) => orderBy("city")}>city</th>
          <th onClick={(e) => orderBy("country")}>country</th>
          <th onClick={(e) => orderBy("birthDate")}>birthDate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.email} className={index % 2 === 0 ? "active-row" : ""}>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.city}</td>
            <td>{user.country}</td>
            <td>{user.birthDate}</td>
            <td>
              <button onClick={() => deleteUser(user)} className="button">
                <span className="text">Delete</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
