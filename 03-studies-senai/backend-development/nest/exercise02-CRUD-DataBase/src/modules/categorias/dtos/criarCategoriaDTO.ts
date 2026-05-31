import { IsOptional, IsString } from "class-validator";

export class CriarCategoriaDTO{
    @IsString()
    nome!: string;

    @IsString()
    @IsOptional()
    descricao?: string;
}