
import * as bcrypt from 'bcryptjs';

export enum TableName {
    Table_Users = "users",
    Table_User_Activity_Log = "user_activities_log",
    Table_Passport = "passport",
    Table_Otp_Verification = "otp",
    Table_Devices_Info = "device",
    Table_User_Session = "user_session",
    Table_OTP_History = 'otp_history',
    Table_User_Error = "user_error",
    Table_User_Activity = 'user_activity',
    Table_Temp_Upload = 'temp_upload',
    Table_Movie = 'movies'
}


export enum StatusCode {
    Status_Success = 200,
    Status_Show_Error = 201,
    Status_Token_inValid = 498,
    Status_UnAuthorized = 401,

}



export async function getSecurePassword(password: string) {

    const saltOrRounds = 12;
    const hash = await bcrypt.hash(password, saltOrRounds);
    (hash);

    return hash
}


// compare password
export async function comparePassword(plaintextPassword: string, passwordHash: string) {
    const result = await bcrypt.compare(plaintextPassword, passwordHash);
    return result;
}

export async function generateRefreshToken(length: Number) {

    var result: string = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function selectWithWhereClause(params: any) {

    var result: string = ``;
    params.forEach((element, index) => {
        result = result + element + '=? ' + (Number(index) != Number(params.length - 1) ? 'AND ' : '')
    });

    return result;
}



