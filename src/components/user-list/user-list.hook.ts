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
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - birthDate.getTime();
    const ageInYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));

    const child = ageInYears < 18;

    if (child) {
      return;
    }

    dispatch(deleteUserRedux(user));
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
