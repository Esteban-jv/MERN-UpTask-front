import { useEffect } from "react"
import ColaboratorForm from "./ColaboratorForm"
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";

const NewColaborator = () => {

    const { getProject, project, loading, collaborator, addCollaborator, alert } = useProjects();
    const params = useParams();

    useEffect(() => {
        getProject(params.id);
    },[]);

    if(!project?.id) return <Alert alert={alert} />
  return loading ? 'Cargando . . .' : (
    <>
      <h1 className="text-4xl font-black">Añadir colaborador(a) a {project.name}</h1>
      <div className="mt-10 flex justify-center">
        <ColaboratorForm />
      </div>
      
      { loading ? 'Cargando . . .' : collaborator?.id && (
        <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 w-full rounded-lg shadow">
                <h2 className="text-center mb-10 text-2xl font-bold">
                    Resultado:
                </h2>

                <div className="flex justify-between items-center">
                    <p>{collaborator.name}</p>

                    <button 
                        type="button"
                        className="bg-slate-500 px-5 py-2 rounded-lg text-white text-sm uppercase font-bold"
                        onClick={() => addCollaborator({
                            email: collaborator.email
                        })}
                    >
                        Agregar al proyecto
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  )
}

export default NewColaborator
