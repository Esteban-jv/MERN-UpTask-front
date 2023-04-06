import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useProjects from '../../hooks/useProjects';
import Alert from '../../components/Alert';

const ProjectForm = () => {
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [client, setClient] = useState('');

    const params = useParams();

    const { showAlert, alert, submitProject, project } = useProjects();
    const { msg } = alert;

    useEffect(() => {
        if(params.id) {
            //editing
            setId(project.id)

            setName(project.name)
            setDescription(project.description)
            setDueDate(project.dueDate?.split('T')[0])
            setClient(project.client)
        } else  {
            //is new project
        }
    },[params]);

    const handleSubmit = async e => {
        e.preventDefault();
        showAlert({})

        if([name, description, dueDate, client].includes(''))
        {
            showAlert({
                error: true,
                msg: 'Todos los campos son obligatorios'
            })
            return
        }

        //pasar los datos hacia el provider
        await submitProject({
            id,
            name,
            description,
            dueDate,
            client
        })

        setId(null)
        setName('')
        setDescription('')
        setDueDate('')
        setClient('')
    }

  return (
    <form className='bg-white py-10 px-5 md:w-3/4 rounded-lg' onSubmit={handleSubmit}>
        { msg && <Alert alert={alert} />}
      <div className='mb-3'>
        <label 
            htmlFor="name" 
            className="text-gray-700 uppercase font-bold text-sm"
            >Nombre del proyecto
        </label>

        <input 
            type="text" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder='Nombre del proyecto'
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <label 
            htmlFor="description" 
            className="text-gray-700 uppercase font-bold text-sm"
            >Descripción del proyecto
        </label>

        <textarea
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder='Descripción del proyecto'
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
        <label 
            htmlFor="due-date" 
            className="text-gray-700 uppercase font-bold text-sm"
            >Fecha de entrega
        </label>

        <input 
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="due-date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
        />
        <label 
            htmlFor="client" 
            className="text-gray-700 uppercase font-bold text-sm"
            >Cliente del proyecto
        </label>

        <input 
            type="text" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder='Cliente del proyecto'
            id="client"
            value={client}
            onChange={e => setClient(e.target.value)}
        />

        <input
            type="submit"
            value={id ? 'Actualizar' : 'Crear'}
            className='bg-sky-600 mt-5 w-full p-3 uppercase font-bold text-white rounded cursos-pointer hover:bg-sky-700 transition-colors'
        />
      </div>
    </form>
  )
}

export default ProjectForm
