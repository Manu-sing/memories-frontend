import React from "react";
import { Container } from "@mui/material";
// import memories from "./images/memories.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialisePosts } from "./reducers/postReducer";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const theme = createTheme();

  useEffect(() => {
    dispatch(initialisePosts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxwidth="lg">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />}></Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
