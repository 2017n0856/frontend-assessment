import React, { useState, useEffect } from "react";
import { Table, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { fetchProjects } from "../api/projectApi";
import styled from "styled-components";
import { colors } from "../Utils/constants";

const StyledButton = styled(Button)`
  && {
    border-radius: 1px;
    padding-right: 25px;
    padding-left: 25px;
  }
`;

const StyledTable = styled(Table)`
  && {
    .ant-table table {
      border-spacing: 0 3px;
    }
    .ant-table-thead > tr > th {
      background-color: ${colors.primaryGray};
      ::before {
        width: 0;
      }
    }

    .ant-table-tbody > tr > td {
      background-color: ${colors.secondaryGray};
    }
  }
`;

const columns = [
  {
    title: "Project ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Project Manager",
    dataIndex: "projectManager",
    key: "projectManager",
  },
  {
    key: "action",
    render: (_, record) => (
      <Link to={`/project/${record.id}`}>
        <StyledButton type="primary">Edit</StyledButton>
      </Link>
    ),
  },
];

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spin />;
  } else {
    return (
      <StyledTable
        columns={columns}
        dataSource={projects}
        rowKey="id"
        pagination={false}
      />
    );
  }
}

export default ProjectList;
