import openSocket from 'socket.io-client'
import React from "react";
import Constants from '../Constants'

export const socket = openSocket(Constants.apiAddress);
export default socket;