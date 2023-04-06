import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import useAdmin from '../../hooks/useAdmin';
import useProjects from '../../hooks/useProjects';
import TaskFormModal from '../../components/TaskFormModal';
import DeleteTaskModal from '../../components/DeleteTaskModal';
import DeleteCollaboratorModal from '../../components/DeleteCollaboratorModal';
import Task from '../tasks/Task';
import Collaborator from '../../components/Collaborator';
import io from 'socket.io-client';

let socket;
const Project = () => {
    const params = useParams();  
    const { getProject, project, loading, handleTaskModal, sumbitProjectTask, deleteProjectTask, updateProjectTask, toggleProjectTask } = useProjects();
    
    const admin = useAdmin();

    useEffect( () => {
        getProject(params.id);
    }, []);
    
    useEffect( () => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('open_project',params.id)
    }, []);

    //Cuando un useEffect no tiene dependencias (el []) significa que va a estar ejecutandose todo el tiempo
    useEffect( () => {

      socket.on('task_added', (newTask) => {

        if(newTask.project === project.id) {
          sumbitProjectTask(newTask)
        }
      })

      socket.on('task_deleted', (newTask) => {

        if(newTask.project === project.id) {
          deleteProjectTask(newTask)
        }
      })

      socket.on('task_updated', (newTask) => {

        if(newTask.project.id === project.id) {
          updateProjectTask(newTask)
        }
      })

      socket.on('new_status', (newTask) => {

        if(newTask.project.id === project.id) {
          toggleProjectTask(newTask)
        }
      })

    });

    const { name } = project;
    
    if(loading)
        return 'cargando . . .'

  return (
        <>
        { admin && (
          <>
          <div className='flex justify-between'>
            <h1 className='font-black text-4xl'>{name}</h1>

            <div className="flex item-center gap-2 text-gray-500 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <Link
                to={`/projects/edit/${params.id}`}
                className='uppercase font-bold'
              >
              <span>Editar</span>
            </Link>
            </div>
        </div>

         <button
          onClick={ handleTaskModal }
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          Nueva tarea
        </button>
        </>
        )}

        <p className="font-bold text-xl mt-10">Tareas del proyecto</p>

{/*
        <div className="flex justify-center">
          <div className="w-full md:w-1/3 lg:w-1/4">
            { msg && <Alert alert={alert} />}
          </div>
        </div>
        */}
        <div className="bg-white shadow mt-5 rounded-lg">
          { project.tasks?.length ? 
              project.tasks?.map( task => (
                <Task
                  key={task.id}
                  task={task}
                />
              ))
            : 
              <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>
          }
        </div>

        { admin && (
          <>
            <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl mt-10">Colaboradores</p>
            <Link
              to={`/projects/new-colaborator/${project.id}`}
              className='text-gray-400 hover:text-black uppercase font-bold'
              >Añadir</Link>
          </div>
          <div className="bg-white shadow mt-5 rounded-lg">
          { project.collaborators?.length ? 
              project.collaborators?.map( collaborator => (
                <Collaborator
                  key={collaborator.id}
                  collaborator={collaborator}
                />
              ))
            : 
              <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>
          }
        </div>
          </>
        ) }

        <TaskFormModal />
        <DeleteTaskModal />
        <DeleteCollaboratorModal />
      </>
    )
}

export default Project
