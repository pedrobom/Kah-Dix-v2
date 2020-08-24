import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Join from "./Components/Join/Join.js"
import Chat from "./Components/GameRoom/GameRoom"

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/GameRoom" component={GameRoom} />
    </Router>
)

export default App