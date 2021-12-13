//import { OmitType} from "@nestjs/mapped-types";
import { OmitType, PartialType } from "@nestjs/swagger";
import { createUserDto } from "./createUser.dto";

export class updateUser  extends PartialType(createUserDto) {}
//PartialType(OmitType(createUserDto,['email'] as const)){}
