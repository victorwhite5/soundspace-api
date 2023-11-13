import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsUUID, Min, MinLength } from "class-validator";

export class HeaderDto {
    
    // @IsOptional()
    // @IsPositive()
    // @Type(() => Number)//enableImplicitConvertions: true
    // token?:string;

    @IsUUID()
    //@Type(() => String)
    user:string;

}