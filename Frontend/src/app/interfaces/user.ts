export interface User {
    email: string;
    password_: string;
    firstName : string;
    middleName  : string;
    lastname : string;
    secondLastName : string;
    academicTraining  : string;
    description_ : string;
    interests : string;
    institutionRepresenting :string;
}

export interface changePassword {
    password_: string; 
}
