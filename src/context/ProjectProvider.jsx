import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';

let socket;

const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(false);
    const [taskFormModal, setTaskFormModal] = useState(false);
    const [deleteTaskModal, setDeleteTaskModal] = useState(false);
    const [deleteCollaboratorModal, setDeleteCollaboratorModal] = useState(false);
    const [searcher, setSearcher] = useState(false);
    const [collaborator, setCollaborator] = useState({});

    const navigate = useNavigate();
    // el auth es para que cuando iniciemos sesión se actualice el useEffect que trae proyectos
    // de tal manera que se vuela a ejecutar ese useEffect y cargue los proyectos
    const { auth } = useAuth();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                //console.warn("asdas", token)
                if(!token) return
                
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('projects',config);

                setProjects(data);
            } catch (error) {
                console.error(error)
            }
        }
        getProjects();
    }, [auth]);

    useEffect( () => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, []);

    const showAlert = alert => {
        setAlert(alert);

        setTimeout(() => {
            setAlert({})
        }, 5000)
    }

    const submitProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            if(project.id)
            {
                const { data } = await axiosClient.put(`projects/${project.id}`,project,config);
                console.log(data, projects)
                
                // Sincronizar poryectos
                const projectsUpdated = projects.map(projectState => projectState.id === data.id ? data : projectState);
                //console.log(projectsUpdated);
                setProjects(projectsUpdated);
    
                setAlert({
                    error: false,
                    msg: "Proyecto actualizado correctamente"
                })
            } else {
                const { data } = await axiosClient.post('projects',project,config);
                setProjects([...projects, data])

                setAlert({
                    error: false,
                    msg: "Proyecto creado correctamente"
                })
            }
            

            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 3000)
        } catch (error) {
            
        }
    }

    const getProject = async id => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            //console.warn("asdas", token)
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient(`projects/${id}`,config);
            
            setProject(data);

        } catch (error) {
            setAlert({
                error: true,
                msg: error.response.data.msg
            })
            navigate('/projects')
            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 3000)
        } finally {
            setLoading(false);
            setTimeout(() => {
                setAlert({});
            },3000);
        }
    }

    const deleteProject = async id => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`projects/${id}`,config);

            // Sincronizar poryectos
            const projectsUpdated = projects.filter(projectState => projectState.id != id);
            //console.log(projectsUpdated);
            setProjects(projectsUpdated);
            //console.log(data);
            setAlert({
                error: false,
                msg: data.msg
            })

            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 2000)

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleTaskModal = () => {
        setTask({});
        setTaskFormModal(!taskFormModal);
    }

    const handleSearcher = () => {
        setSearcher(!searcher);
    }

    const submitTask = async task => {
        //setLoading(true)
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            task.due_date = task.dueDate;

            if(task?.id)
            {
                const { data } = await axiosClient.put(`tasks/${task.id}`,task,config);

                // Socket IO
                socket.emit('edit_task', data)
            } else {
                const { data } = await axiosClient.post('tasks/',task,config);

                // Socket IO
                socket.emit('new_task', data)
            }
            

            
            setAlert({
                error:false,
                msg:task.id ? 'Datos guardados' : 'Tarea agregada correctamente'
            })
            setTaskFormModal(false)
            setTimeout(() => {
                setAlert({});
            },3000);

        } catch (error) {
            console.error(error);
        }
    }

    const handleEditTaskModal = task => {
        setAlert({})
        setTask(task)
        setTaskFormModal(true);
    }

    const handleDeleteTaskModal = task => {
        setTask(task);
        setDeleteTaskModal(!deleteTaskModal);
    }

    const handleDeleteCollaboratorModal = collaborator => {
        setCollaborator(collaborator);
        setDeleteCollaboratorModal(!deleteCollaboratorModal);
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`tasks/${task.id}`,config);
            setAlert({
                error:false,
                msg:data.msg
            })

            setDeleteTaskModal(false)

            // Socket IO
            socket.emit('delete_task', task)
            setTask({})
            setTimeout(() => {
                setAlert({});
            },3000);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`projects/delete-collaborator/${project.id}`,{id: collaborator.id},config);
            setAlert({
                error:false,
                msg:data.msg
            })

            const collaboratorsUpdated = project.collaborators.filter(collState => collState.id != collaborator.id);
            const storedProject = { ...project }
            storedProject.collaborators = collaboratorsUpdated;
            

            setProject(storedProject);
            setDeleteCollaboratorModal(false)
            setTask({})
            setTimeout(() => {
                setAlert({});
            },3000);

        } catch (error) {
            console.error(error);
        }
    }

    const submitCollaboratorEmail = async email => {
        setAlert({})
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post('/projects/collaborators', {email}, config);
            setCollaborator(data);
        } catch (error) {
            setCollaborator({})
            setAlert({
                error: true,
                msg: error.response.data.msg
            })
        } finally {
            setLoading(false);
        }
    }

    const addCollaborator = async email => {
        
        try {
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/projects/collaborators/${project.id}`, email, config);
            
            setAlert({
                error: false,
                msg: data.msg
            })

            setCollaborator({})
            setTimeout(() => {
                setAlert({});
            },3000);
        } catch (error) {
            setCollaborator({})
            setAlert({
                error: true,
                msg: error.response.data.msg
            })
        }
    }

    const completeTask = async id => {

        try {
            const token = localStorage.getItem('token');
            if(!token) return
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post(`/tasks/status/${id}`,{}, config);
            
            setAlert({
                error: false,
                msg: 'Tarea actualizada correctamente'
            })

            setTask({});
            setTimeout(() => {
                setAlert({});
            },3000);
             // Socket IO
             socket.emit('toggle_status', data);
        } catch (error) {
           console.error(error);
            /*setAlert({
                error: true,
                msg: error.response.data.msg
            })*/
        }
    }

    /* Socket IO Methods */
    const sumbitProjectTask = async task => {
        // Add task to state
        const storedProject = { ...project }
        storedProject.tasks = [ ...storedProject.tasks, task ]
        setProject(storedProject);
    }

    const deleteProjectTask = async task => {
        // Add task to state
        const tasksUpdated = project.tasks.filter(taskState => taskState.id != task.id);
        const storedProject = { ...project }
        storedProject.tasks = tasksUpdated;
        setProject(storedProject);
    }

    const updateProjectTask = async task => {
        // Add task to state
        const storedProject = { ...project }
        storedProject.tasks = project.tasks.map(taskState => taskState.id === task.id ? task : taskState);
        setProject(storedProject);
    }

    const toggleProjectTask = async task => {
        // Add task to state
        const storedProject = { ...project }
        storedProject.tasks = project.tasks.map(taskState => taskState.id === task.id ? task : taskState);
        setProject(storedProject)
    }
    // End socket IO

    const closeSession = () => {
        setProjects(([]));
        setProject({})
        setAlert({})
    }

    return (
        <ProjectContext.Provider
            value={{
                projects,
                alert,
                project,
                loading,
                taskFormModal,
                deleteTaskModal,
                task,
                collaborator,
                deleteCollaboratorModal,
                searcher,

                showAlert,
                submitProject,
                getProject,
                setProject,
                deleteProject,
                handleTaskModal,
                submitTask,
                handleEditTaskModal,
                handleDeleteTaskModal,
                deleteTask,
                submitCollaboratorEmail,
                addCollaborator,
                handleDeleteCollaboratorModal,
                deleteCollaborator,
                completeTask,
                handleSearcher,
                sumbitProjectTask,
                deleteProjectTask,
                updateProjectTask,
                toggleProjectTask,
                closeSession
            }}
            >{children}
        </ProjectContext.Provider>
    )
}

export {
    ProjectProvider
}

export default ProjectContext;