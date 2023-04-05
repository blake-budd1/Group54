export class LoginList {
    constructor(
      public username: string,
      public password: string,
    ) {}}
export class RegisterList{
    constructor(
        public email: string,
        public username: string,
        public password: string,
        public confirmPassword: string
    ){}}
export interface PopupUse{
    useCase: string;
} 
export const userSignedIn = {
    currentUser: "NULL",
    signedIn: "False",
    bussinessName: "NULL"
};

