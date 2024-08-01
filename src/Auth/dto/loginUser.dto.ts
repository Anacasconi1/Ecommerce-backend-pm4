import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator"

export class LoginUserDto {
    /**
     * @description "Aca se debe ingresar el email del usuario"
     * @example "mariano@gmail.com"
     */
    @IsEmail()
    @IsNotEmpty()
    email: string

    /**
     * @description "Ingresa la contraseña del usuario"
     * @example "Password12*"
     */
    @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
    @Length(8, 15)
    password: string
}
