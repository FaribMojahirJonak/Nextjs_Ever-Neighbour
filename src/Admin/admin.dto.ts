import { Optional } from '@nestjs/common';
import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  
  export class AdminRegistrationDTO {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @IsNotEmpty()
    @MinLength(4, { message: 'Password must be at least 4 characters long' })
    password: string;
  
    @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
    phone: string;

    filename: string

    @Optional()
    adminId: string;
    @Optional()
    posts: any;
  }
  export class UserUpdateDTO {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @IsNotEmpty()
    @MinLength(4, { message: 'Password must be at least 4 characters long' })
    password: string;
  
    @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
    phone: string;
  
  }

  export class AdminEventAnnouncementDTO {
    @Optional()
    id: number
    @IsNotEmpty()
    eventName: string;
    filename: string
  }

  export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }

  export class AdminUpdateDTO {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @IsNotEmpty()
    @MinLength(4, { message: 'Password must be at least 4 characters long' })
    password: string;
  
    @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
    phone: string;
  
  }