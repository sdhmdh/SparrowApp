import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import sparrowLogo from "../assets/sparrow.svg";
import { loginUser } from "../service/Httpcalls";
import "../styles/components/login.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("sparrow@gmail.com");
  const [password, setPassword] = useState<string>("hellosparrow");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password);
      if (result && result.status === 200) {
        // storing authorization token and user data in local storage for persistence
        localStorage.setItem("authToken", result.data?.token);
        localStorage.setItem("user", JSON.stringify(result.data?.user));

        // updating user information to redux
        dispatch(setUser(result.data?.user));

        // finally navigating user to Dashboard page
        navigate("/dashboard");
      }
    } catch (err: any) {
      if (err && err?.message) setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <img className="logo" src={sparrowLogo} alt="Sparrow Logo" />
      <form className="login-form" onSubmit={onLogin} style={{ padding: 20 }}>
        <div>
          <input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Enter password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export { Login };
