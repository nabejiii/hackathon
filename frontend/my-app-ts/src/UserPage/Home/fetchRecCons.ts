import axios from 'axios';
import {Con, toTimeCons} from '../Con';
import { User } from '../../SignIn/User';


export const fetchRecCons = async (loginUser: User,setPoint :(arg0: number)=>void, setRecCons:(arg0 :Con[])=>void) => {
    await axios
    .get("http://localhost:8080/home?user_id=" + loginUser.user_id)
    .then((response :any) => {
        const rec_cons = toTimeCons(response.data.received_cons)
        if (rec_cons !== undefined) {
        setPoint(response.data.point);
        setRecCons(rec_cons);
        }
    })
    .catch((err :Error) => {throw Error(`Failed to fetch reccons: ${err}`)})
    return 
};