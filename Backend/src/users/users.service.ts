import { Repository } from 'typeorm';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users} from './Entities/user.entity';
import { createUserDto } from './DTO/createUser.dto';
import { updateUser } from './DTO/updateUser.dto';
import { InstitutionsService } from 'src/institutions/institutions.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private institutionService : InstitutionsService,
      ) {}

    async addUser(userNew:createUserDto){
          const {email,firstName,middleName,lastName,secondLastName,academicTraining, description_,interests ,password_, institutionRepresenting, profilePhoto}=userNew;
          try {
              const exists= await this.usersRepository.findOne(userNew.email);
              if(!exists){
                  const institutionUser= await this.institutionService.getOneInstitution(institutionRepresenting);
                  const post= this.usersRepository.create({email,firstName,middleName,lastName,secondLastName,academicTraining, description_,interests ,password_, profilePhoto, institutionRepresenting:institutionUser});
                  await this.usersRepository.save(post);
                  return{
                      "message":"Registro realizado con exito"
                  }
                } 
              return {
                  "error-001":`El  usuario ${firstName} con correo ${email}ya existe dentro de la aplicacion`,
                }
          }catch (error) {
              throw new Error(error);  
          }
        }

   async deleteUser(email:string){
       try {
           const user=await this.usersRepository.findOne(email);
           if(!user) throw new NotFoundException(`El usuario ${user.firstName} con correo ${user.email} no existe dentro de la aplicacion`);
           await this.usersRepository.delete(email);
           return{
               "message":`usuario ${user.firstName}con correo ${user.email} ha sido eliminado con exito`
            }
        }catch (error) {
            throw new Error(error);
        }

    }
    
    async updateUser(email:string,user:updateUser){
        console.log('TUMAMA');
        const {firstName,middleName,lastName,secondLastName,academicTraining, description_,interests , institutionRepresenting, profilePhoto}=user;
        try {
            const post = await this.usersRepository.findOne(email);
            if(!post) throw new NotFoundException(`El usuario con correo ${email} no existe dentro de la aplicacion`);
            
            const institutionUser= await this.institutionService.getOneInstitution(Number(institutionRepresenting));
            const editPost =Object.assign(post,{firstName,middleName,lastName,secondLastName,academicTraining, description_,interests , profilePhoto, institutionRepresenting:institutionUser});
            return await this.usersRepository.save(editPost);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updatePasswordUser(email:string,user:updateUser){
        try {
            const post = await this.usersRepository.findOne(email);
            if(!post) throw new NotFoundException(`El usuario con correo ${email} no existe dentro de la aplicacion`);
            
            const editPost =Object.assign(post,user);
            await editPost.hashPassword();
            return await this.usersRepository.save(editPost);
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAll(){
        try {
            const data= await this.usersRepository.find();
            

            return {
                "message":"exit",
                data
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOne(id:string){
/*         try {
            const user= await this.usersRepository.findOne(id);
            if(!user) throw new NotFoundException(`El usuario con correo ${id} no existe dentro de la aplicacion`);
            return {
                "message":"exit",
                user
            }
        } catch (error) {
            throw new Error(error);
        } */
        return await this.usersRepository.findOne(id);
    }

    async findUserAuth(id:string):Promise<Users>{
        const user= await this.usersRepository.findOne(id);
        if(!user) throw new UnauthorizedException(`El usuario con correo ${id} no existe dentro de la aplicacion`);
        
        return user;
    }
}
