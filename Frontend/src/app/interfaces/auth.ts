import { Token } from "@angular/compiler/src/ml_parser/tokens";
import { UserComponent } from "../components/user/user.component";
import { User } from "./user";



export interface Auth {
    email:string;
    password:string; 
}


export interface UserResponse{
    email: string; 
    firsName: string;
    urlPhoto:string;
        
}

export interface ForgotUser{
    email: string;
}





