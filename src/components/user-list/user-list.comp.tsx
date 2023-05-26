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
          <th onClick={(e) => orderBy("name")} data-testid="by-name">
            name
          </th>
          <th onClick={(e) => orderBy("lastName")} data-testid="by-last-name">
            lastName
          </th>
          <th onClick={(e) => orderBy("email")} data-testid="by-email">
            email
          </th>
          <th onClick={(e) => orderBy("city")} data-testid="by-city">
            city
          </th>
          <th onClick={(e) => orderBy("country")} data-testid="by-country">
            country
          </th>
          <th onClick={(e) => orderBy("birthDate")} data-testid="by-birth-date">
            birthDate
          </th>
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
              <button
                onClick={() => deleteUser(user)}
                className="button"
                data-testid={index === 0 ? "delete-user" : ""}
              >
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
