import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";

const NewPassword = () => {

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [validToken, setValidToken] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [alert, setAlert] = useState({});

    const params = useParams();
    const { token } = params;


    useEffect(() => {
        const verifyToken = async () => {
            setAlert({})
            try {
                await axiosClient.get(`/users/forgot-password/${token}`)
                
                setValidToken(true);
            } catch (error) {
                setAlert({
                    error: true,
                    msg: error.response.data.msg
                })
            }
        }
        verifyToken();
    }, []);

    const { msg } = alert;
    const handleSubmit = async e =>  {
        setAlert({})
        e.preventDefault();

        if(password != password2)
        {
            setAlert({
                msg: "Los contraseñas no coinciden",
                error: true
            })
            return;
        }
        if(password.length < 6)
        {
            setAlert({
                msg: "La contraseña debe tener al menos 6 caracteres",
                error: true
            })
            return;
        }

        try {
            const url = `/users/forgot-password/${token}`;
            const { data } = await axiosClient.post(url, { password })

            setAlert({
                error: false,
                msg: data.msg
            })
            setPasswordChanged(true)
        } catch (error) {
            setAlert({
                error: true,
                msg: error.response.data.msg
            })
        }
    };

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu contraseña y no pierdas acceso a tus 
            <span className="text-slate-700"> proyectos</span></h1>

            { msg && <Alert alert={alert} />}

            { validToken && (
                <form className="my-10 bg-white shadow p-10 px-10 rounded-lg" onSubmit={handleSubmit}>
                    <div>
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold mt-3"
                            htmlFor="Password"
                        >Nueva contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nueva contraseña"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold mt-3"
                            htmlFor="Password2"
                        >Repetir contraseña</label>
                        <input
                            id="password2"
                            type="password"
                            placeholder="Repetir contraseña"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password2}
                            onChange={e => setPassword2(e.target.value)} />
                    </div>

                    <input
                        type="submit"
                        value="Guardar nueva contraseña"
                        className="bg-sky-700 w-full py-3 mt-3 mb-5 text-white uppercase font-bold rounded hover:cursos-pointer
                            hover:bg-sky-800 transition-colors"
                    />
                </form>
            )}

            { passwordChanged && (
                <Link
                    className='block text-center my-5 text-slate-500 text-sm uppercase'
                    to="/"
                >Inicia sesión</Link>
            ) }
        </>
    )
}

export default NewPassword;