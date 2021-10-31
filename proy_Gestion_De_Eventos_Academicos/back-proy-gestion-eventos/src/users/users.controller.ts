import { Body, Controller, Delete, Get, Param,ParseIntPipe,Post, Put } from '@nestjs/common';
import { brotliDecompressSync } from 'zlib';
import { createUserDto } from './DTO/createUser.dto';
import { createUser } from './interfaces/createUser.interface';

@Controller('users')
export class UsersController {

    constructor(private userService:createUser){}
    
    @Get('/getUser/:email')
    getUser(@Param('email') id:string){
        
    }

    @Post('/createUser')
    createNewUsers(@Body() createNewUser:createUserDto){
        
    }

    @Get('/getAllUsers')
    getAllUsers(){
        
    }

    @Delete('/deleteUser/:email')
    deleteUser(@Param('email') id:string){
        
    }

    @Put('/updateUser/:email')
    updateUser(@Param('email') id:string,@Body() user:createUserDto){
        
    }
}
