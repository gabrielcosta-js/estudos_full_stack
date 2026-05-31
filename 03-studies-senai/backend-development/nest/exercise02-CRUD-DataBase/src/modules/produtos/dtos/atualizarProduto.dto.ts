import { IsNumber, IsOptional, IsString } from "class-validator";

export class AtualizarProdutoDTO{
    @IsString()
    @IsOptional()
    nome?: string;

    @IsNumber()
    @IsOptional()
    preco?: number;

    @IsString()
    @IsOptional()
    descricao?: string;
}