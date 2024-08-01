import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches} from "class-validator";

export class UserDto {
    /**
     * @description "Aca se debe ingresar el nombre del nuevo usuario"
     * @example "Mariano Diaz"
     */
    @IsNotEmpty()
    @Length(3, 80)
    name: string;
    
    /**
     * @description "Aca se debe ingresar el email del nuevo usuario"
     * @example "mariano@gmail.com"
     */
    @IsEmail()
    email: string;

    @ApiHideProperty()
    @IsEmpty()
    isadmin?: boolean

    /**
     * @description "Ingresa la contraseña del nuevo usuario, procura que cumpla con los requisitos de contraseña fuerte"
     * @example "Password12*"
     */
    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    @Length(8, 15)
    password: string;

    /**
     * @description "Ingresar en este campo nuevamente la contraseña para confirmarla"
     * @example "Password12*"
     */
    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    @Length(8, 15)
    passwordConfirm: string;

    /**
     * @description "Ingresa el domicilio del usuario"
     * @example "Calle Falsa 123"
     */
    @Length(3, 80)
    address: string;

    /**
     * @description "Ingresa el numero de telefono del usuario"
     * @example "35419999999"
     */
    @IsNotEmpty()
    @IsInt()
    phone: number;

    /**
     * @description "Ingresa el pais donde reside el usuario, este campo es opcional"
     * @example "Argentina"
     */
    @IsString()
    @IsOptional()
    @Length(5, 20)
    country?: string | undefined;
    
    /**
     * @description "Ingresa la ciudad donde se encuentra residiendo el usuario"
     * @example "Cordoba"
     */
    @IsString()
    @IsOptional()
    @Length(5, 20)
    city?: string | undefined;
}
