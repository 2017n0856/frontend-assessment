import React from "react";
import { Layout } from "antd";
import { useFavorite } from "../context/FavoriteContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../Utils/constants";

const { Sider, Content } = Layout;

const StyledSider = styled(Sider)`
  && {
    background-color: white;
    border-right: 5px solid ${colors.primaryGray};
    padding: 50px 10px 20px 10px;
  }
`;

const StyledContent = styled(Content)`
  && {
    padding: 50px 30px 10px 30px;
    background-color: white;
  }
`;

const StyledLink = styled(Link)`
  && {
    color: ${colors.text};
  }
`;

function AppLayout({ children }) {
  const { favorites } = useFavorite();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <StyledSider>
        Favorite Projects
        <ul>
          {favorites.map((fav) => (
            <li>
              <StyledLink to={`/project/${fav.id}`}>{fav.name}</StyledLink>
            </li>
          ))}
        </ul>
      </StyledSider>
      <StyledContent>{children}</StyledContent>
    </Layout>
  );
}

export default AppLayout;
