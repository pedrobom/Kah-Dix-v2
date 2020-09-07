import React, { useState, useEffect } from 'react'
import socket from "./socket"

export default React.createContext({
    session: {},
    setSession: () => {}
})