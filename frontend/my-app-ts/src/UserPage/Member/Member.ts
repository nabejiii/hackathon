import { User } from "../../SignIn/User";

export type Member = User & {
    total_point: Number
    week_point: Number
}