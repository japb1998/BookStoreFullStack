import React,{useEffect} from 'react';
import { retreiveToken } from '../../utils/auth';
import { useLazyQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { useStore } from '../../store/store';
import BookShell from '../../components/BookShell/BookShell';

export default function SavedBooks() {
  const {state,dispatch} = useStore();
    const [getMe,{loading}]= useLazyQuery(GET_ME);
    useEffect(() => {
      if(!state.user && !!retreiveToken()){
        getMe().then(({data}) => {
          var me = data?.getMe;
          console.log(me)
          dispatch({action:"login",payload:{...me}});
          console.log(state)
        });
        };
    }, []);
    if(loading)return(<p className='text-lg text-red-500'>Loading ...</p>)
    return (
        <main className="bg-slate-200 h-screen">
          <BookShell BOOKS={state.user?.savedBooks} />
        </main>
    );
}
