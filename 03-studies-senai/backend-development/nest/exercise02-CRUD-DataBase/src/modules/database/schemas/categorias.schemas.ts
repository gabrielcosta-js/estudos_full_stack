import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoriaDocument = HydratedDocument<Document> 

@Schema()
export class Categoria{
    @Prop({required: true})
    nome!: string;

    @Prop({required: false})
    descricao?: string;
}

export const CategoriaSchemas = SchemaFactory.createForClass(Categoria);