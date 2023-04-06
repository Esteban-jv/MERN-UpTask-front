import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";


const ConfirmAccount = () => {

    const [alert, setAlert] = useState({});
    const [confirmedAccount, setConfirmedAccount] = useState(false);

    const params = useParams();
    const { token_id } = params;

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `/users/confirm/${token_id}`
                const { data } = await axiosClient(url);

                setAlert({
                    error: false,
                    msg: data.msg
                })

                setConfirmedAccount(true);
            } catch (error) {
                setAlert({
                    error: true,
                    msg: error.response.data.msg
                })
            }
        }

        return () => { confirmAccount() };
    }, []);

    const { msg } = alert;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta y comienza a administrar tus 
            <span className="text-slate-700"> proyectos</span></h1>

            <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
                { msg && <Alert alert={alert}/>}

                { confirmedAccount && <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/"
                >Inicia sesión</Link>}
            </div>
        </>
    )
}

export default ConfirmAccount;