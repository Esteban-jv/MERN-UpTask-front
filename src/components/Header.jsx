import { Link } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import useAuth from "../hooks/useAuth";
import Search from "./Search";

const Header = () => {

  const { handleSearcher, closeSession } = useProjects();
  const { closeSessionAuth } = useAuth();

  const handleCloseSession = () => {
    closeSessionAuth();
    closeSession();
    localStorage.removeItem('token')
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-3xl text-sky-600 font-black text-center mb-5 md:mb-0">
            UpTask
        </h2>

        {/*
        <input
            type="search"
            placeholder="Buscar proyecto"
            className="rounded-lg lg:w-96 p-2 border"
        />
        */}

        <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              type="button"
              className="font-bold uppercase"
              onClick={handleSearcher}
            >
              Buscar proyecto
            </button>
            <Link to="/projects" className="font-bold uppercase">Proyectos</Link>

            <button
                type="button"
                className="text-white text-sm bg-sky-600 p-2 rounded-md uppercase font-bold"
                onClick={handleCloseSession}
            >
                Cerrar sesión
            </button>

            <Search />
        </div>
      </div>
    </header>
  )
}

export default Header
