import React from 'react';
import './App.css'

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Join from "../Components/Join/Join.js"
import GameRoom from "../Components/GameRoom/GameRoom.jsx"

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/GameRoom" component={GameRoom} />
    </Router>
)

export default App