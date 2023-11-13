import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID, Min, MinLength } from "class-validator";

export class HeaderDto {
    
    // @IsOptional()
    // @IsPositive()
    // @Type(() => Number)//enableImplicitConvertions: true
    // token?:string;

    @IsUUID()
    //@Type(() => String)
    user:string;

}