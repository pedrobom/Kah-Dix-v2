import openSocket from 'socket.io-client'
import React from "react";

export const socket = openSocket("https://jonarius-test-app.herokuapp.com/");
export default socket;