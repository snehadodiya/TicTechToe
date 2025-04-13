import React, { useState } from "react";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isButtonDisabled = !email || !password || loading;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
  
    try {
      const res = await API.post("/login", { email, password });
  
      // ✅ Store token & user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
  
      console.log("Login Success:", res.data);
      navigate("/homepage"); // after login redirect
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight={600} mb={4} color="#0A65CC">
        WELCOME BACK!
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          placeholder="john@gmail.com"
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
          placeholder="Password"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={handleToggleShowPassword}
              color="primary"
            />
          }
          label="Show Password"
          style={{ marginTop: "8px" }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isButtonDisabled}
          sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>

        {errorMessage && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#0A65CC", fontWeight: 600 }}>
          Create account
        </Link>
      </Typography>
    </div>
  );
};

export default Login;