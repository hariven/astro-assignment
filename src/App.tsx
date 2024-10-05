// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Header from './_components/Layouts/Header'
// import ChannelCard from './_components/ChannelCard/ChannelCard'
import Index from './pages/Index'
import FavouritePage from './_components/FavouritePage'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/favourite' element={<FavouritePage />} />
    </Routes>
    </>
  )
}

export default App
