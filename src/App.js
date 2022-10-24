import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Navbar from "./components/Navbar/Navbar";
import RouteList from "./RouteList";
import { DataProvider } from "./contexts/data";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import { useLoginContext } from "./contexts/auth";

const App = () => {
  const { isLoggedIn } = useLoginContext();

  return (
    <div>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <DataProvider>
          <Layout style={{ height: "100vh" }}>
            <Header style={{padding:"0", backgroundColor: "#eeeeee" }}>
              <Navbar />
            </Header>
            <Content style={{ height: "100%", backgroundColor: " #87a2fb93" }}>
              <RouteList />
            </Content>
          </Layout>
        </DataProvider>
      )}
    </div>
  );
};

export default App;
