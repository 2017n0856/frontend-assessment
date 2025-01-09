import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Button, message, Spin } from "antd";
import moment from "moment";
import { fetchProject, updateProject } from "../api/projectApi";
import { useFavorite } from "../context/FavoriteContext";
import styled from "styled-components";

const { TextArea } = Input;

const StyledForm = styled(Form)`
  && {
    max-width: 70%;
  }
`;

function ProjectDetail() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { updateFavorites } = useFavorite();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  useEffect(() => {
    fetchProject(id)
      .then((project) => {
        form.setFieldsValue({
          ...project,
          startDate: moment(project.startDate),
          endDate: moment(project.endDate),
        });
        setLoading(false);
        setProject(project);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setLoading(false);
        message.error("Failed to load project details");
      });
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      const updatedProject = {
        ...values,
        id,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
      };
      await updateProject(updatedProject);
      updateFavorites(updatedProject);
      message.success("Project updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating project:", error);
      message.error("Failed to update project");
    }
  };

  if (loading) {
    return <Spin />;
  } else {
    return (
      <StyledForm
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        colon={false}
        labelAlign="left"
        labelCol={{ flex: "10%" }}
        labelWrap
      >
        <Form.Item name="id" label="Project ID">
          {project.name}
        </Form.Item>
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            { required: true, message: "Please input the project name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Project Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: "Please select the start date!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: "Please select the end date!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="projectManager"
          label="Project Manager"
          rules={[
            { required: true, message: "Please input the project manager!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </StyledForm>
    );
  }
}

export default ProjectDetail;
