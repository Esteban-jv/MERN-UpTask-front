import { useState } from "react"
import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";

const ColaboratorForm = () => {

    const [email, setEmail] = useState('');
    const { showAlert, alert, submitCollaboratorEmail } = useProjects();

    const handleSubmit = e => {
        e.preventDefault();

        if(email === '') {
            showAlert({
                error: true,
                msg:"Es necesario un email"
            });
            return
        }

        submitCollaboratorEmail(email);
    }

    const { msg } = alert;
  return (
        <form className="bg-white py-10 px-5 w-full shadow rounded-lg" onSubmit={handleSubmit}>
            { msg && <Alert alert={alert} />}
            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">
                    Email del colaborador
                </label>
                <input
                    type="email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    id="email"
                    placeholder="Email de usuario"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <input
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
                value="Buscar"
            />
        </form>
  )
}

export default ColaboratorForm
