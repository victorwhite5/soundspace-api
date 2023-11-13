import { Type } from "class-transformer";
import { IsString, IsUUID, MinLength } from "class-validator";

export class ValidateOperator {
    @IsString()
    @MinLength(3)
    @Type(() => String)
    number:string;

    @IsUUID()
    @Type(() => String)
    operadoraId:string;

}