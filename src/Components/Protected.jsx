import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.IsLoggedIn) {
      navigate("/");
    }
  }, [user, navigate]);

  return user?.IsLoggedIn ? <Component /> : null; // Conditionally render the component if the user is logged in
};

export default Protected;
