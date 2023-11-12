import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class HeaderDto {
    
    // @IsOptional()
    // @IsPositive()
    // @Type(() => Number)//enableImplicitConvertions: true
    // token?:string;

    @Min(1)
    @Type(() => String)
    user:string;

}