import axios from 'axios';
import { baseURL } from '../../App';
import { Member } from './Member';


export const fetchMembers = async (setMembers :any) => {
    await axios
    .get(baseURL + "/members")
    .then((response :any) => { 
        let result = response.data.sort(function(a :Member, b: Member) {
            return (a.week_point > b.week_point) ? -1 : 1;
        })
        setMembers(response.data);
    })
    .catch((err :Error) => {throw Error(`Failed to fetch reccons: ${err}`)})
    return 
};