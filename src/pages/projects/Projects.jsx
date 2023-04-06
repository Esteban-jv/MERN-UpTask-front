import { useEffect } from "react";
import useProjects from "../../hooks/useProjects";
import PreviewProject from "./PreviewProject";
import Alert from "../../components/Alert";

let socket;

const Projects = () => {

    const { projects, alert } = useProjects();
    const { msg } = alert;

    return (
        <>
            
            <h1 className="text-4xl font-black">Proyectos</h1>
            { msg && <Alert alert={alert} />}
            <div className="bg-white shadow mt-10 rounded-lg">
                { projects.length ? projects.map(project => (
                    <PreviewProject
                        key={project.id}
                        project={project}
                    />
                )) : <p className="mt-1 text-center text-gray-600 uppercase p-5">No hay proyectos</p>}
            </div>
        </>
    )
}

export default Projects