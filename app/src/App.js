import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Alerts from './pages/alerts'
import Servers from './pages/servers'

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Alerts/>}/>
                <Route exact path="/servers" element={<Servers/>}/>
            </Routes>
        </Router>
    )
}

export default App;