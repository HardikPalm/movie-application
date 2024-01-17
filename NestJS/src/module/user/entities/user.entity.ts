import { ApiProperty } from "@nestjs/swagger";
import { ResponseInterceptor } from "../../../common/middleware/response.middleware";
export class UserResponseClass extends ResponseInterceptor<User> { }


export class User {

    userId: number
    fullName: string
    email: string
    mobileNumber: string
    status: number
    roleType: string
    refreshToken: string;
    accessToken: string;
}

