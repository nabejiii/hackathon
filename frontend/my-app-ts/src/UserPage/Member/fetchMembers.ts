import axios from 'axios';
import {Con, toTimeCons} from '../Con';
import { User } from '../../SignIn/User';
import { baseURL } from '../../App';


export const fetchMembers = async (setMembers :any) => {
    await axios
    .get(baseURL + "/members")
    .then((response :any) => { 
        setMembers(response.data);
    })
    .catch((err :Error) => {throw Error(`Failed to fetch reccons: ${err}`)})
    return 
};