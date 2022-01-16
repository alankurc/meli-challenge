import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Alerts from './pages/alerts'

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Alerts/>}/>
            </Routes>
        </Router>
    )
}

export default App;