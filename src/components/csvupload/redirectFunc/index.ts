// hooks/useRedirect.js
import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const navigate = useNavigate();

  const redirectTo = (path:any) => {
    if (path) navigate(path);
  };

  return redirectTo;
};

export default useRedirect;
