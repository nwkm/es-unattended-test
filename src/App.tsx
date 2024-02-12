import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PlayerList from './pages/PlayerList';
import WinDetails from './pages/WinDetailList';

export default function App() {
    return (
        <HashRouter basename="/">
            <Routes>
                <Route path="/" element={<PlayerList />} />
                <Route path="/players/:id" element={<WinDetails />} />
            </Routes>
        </HashRouter>
    );
}
