import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PreviewProject = ({project}) => {

  //Nota: Los hooks van antes siempre
  const { auth } = useAuth();
  const { name, id, client, creator } = project;
  return (
    <div className="flex flex-col md:flex-row border-b p-5 justify-between">
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {name}
          <span className="text-sm text-gray-500 uppercase">{' '} {client}</span>
        </p>

        { auth.id !== creator && (
          <p
            className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold"
          >Colaborador</p>
        )}
      </div>
      

      <Link
        to={`${id}`}
        className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
      >ver proyecto</Link>
    </div>
  )
}

export default PreviewProject
