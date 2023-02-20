import React from 'react';
import Home from '../pages/home/home';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import Questions from '../pages/questions/questions';

function RouterPage():JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home></Home>}> </Route>
                <Route path="/questions/:id" element={<Questions></Questions>}></Route>
            </Routes>
        </Router>
    );
}

export default RouterPage;
