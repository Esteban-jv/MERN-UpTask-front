import { useState } from 'react';
import { Link } from 'react-router-dom'
import Alert from '../components/Alert';
import axiosClient from '../config/axiosClient';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});

    const handleSumbit = async e => {
        setAlert({});
        e.preventDefault();

        if(email == '' || email.length < 6) {
            setAlert({
                error: true,
                msg: 'El email es obligatorio'
            });
            return;
        }

        try {
            const { data } = await axiosClient.post('/users/forgot-password', {
                email
            })
            setAlert({
                error: false,
                msg: data.msg
            });
        } catch (error) {
            setAlert({
                error: true,
                msg: error.response.data.msg
            });
        }
    }

    const { msg } = alert;
    
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu acceso y administra tus 
            <span className="text-slate-700"> proyectos</span></h1>

            { msg && <Alert alert={alert} /> }
            <form className="my-10 bg-white shadow p-10 px-10" onSubmit={handleSumbit}>
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
                        onChange={ e => setEmail(e.target.value) } />
                </div>

                <input
                    type="submit"
                    value="Enviar instrucciones"
                    className="bg-sky-700 w-full py-3 mt-3 mb-5 text-white uppercase font-bold rounded hover:cursos-pointer
                        hover:bg-sky-800 transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/"
                >Ya tienes una cuenta? Inicia sesión</Link>
                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="register"
                >¿No tienes una cuenta? Regístrate</Link>
            </nav>
        </>
    )
}

export default ForgotPassword;