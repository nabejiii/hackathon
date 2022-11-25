import axios from 'axios';
import {Con, toTimeCons} from '../Con';
import { User } from '../../SignIn/User';
import { baseURL } from '../../App';


export const FetchSentCons = async (loginUser: User, setSentCons:(arg0 :Con[])=>void) => {
    await axios
    .get(baseURL + "/send?user_id=" + loginUser.user_id)
    .then((response :any) => {
        const sent_cons: Con[] = toTimeCons(response.data.sent_cons);
        if (sent_cons !== undefined) {
            setSentCons(sent_cons);
        }
    })
    .catch((err :Error) => {throw Error(`Failed to fetch sentcons: ${err}`)})
    return 
};