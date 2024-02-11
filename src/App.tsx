import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerList from './pages/PlayerList';
import WinDetails from './pages/WinDetailList';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PlayerList />} />
                <Route path="/players/:id" element={<WinDetails />} />
            </Routes>
        </BrowserRouter>
    );
}
