import React from 'react';
import {Route, Routes} from 'react-router-dom';
import About from '../components/About';
import Lennart from '../components/Lennart';
import Rafael from '../components/Rafael';
import Conrad from '../components/Conrad';
import Julio from '../components/Julio';

const AboutMeRouter = () => {

    return (
        <Routes>
        <Route index element={<About />} />
        <Route path='lennart' element={<Lennart />} />
        <Route path='rafael' element={<Rafael />} />
        <Route path='conrad' element={<Conrad />} />
        <Route path='julio' element={<Julio />} />
        </Routes>
    );
};



export default AboutMeRouter;