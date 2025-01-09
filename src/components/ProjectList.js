import React, { useState, useEffect } from "react";
import { Table, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { fetchProjects } from "../api/projectApi";

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
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Link to={`/project/${record.id}`}>
        <Button type="primary">Edit</Button>
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
      <Table
        columns={columns}
        dataSource={projects}
        rowKey="id"
        pagination={false}
      />
    );
  }
}

export default ProjectList;
