import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage";
import UserPage from "../../pages/UserPage";


const AppRouter = () => {
    return (
       <>
           <Routes>
               <Route path={'/'} element={<MainPage/>}/>
               <Route path={'/user/:id'} element={<UserPage/>}/>

           </Routes>
       </>
    );
};

export default AppRouter;
