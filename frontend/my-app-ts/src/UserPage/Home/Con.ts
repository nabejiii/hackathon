import { User } from "../../SignIn/User";

export type Con = {
    con_id :string;
    time :Date;
    point :Number;
    sender :User;
    reciver :User;
    message :string;
}
