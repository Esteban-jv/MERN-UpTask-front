import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

import Alert from '../components/Alert';
const Register = () => {

    const [ name, setName ] = useState('')
    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repeatPassowrd, setRepeatPassowrd ] = useState('')

    const [ alert, setAlert ] = useState({})

    function resetForm() {
        setName('')
        setPassword('')
        setEmail('')
        setRepeatPassowrd('')
    }

    const handleSubmit = async e => {
        setAlert('')
        e.preventDefault();

        if([name, email, password, repeatPassowrd].includes(''))
        {
            setAlert({
                msg: "Todos los datos son obligatorios",
                error: true
            })
            return;
        }

        if(password != repeatPassowrd)
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
            const response = await axiosClient.post('/users', {
                name,
                password,
                email
            })

            if(response.data.id)
            {
                setAlert({
                    error: false,
                    msg: 'Usuario creado correctamente, por favor verifica tu correo'
                }) 
            }

            resetForm()
        } catch (error) {
            setAlert({
                error: true,
                msg: error.response.data.msg
            })
        }
    }

    const { msg } = alert;
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus 
            <span className="text-slate-700"> proyectos</span></h1>

            { msg && <Alert alert={alert}/>}

            <form className="my-10 bg-white shadow p-10 px-10 rounded-lg"
                onSubmit={handleSubmit}
            >
                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold mt-3"
                        htmlFor="Nombre"
                    >Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
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
                <div>
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold mt-3"
                        htmlFor="Password2"
                    >Repetir password</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="Repetir contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repeatPassowrd}
                        onChange={e => setRepeatPassowrd(e.target.value)} />
                </div>

                <input
                    type="submit"
                    value="Crear cuenta"
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
                    to="/forgot-password"
                >Olvidé mi contraseña</Link>
            </nav>
        </>
    )
}

export default Register;