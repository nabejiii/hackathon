import { time } from "console";
import { User, UserDemo } from "../SignIn/User";

export type Con = {
    con_id :string;
    time :Date;
    point :number;
    sender :User;
    receiver :User;
    message :string;
}

export type StrCon = {
    con_id :string;
    time :string;
    point :number;
    sender :User;
    receiver :User;
    message :string;
}

export type editCon = Con & {
    edit :boolean
}

export const conDemo :Con = {
    con_id : "",
    time : new Date("2021-05-23"),
    point : -1,
    sender : UserDemo,
    receiver : UserDemo,
    message : ""
}

export const toTimeCons = (strcons :StrCon[]) => {
    const recCons :Con[] = [];
    strcons.map((strCon :StrCon)=> {
        const recCon : Con = {
            con_id: strCon.con_id,
            time: new Date(strCon.time),
            point: strCon.point,
            sender: strCon.sender,
            receiver: strCon.receiver,
            message: strCon.message
        } 
        
        recCons.push(recCon)
    })
    return recCons;
}

//本当は下の方でやりたいけどエラー改善できず
/*const toTimeConsDup = (strcons :StrCon[]) => {
    const recCons :Con[] = [];
    strcons.map((strCon :StrCon)=> {
        const recCon = conDemo;
        Object.keys(strCon).map((key) => {
            if (key !== "time") {
                recCon[key] = strCon[key];
            } else {
                recCon.time = new Date(strCon.time);
            }
        });
        recCons.push(recCon)
    })
    return recCons;
}:*/