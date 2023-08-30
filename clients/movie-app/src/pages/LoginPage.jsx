import React from 'react'
import {
    Link,
    useNavigate,
    useLocation
} from 'react-router-dom';
import imgLandingPage from '../assets/netflixIMG.jpg'
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth  from '../useAuth'

export default function LoginPage() {
const navigate = useNavigate();
const { login } = useAuth();
const { state } = useLocation();
const {
    register,
    handleSubmit,
    formState: { errors }
} = useForm()
const BASE_URL = 'http://localhost:4000'

async function handleLogin(user) {
    await axios({
        method: 'POST',
        url: `${BASE_URL}/login`,
        data: {
            username: user.username,
            password: user.password
        }
    })
    .then((res) => {
        localStorage.setItem('access_token', res.data.accessToken)
        localStorage.setItem('username', res.data.username)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
          })
    
          Toast.fire({
              icon: 'success',
              title: 'sucessfully logged in',
          })
          login().then(() => {
            navigate(state?.path || "/home")
        })
    })
    .catch((err) => {
    console.log(err);
    Swal.fire({
        icon: 'error',
        title: err.message,
    })
    })
}

  return (
    <section className="flex flex-col md:flex-row h-screen">
            <div className=" hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <div className=' w-full h-full object-cover' style={{ backgroundImage: `url(${imgLandingPage})` }}>
                    <div className=' w-full h-full bg-gray-900 bg-opacity-75'>
                        <h1 className='flex flex-row justify-start py-4 px-6 text-5xl text-white font-bold'>LK21ASLI</h1>
                        <h4 className=' h-4/6 flex flex-col justify-center items-center font-bold text-4xl text-white'>
                          <typewritten-text repeat>
                            "Watch Your movie favorite"
                          </typewritten-text>
                        </h4>
                    </div>
                </div>
            </div>

            <h1 className='lg:hidden px-5 py-2 text-4xl sm:text-3xl md:text-5xl text-[#e50914]'>LK21ASLI</h1>

            <div
                className="bg-white w-full md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center"
            >              
                <div className="w-full h-100">
                    <h1 className=" text-3xl lg:text-4xl text-center md:text-2xl font-bold leading-tight">
                        Sign in
                    </h1>
                    

                    <form
                        className="mt-12"
                        action="#"
                        method="POST"
                        onSubmit={handleSubmit(handleLogin)}
                    >
                        <div>
                          <label className="block text-gray-700 mt-4">Username</label>
                          <input
                            type="text" 
                            { ...register("username", { required: true }) }
                            name="username" 
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                          />
                            {errors.username && <p className=' text-xs text-red-600 mt-1'>This field is required</p>}
                        </div>

                        <div className="mt-4">
                          <label className="block text-gray-700">Password</label>
                          <input
                            type="password" 
                            name="password" 
                            { ...register("password", { required: true }) }
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            />
                            {errors.password && <p className=' text-xs text-red-600 mt-1'>This field is required</p>}
                        </div>

                        <button
                          type="submit"
                          className="
                          w-full block bg-[#e50914] hover:bg-red-800 text-white font-semibold rounded-lg
                          px-4 py-3 mt-6"
                        >
                          Login
                        </button>
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />
                    <p className="mt-8">don't have an account?</p>
                    
                    <Link to='/register'>
                        <p className="mt-2 text-blue-400 hover:text-blue-600 cursor-pointer">
                            Sign up
                        </p>
                    </Link>
                
                    <Link to='/'>
                    <p className="mt-10 text-gray-400 hover:text-gray-600 cursor-pointer">
                        Back to Landing Page
                    </p>
                    </Link>
                    
                </div>
            </div>
        </section>
  )
}