import React from 'react';
import Home from '../pages/home/home';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import IquestionsPage from '../pages/questions/questionsPage';
import IcreatePage from '../pages/createQuiz/createPage';
import IallQuizes from '../pages/All Quiz/allQuizes';

function RouterPage():JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home></Home>}> </Route>
                <Route path="/preguntas/:id" element={<IquestionsPage></IquestionsPage>}></Route>
                <Route path="/crearQuiz" element={<IcreatePage></IcreatePage>} ></Route>
                <Route path="/quizes" element={<IallQuizes></IallQuizes>} ></Route>
            </Routes>
        </Router>
    );
}

export default RouterPage;
