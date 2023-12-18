import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      tasks={projectsState.tasks}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
    );
  }

  console.log(projectsState);

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelect={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        id: Math.random(),
        title: projectData.title,
        description: projectData.description,
        dueDate: projectData.dueDate,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const newTask = {
        id: Math.random(),
        text: text,
      };

      return {
        ...prevState,
        selectedProjectId: prevState.selectedProjectId,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: prevState.selectedProjectId,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }
}

export default App;
