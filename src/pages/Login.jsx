import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSumbit = async e => {
        e.preventDefault();
        setAlert({})

        if([email, password].includes('')) {
            setAlert({
                error:true,
                msg:'Todos los campos son requeridos'
            });
            return
        }

        try {
            const { data } = await axiosClient.post('/users/login', {
                email, password
            })
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/projects')
        } catch (error) {
            console.error(error)
            setAlert({
                error: true,
                msg: error.response.data.msg
            });
        }
    }

    const { msg } = alert;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus 
            <span className="text-slate-700"> proyectos</span></h1>

            { msg && <Alert alert={alert} />}
            <form className="my-10 bg-white shadow p-10 px-10 rounded-lg" onSubmit={handleSumbit}>
                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold mt-3"
                        htmlFor="Email"
                    >Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold mt-3"
                        htmlFor="Password"
                    >Passord</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-sky-700 w-full py-3 mt-3 mb-5 text-white uppercase font-bold rounded hover:cursos-pointer
                        hover:bg-sky-800 transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="register"
                >¿No tienes una cuenta? Regístrate</Link>
                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/forgot-password"
                >Olvidé mi contraseña</Link>
            </nav>

            {/*
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-3">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-3"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                    </div>
                </div>
            </div>
             */}
        </>
    )
}

export default Login;