import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import ProtectedRoutes from "./auth/components/ProtectedRoutes";
import Login from "./auth/components/Login";
import Feed from "./components/layout/Feed";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: '"Open Sans", sans-serif',
    },
  });

  return (
   <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/" element={<Feed />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
    <ToastContainer/>
   </>
  );
}

export default App;
