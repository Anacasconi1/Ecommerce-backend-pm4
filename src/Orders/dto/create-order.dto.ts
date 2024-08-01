
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "../../products/entities/Product.entity"


export class OrderDto {
    /**
     * @description "Aca se debe ingresar el id del usuario al cual le corresponde la orden de compra"
     * @example "7d4f0a4a-79a7-4270-b270-9022f509bd45"
     */
    @IsNotEmpty()
    @IsUUID()
    idUser: string

    /**
     * @description "Aca se deben ingresar los id de los productos que desea comprar el usuario"
     * @example [{"id":"f06762ca-3107-4d49-b316-116410e661fa"},{"id":"d51a06d5-9b75-4b57-bac2-de4d10c72000"}]
     */
    @IsArray()
    @ArrayNotEmpty()
    products: Partial<Product[]>
}
