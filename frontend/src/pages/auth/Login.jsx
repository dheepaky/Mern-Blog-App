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
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../baseurl/BaseUrl";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newData) => {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, newData, {
        withCredentials: true,
      });
      return res.data;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message || "Login failed!"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setTimeout(() => {
        toast.success("Welcome Back!");
        navigate("/");
      }, 200);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <Paper
        elevation={6}
        className="w-full max-w-md rounded-2xl"
        sx={{
          padding: { xs: 4, sm: 6 },

          backgroundColor: "#ffffff",
        }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Welcome Back !
        </Typography>
        <Typography
          variant="body1"
          align="center"
          mb={4}
          color="text.secondary">
          Please sign in to your account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-9 space-y-6 text-amber-800">
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
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            variant="contained"
            color="primary"
            fullWidth
            size="medium"
            sx={{ textTransform: "uppercase", borderRadius: 3 }}>
            {isPending ? "Sign In.." : "Sign In"}
          </Button>
        </Box>

        {/* {isError && <p className="text-red-600 mt-2">Error!</p>}
        {isSuccess && <p className="text-green-600 mt-2">Saved!</p>} */}

        <Typography variant="body2" align="center" mt={4}>
          Don’t have an account?{" "}
          <Link to="/signup" className="hover:underline text-blue-600">
            Create one
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}
