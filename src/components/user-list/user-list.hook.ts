import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  User,
  orderBy as orderByRedux,
  deleteUser as deleteUserRedux,
} from "../../store/features/users";

const useUserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.userReducer);

  const deleteUser = (user: User) => {
    const birthDate = new Date(user.birthDate);
    const now = new Date();
    const age = now.getFullYear() - birthDate.getFullYear();
    const month = now.getMonth() - birthDate.getMonth();
    const day = now.getDate() - birthDate.getDate();

    const isAdult =
      age > 18 ||
      (age === 18 && month > 0) ||
      (age === 18 && month === 0 && day >= 0);

    if (isAdult) {
      dispatch(deleteUserRedux(user));
    }
  };

  const orderBy = (field: keyof User) => {
    dispatch(orderByRedux({ field }));
  };

  return {
    deleteUser,
    users,
    orderBy,
  };
};

export default useUserList;
