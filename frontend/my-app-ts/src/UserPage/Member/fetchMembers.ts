import axios from 'axios';
import {Con, toTimeCons} from '../Con';
import { User } from '../../SignIn/User';


export const fetchMembers = async (setMembers :any) => {
    await axios
    .get("http://localhost:8080/members")
    .then((response :any) => { 
        setMembers(response.data);
    })
    .catch((err :Error) => {throw Error(`Failed to fetch reccons: ${err}`)})
    return 
};