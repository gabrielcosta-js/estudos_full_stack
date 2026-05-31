import { IsOptional, IsString } from "class-validator";

export class AtualizarCategoriaDTO{
    @IsString()
    @IsOptional()
    nome?: string;

    @IsString()
    @IsOptional()
    descricao?: string;
}