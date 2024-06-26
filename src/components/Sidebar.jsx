import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

    const { auth } = useAuth();
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
        <p className="text-xl font-bold">Hola {auth.name}</p>

        <Link
            to="create-project"
            className="bg-sky-600 w-full p-2 text-white uppercase font-bold block mt-5 text-center rounded-md"
        >
            Nuevo proyecto
        </Link>
    </aside>
  )
}

export default Sidebar
