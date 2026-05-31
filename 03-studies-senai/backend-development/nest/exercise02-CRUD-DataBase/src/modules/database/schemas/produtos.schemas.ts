import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProdutoDocument = HydratedDocument<Produto>;

@Schema()
export class Produto {
    @Prop({required: true})
    nome!: string;

    @Prop({requeried: true})
    preco!: number;

    @Prop({required: false})
    descriacao?: string;
}

export const ProdutosSchemas = SchemaFactory.createForClass(Produto);