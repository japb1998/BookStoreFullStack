import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import {
    SIGN_UP
} from '../../utils/queries';
import { storeToken } from '../../utils/auth'
import './index.css'


export default function Login() {
    const [form, setForm] = useState({ email: "", password: "", username: "" });
    let navigate = useNavigate();
    const [signUp, { data, loading, error}] = useMutation(SIGN_UP, {
        variables: {
            input: form
        },
        onCompleted: (data) => {
            console.log('on completed callback', data)
        }
    })
    function onChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setForm({ ...form, [name]: value })
    }
    async function onSubmit(e) {
        e.preventDefault();
        try {
            const { data:{signUp:{ token }} } = await signUp();
            storeToken(token);
            navigate("/")
        }
        catch (err) {
            console.log(error.message)
        }
    }

    return (
        <>
            {loading ? <div className='text-4xl mx-auto'>loading...</div> : (
                <div className='w-screen  h-screen flex justify-center items-center animate'>
                    <form className="px-6 py-12 border rounded border-gray-300  w-6/12 max-w-xl drop-shadow-xl bg-gray-100" onSubmit={onSubmit}>
                        <div className="mb-6">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">username</label>
                            <input type="text" id="username" value={form.username} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="username" placeholder="username" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                            <input type="email" id="email" value={form.email} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="email" placeholder="email address" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                            <input type="password" id="password" value={form.password} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="password" placeholder="•••••••••" required />
                        </div>
                        <div className='flex items-center'>
                            <button type="submit" className='border rounded bg-gray-700 text-white p-1  pr-2 w-24' onSubmit={onSubmit} >Register</button>
                            <a onClick={(e) => { e.preventDefault(); navigate('/login') }} className='text-blue-400 text-sm ml-6'>or Login</a>
                        </div>
                        {error && <div className='text-white p-1 bg-red-500 rounded mt-2'>{error?.message}</div>}
                    </form>

                </div>)}
        </>
    )
}
