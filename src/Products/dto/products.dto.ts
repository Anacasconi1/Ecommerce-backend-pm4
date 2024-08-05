import { IsInt, IsNumber, IsString } from "class-validator";

export class ProductDto {
    /**
     * @description "Aca se debe ingresar el nombre del nuevo producto"
     * @example "Asus zenbook dual"
     */
    @IsString()
    name: string;
    /**
     * @description "Aca se debe ingresar la descripcion del nuevo producto"
     * @example "La mejor laptop para desarrollar"
     */
    @IsString()
    description: string;
    /**
     * @description "Aca se debe ingresar precio nuevo producto"
     * @example "3000"
     */
    @IsNumber()
    price: number;
    /**
    * @description "Aca se debe ingresar el stock del nuevo producto"
    * @example "15"
    */
   @IsInt()
    stock: number;
    /**
     * @description "Aca se debe ingresar la categoria del nuevo producto, procura que ya exista, si no debes crear la categoria antes de subir el producto"
     * @example "laptop"
     */
    @IsString()
    category: string

}
