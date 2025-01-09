const API_RESPONSE_DELAY = 500;
const mockProjects = [
  {
    id: "project_a",
    name: "Project A",
    description: "This is project A",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
    isFavorite: true,
  },
  {
    id: "project_b",
    name: "Project B",
    description: "This is project B",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
    isFavorite: true,
  },
  {
    id: "project_c",
    name: "Project C",
    description: "This is project C",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
    isFavorite: true,
  },
  {
    id: "project_d",
    name: "Project D",
    description: "This is project D",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    id: "project_e",
    name: "Project E",
    description: "This is project E",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    id: "project_f",
    name: "Project F",
    description: "This is project F",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    id: "project_g",
    name: "Project G",
    description: "This is project G",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
];

export const fetchProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects), API_RESPONSE_DELAY);
  });
};

export const fetchFavoriteProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const favoriteProjects = mockProjects.filter(
        (project) => project.isFavorite
      );
      resolve(favoriteProjects);
    }, API_RESPONSE_DELAY);
  });
};

export const fetchProject = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const project = mockProjects.find((p) => p.id === id);
      if (project) {
        resolve(project);
      } else {
        reject(new Error("Project not found"));
      }
    }, API_RESPONSE_DELAY);
  });
};

export const updateProject = (updatedProject) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockProjects.findIndex((p) => p.id === updatedProject.id);
      if (index !== -1) {
        mockProjects[index] = updatedProject;
      }
      resolve(updatedProject);
    }, API_RESPONSE_DELAY);
  });
};
