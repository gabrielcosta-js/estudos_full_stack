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
        
            public encontrarUmProduto(id: string) {
                return this.produtoModel.findById(id);
            }
        
            public criarProduto(data: Produto){
                const produto = new this.produtoModel(data);
    
                produto.save()
            } 
        
            public atualizarProduto(id: string, data: Partial<Produto>) {
                this.produtoModel.findByIdAndUpdate(id, data, {upsert:true});
            }
        
            public deletarProduto(id: string){
             this.produtoModel.findByIdAndDelete(new Types.ObjectId(id));  
            }
  
}
