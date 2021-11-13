import { useMutation } from "react-query";
import {
  setUserPassword,
  setPerfilPhoto,
  changeUserName,
} from "../../Helpers/api";
import useToggle from "../Utils/useToggle";

export default function useUserData() {
  const [isOpenModalPassword, toggleModalPassword] = useToggle(false);
  const [isOpenModalChangePhoto, toggleModalChangePhoto] = useToggle(false);
  const [isOpenModalChangeName, toggleModalChangeName] = useToggle(false);

  const setUserPasswordMutation = useMutation((payload) =>
    setUserPassword(payload)
  );

  const setUserPerfilPhotoMutation = useMutation((payload) =>
    setPerfilPhoto(payload)
  );

  const setUserNameMutation = useMutation((payload) => changeUserName(payload));

  return {
    // modal flags
    isOpenModalPassword,
    isOpenModalChangePhoto,
    isOpenModalChangeName,

    // modal setters
    toggleModalPassword,
    toggleModalChangePhoto,
    toggleModalChangeName,

    // mutations
    setUserPasswordMutation,
    setUserPerfilPhotoMutation,
    setUserNameMutation,
  };
}
