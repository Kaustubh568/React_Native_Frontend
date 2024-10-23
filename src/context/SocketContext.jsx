import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


const getSocket = async () => {
    const guestToken = await AsyncStorage.getItem("guestToken");
    const googleToken = await AsyncStorage.getItem("googleToken");

    const token = guestToken !== null ? guestToken : googleToken;
    // console.log();

    const socketIo = io("http://192.168.18.87:3001/", {
        auth: {
            token: token,
        }
    });
    // const socketIo = io("https://kaama-socket.onrender.com/", {
    //     auth: {
    //         token: token,
    //     }
    // });
    // console.log("somket", socketIo);

    return socketIo;
};

const SocketContext = createContext({
    socket: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    return (
        <SocketContext.Provider value={{ socket,setSocket,getSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, useSocket };