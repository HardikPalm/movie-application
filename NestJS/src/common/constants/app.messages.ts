
export enum AppMessages {
    ///******************** User ******************/

    Msg_Err_Login = "Password is not correct!!",
    Msg_Err_Login_User_Not_Registered = "User is not registered with provided email address!!",
    Msg_Err_Reg_Email_Already_Registerd = "Please try with other email address. This is already registered!!",
    Msg_Err_Try_Again = "Please try again!!",
    Msg_Err_No_Access = "You do not have access to this feature",
    Msg_Err_User_Not_Valid = "User is not valid!!",
    Msg_Err_Forgot_pass = "Error ocurred while sending email. Please try after some time!!",
    Msg_Err_InValid_Token = "Invalid token!!",


    Msg_Succ_Regsiter = "Successfully registered user.",
    Msg_Succ_Login = "Successfully logged in user.",
    Msg_Succ_Users = "Successfully fetched users",
    Msg_Succ_Forgot_pass = "Successfully sent verificatin code to provided email address !!",

}

export class EmptyFieldMessageClass {

    constructor() {

    }

    emptyField(field: any) {
        return `${field} cannot be empty`
    }
}
