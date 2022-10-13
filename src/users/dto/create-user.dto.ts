import { IsEmail,IsString, MinLength } from "class-validator";

export class CreateUserDto {
@IsEmail()
email:string;

@IsString()
name:string;

@IsString()
@MinLength(6)
password:string;

}



//DTO = data transformation object np
// = 
