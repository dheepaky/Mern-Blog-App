import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../baseurl/BaseUrl";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newData) => {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, newData, {
        withCredentials: true,
      });
      return res.data;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Register failed!"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setTimeout(() => {
        toast.success("Welcome to Blogs!");
        navigate("/");
      }, 200);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ userName, email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen pageout bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <Paper
        elevation={6}
        className="w-full max-w-md rounded-2xl"
        sx={{ padding: { xs: 4, sm: 6 }, backgroundColor: "#ffffff" }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Create Account !
        </Typography>
        <Typography
          variant="body1"
          align="center"
          mb={4}
          color="text.secondary">
          Sign up to get started
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 space-y-6">
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                transition: "padding 0.3s ease, border-color 0.3s ease",
                "&.Mui-focused": {
                  paddingLeft: "2rem",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "1rem", // rounded-md
                  borderColor: "#269091",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.875rem",
                color: "#269091",
              },
              "& .MuiInputBase-input": {
                color: "#2b4e75", // <--- Text color here
              },
            }}
            fullWidth
            label="UserName"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            variant="outlined"
          />

          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                transition: "padding 0.3s ease, border-color 0.3s ease",
                "&.Mui-focused": {
                  paddingLeft: "2rem",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "1rem", // rounded-md
                  borderColor: "#269091",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.875rem",
                color: "#269091",
              },
              "& .MuiInputBase-input": {
                color: "#2b4e75", // <--- Text color here
              },
            }}
            fullWidth
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />

          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                transition: "padding 0.3s ease, border-color 0.3s ease",
                "&.Mui-focused": {
                  paddingLeft: "2rem",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "1rem", // rounded-md
                  borderColor: "#269091",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.875rem",
                color: "#269091",
              },
              "& .MuiInputBase-input": {
                color: "#2b4e75", // <--- Text color here
              },
            }}
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ textTransform: "uppercase", borderRadius: 3 }}>
            {isPending ? " Sign Up..." : "Sign Up"}
          </Button>
        </Box>

        <Typography variant="body2" align="center" mt={4}>
          Already have an account?{" "}
          <Link to="/login" className="hover:underline text-blue-600">
            Login
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}
