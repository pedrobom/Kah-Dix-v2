import openSocket from 'socket.io-client'
import React from "react";

export const socket = openSocket("http://localhost:5000");
export default socket;