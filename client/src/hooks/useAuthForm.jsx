import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth.service";
import { setAuth } from "../stores/user.slice";

export const useAuthForm = (type = "login") => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res =
        type === "login"
          ? await authService.login(data)
          : await authService.register(data);
      if (res.status === 201 || res.status === 200) {
        const { user, accessToken } = res.data;
        dispatch(setAuth({ user, accessToken }));
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      let message = "Xatolik yuz berdi";
      if (error.response) {
        message =
          error.response.data?.message || `Xato: ${error.response.status}`;
      } else if (error.request) {
        message = "Serverga ulanish mumkin emas";
      } else {
        message = error.message;
      }
      alert(message);
    }
  };

  return { onSubmit };
};
