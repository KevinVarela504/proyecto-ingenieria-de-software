import { Body, Controller, Delete, Get, Param,Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { createUserDto } from './DTO/createUser.dto';
import { updateUser } from './DTO/updateUser.dto';
import{UsersService} from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    //@UseGuards(AuthGuard('jwt'))
    @Get('/getUser/:email')
    async getUser(@Param('email') id:string){
       return  await  this.userService.findOne(id);
    }

   /* 
   @UseGuards(AuthGuard('jwt'))
      @Request() req: any
      const {email,firstName}=req.user;
    @Get('/getUser')
    async getUser(@Request() req: any){
      const {email,firstName}=req.user;
       return  await  this.userService.findOne(email);
    }*/ 

    @Post('/register')
    async createNewUsers(@Body() createNewUser:createUserDto){
        return await this.userService.addUser(createNewUser); 
    }

    @Get('/getAllUsers')
   async  getAllUsers(){
      return this.userService.findAll()  
    }

    @Delete('/deleteUser/:email')
    async deleteUser(@Param('email') id:string){
        return await this.userService.deleteUser(id)  
    }

    @Put('/updateUser/:email')
    async updateUser(@Param('email') id:string,@Body() user:updateUser){
      console.log("llegamos aqui al update con el usuaio",user);
      return this.userService.updateUser(id,user) ;
    }
    
    @Put('/updatePasswordUser/:email')
    async updatePasswordUser(@Param('email') id:string,@Body() user:updateUser){
      
      console.log("llegamos aqui al updatepassword con el cambio",user);
      return this.userService.updatePasswordUser(id,user);
    }
}
