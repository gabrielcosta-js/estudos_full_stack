import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Produto, ProdutoDocument } from '../database/schemas/produtos.schemas';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProdutoRepository {
     constructor(@InjectModel(Produto.name) private readonly produtoModel: Model<ProdutoDocument>) {}
        
            public async encontrarTodosOsProdutos(){
                const produto = await this.produtoModel.find()
                return produto;
            }
        
            public async encontrarUmProduto(id: string) {
                return await this.produtoModel.findById(id);
            }
        
            public criarProduto(data: Produto){
                const produto = new this.produtoModel(data);
    
                produto.save()
            } 
        
            public async atualizarProduto(id: string, data: Partial<Produto>) {
                await this.produtoModel.findByIdAndUpdate(id, data, {upsert:true});
            }
        
            public async deletarProduto(id: string){
             await this.produtoModel.findByIdAndDelete(new Types.ObjectId(id));  
            }
  
}
