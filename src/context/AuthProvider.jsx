import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [load, setLoad] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token');

            if(!token){
                setLoad(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
            
            try {
                const { data } = await axiosClient('/users/profile', config)
                setAuth(data.user)

                //navigate('/projects')
            } catch (error) {
                setAuth({})
            } finally {
                setLoad(false)
            }

        }
        authenticateUser();
    }, [])

    const closeSessionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                load,

                setAuth,
                closeSessionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;