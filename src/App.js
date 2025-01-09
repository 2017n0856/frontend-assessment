import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import Layout from "./components/Layout";
import ProjectList from "./components/ProjectList";
import ProjectDetail from "./components/ProjectDetail";
import { FavoriteProvider } from "./context/FavoriteContext";
import theme from "./Utils/theme";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <FavoriteProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ProjectList />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </Layout>
        </Router>
      </FavoriteProvider>
    </ConfigProvider>
  );
}

export default App;
