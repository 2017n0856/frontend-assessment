import React from "react";
import { Layout } from "antd";
import { useFavorite } from "../context/FavoriteContext";
import { Link } from "react-router-dom";

const layoutStyle = {
  // borderRadius: 8,
  // overflow: "hidden",
  // width: "calc(50% - 8px)",
  // maxWidth: "calc(50% - 8px)",
};

const contentStyle = {
  // textAlign: "center",
  // minHeight: 120,
  // lineHeight: "120px",
  // color: "#fff",
  // backgroundColor: "#0958d9",
};

const { Sider, Content } = Layout;

function AppLayout({ children }) {
  const { favorites } = useFavorite();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {" "}
      <Sider
        width="25%"
        style={{
          backgroundColor: "#fff",
          borderRight: "2px solid #dedede",
          padding: "20px",
        }}
      >
        Favorite Projects
        <ul>
          {favorites.map((fav) => (
            <li>
              <Link to={`/project/${fav.id}`}>{fav.name}</Link>
            </li>
          ))}
        </ul>
      </Sider>
      <Content style={{ padding: "20px" }}>{children}</Content>
    </Layout>
  );
}

export default AppLayout;
