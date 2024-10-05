import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Header from './_components/Layouts/Header'
// import ChannelCard from './_components/ChannelCard/ChannelCard'
import Index from './pages/Index';
import FavouritePage from './_components/FavouritePage';
function App() {
    return (_jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Index, {}) }), _jsx(Route, { path: '/favourite', element: _jsx(FavouritePage, {}) })] }) }));
}
export default App;
