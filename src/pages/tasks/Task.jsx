import { dateFormat } from "../../helpers/DateFormat";
import useProjects from "../../hooks/useProjects";
import useAdmin from "../../hooks/useAdmin";

const Task = ({task}) => {

    const { handleEditTaskModal, handleDeleteTaskModal, completeTask } = useProjects();
    const admin = useAdmin();

    const { description, name, priority, due_date, status, id } = task;
  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div className="flex flex-col items-s">
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-gray-600">Prioridad: {priority}</p>
        <p className="mb-1 text-sm">{dateFormat(due_date)}</p>
        { status && <p className="text-xs bg-green-600 p-1 rounded-lg text-white">Completada por: {task.completed.name}</p>}
      </div>
      <div className='flex flex-col lg:flex-row gap-2'>
        { admin && (
          <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
              onClick={() => handleEditTaskModal(task) }
          >
              Editar
          </button>
          ) }

        <button
          className={`${status ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completeTask(id)}
        >
            { status ? 'Completa' : 'Incompleta' }
        </button>

        { admin && (
          <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={ () => handleDeleteTaskModal(task) }
          >
              Eliminar
          </button>
        ) }
        
      </div>
    </div>
  )
}

export default Task
