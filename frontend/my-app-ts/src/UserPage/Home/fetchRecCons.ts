import * as React from 'react';
import axios from 'axios';
import {Con} from './Con';
import { User } from '../../SignIn/User';


export const FetchRecCons = async (loginUser: User,setPoint :(arg0: Number)=>void, setRecCons:(arg0 :Con[])=>void) => {
    await axios
    .get("http://localhost:8000/home?user_id=" + loginUser.user_id)
    .then((response :any) => {
        setPoint(response.data.point);
        setRecCons(response.data.received_cons);
        console.log(loginUser.user_id);
    })
    .catch((err :Error) => {throw Error(`Failed to fetch reccons: ${err}`)})
    return 
};