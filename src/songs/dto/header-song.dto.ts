import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min, MinLength } from "class-validator";

export class HeaderDto {
    
    // @IsOptional()
    // @IsPositive()
    // @Type(() => Number)//enableImplicitConvertions: true
    // token?:string;

    @MinLength(1)
    @Type(() => String)
    user:string;

}