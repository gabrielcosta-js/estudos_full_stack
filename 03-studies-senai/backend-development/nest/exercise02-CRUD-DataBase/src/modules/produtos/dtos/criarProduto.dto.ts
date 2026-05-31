import { IsNumber, IsOptional, IsString } from "class-validator";

export class CriarProdutoDTO{
    @IsString()
    nome: string;

    @IsNumber()
    preco: number;

    @IsString()
    @IsOptional()
    descricao?: string;
}