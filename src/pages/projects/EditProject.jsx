import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../../hooks/useProjects"
import ProjectForm from "./ProjectForm";

const EditProject = () => {

    const params = useParams();
    
    const { getProject, project, loading, deleteProject } = useProjects();

    useEffect( () => {
        getProject(params.id);
    }, []);

    const handleClick = () => {
        if(confirm('¿Deseas eliminar este proyecto?')) {
            deleteProject(project.id)
        } else {
            console.log(false)
        }
    }

    const { name, description, client } = project;

    if(loading)
        return 'cargando . . .'
    return (
        <>
            

            <div className='flex justify-between'>
                <h1 className="text-4xl font-black">Editar {name}</h1>

                <div className="flex item-center gap-2 text-gray-500 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                    <button
                        className='uppercase font-bold'
                        onClick={handleClick}
                    >Eliminar</button>
                </div>
            </div>

            <div className='mt-10 flex justify-center'>
                <ProjectForm />
            </div>
        </>
    )
}

export default EditProject
