import React, { useState, useContext } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { userDataContext } from '../context/UserContext'
import Loading from '../component/Loading'
import { toast } from 'react-toastify'

function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { serverUrl } = useContext(authDataContext)
    const { getCurrentUser } = useContext(userDataContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const result = await axios.post(serverUrl + '/api/auth/login', { email, password }, { withCredentials: true })
            console.log(result.data)
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("User Login Successful")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("User Login Failed")
        }
    }

    const googlelogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            const user = response.user
            const name = user.displayName
            const email = user.email

            const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
            console.log(result.data)
            getCurrentUser()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-screen h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-[Poppins] flex flex-col items-center justify-start'>

            <div className='w-full h-[70px] flex items-center justify-start px-8 gap-3 cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-10' src={Logo} alt="logo" />
                <h1 className='text-2xl font-bold tracking-wide text-[#e94560]'>RangRiwaaz</h1>
            </div>

            <div className='w-full h-[80px] mt-2 flex flex-col items-center justify-center gap-1'>
                <span className='text-[28px] font-bold tracking-wider text-[#f5f5f5]'>Login Page</span>
                <span className='text-[18px] font-medium text-[#a8d8ea] italic'>Welcome to RangRiwaaz, Place your order</span>
            </div>

            <div className='max-w-[600px] w-[90%] h-[520px] mt-2 bg-[#ffffff12] border border-[#ffffff25] backdrop-blur-lg rounded-2xl shadow-2xl flex items-center justify-center'>
                <form onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-6'>

                    <div className='w-full h-[50px] bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.03] transition-all duration-200 shadow-lg' onClick={googlelogin}>
                        <img src={google} alt="google" className='w-5' />
                        <span className='font-semibold text-white'>Login with Google</span>
                    </div>

                    <div className='w-full flex items-center justify-center gap-2'>
                        <div className='w-[40%] h-[1px] bg-[#ffffff40]'></div> <span className='text-[#a8d8ea]'>OR</span> <div className='w-[40%] h-[1px] bg-[#ffffff40]'></div>
                    </div>

                    <div className='w-full flex flex-col items-center justify-center gap-4'>

                        <input
                            type="text"
                            className='w-full h-12 border border-[#ffffff35] bg-[#ffffff10] placeholder-[#a8d8ea] px-5 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#e94560] font-medium text-white'
                            placeholder='Email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <div className='w-full relative'>
                            <input
                                type={show ? "text" : "password"}
                                className='w-full h-12 border border-[#ffffff35] bg-[#ffffff10] placeholder-[#a8d8ea] px-5 pr-10 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#e94560] font-medium text-white'
                                placeholder='Password'
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div className='absolute top-3.5 right-3 cursor-pointer text-[#a8d8ea] hover:text-white'>
                                {show
                                    ? <IoEye size={20} onClick={() => setShow(prev => !prev)} />
                                    : <IoEyeOutline size={20} onClick={() => setShow(prev => !prev)} />
                                }
                            </div>
                        </div>

                        <button className='w-full h-12 bg-gradient-to-r from-[#e94560] to-[#f38ba8] rounded-lg flex items-center justify-center mt-2 text-[17px] font-semibold hover:scale-[1.02] transition-all shadow-lg'>
                            {loading ? <Loading /> : "Login"}
                        </button>

                        <p className='flex gap-1 text-sm font-light text-[#a8d8ea]'>
                            Don't have an account?
                            <span className='text-[#667eea] font-medium hover:underline cursor-pointer' onClick={() => navigate("/signup")}>Create New Account</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login