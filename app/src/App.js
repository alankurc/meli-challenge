import {BrowserRouter as Router, Route} from "react-router-dom";

import Alerts from './pages/alerts'
import Servers from './pages/servers'

function App() {
    return (
        <Router>
            <Route exact path="/" component={Alerts} />
            <Route exact path="/servers" component={Servers} />
        </Router>
    )
}

export default App;