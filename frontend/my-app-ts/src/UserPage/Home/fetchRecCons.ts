import axios from 'axios';
import {Con, toTimeCons} from '../Con';
import { User } from '../../SignIn/User';
import { baseURL } from '../../App';


export const fetchRecCons = async (loginUser: User,setWeekPoint :(arg0: number)=>void, setTotalPoint :(arg0: number)=>void, setRecCons:(arg0 :Con[])=>void) => {
    await axios
    .get(baseURL + "/home?user_id=" + loginUser.user_id)
    .then((response :any) => {
        const rec_cons = toTimeCons(response.data.received_cons)
        if (rec_cons !== undefined) {
        setWeekPoint(response.data.week_point);
        setTotalPoint(response.data.total_point);
        setRecCons(rec_cons);
        }
    })
    .catch((err :Error) => {throw Error(`Failed to fetch reccons: ${err}`)})
    return 
};