import React from 'react'
import { Link,useNavigate} from 'react-router-dom'
import './NavBar.css'
import {removeItem} from '../../utils/auth';
import { useStore } from '../../store/store';

export default function NavBar() {
    const {dispatch,state} = useStore();
    const navigate = useNavigate()
    let nav = [{
        route: '/saved',
        name: 'Saved Books'
    }, {
        route: '/',
        name: 'Home'
    }
    ]
    function onLogOut(){
        removeItem();
        dispatch({action:'logout'});
        navigate("/login")
    }
    return (
    <>
        <nav className="border-gray-800 px-2 sm:px-4 py-2.5  bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a  className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-white title">Books Graphql Class</span>
                </a>
                
                <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        {nav.map(({route,name},i) => (<li key={i}><Link to={route}  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200" aria-current="page">{name}</Link>
                        </li>) )}
                        {!state.user ? 
                        (<><li><Link to={"/login"}  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200" aria-current="page">{"Login"}</Link></li>
                        <li><Link to={"/register"}  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200" aria-current="page">{"Register"}</Link></li></>) :
                        (<li><a onClick={onLogOut}  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200" aria-current="page">{"Logout"}</a></li>
                        ) }
                    </ul>
                </div>
            </div>
        </nav>
        <div style={{position:'fixed',bottom:0,right:0}}>
        <div className='rounded-full bg-gray-800 w-10 h-10 m-5 shawdow-lg' style={{position:"sticky", bottom:0,right: 0,zIndex:2}}></div>
        </div>
        </>
    )
}
