import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria, CategoriaDocument } from '../database/schemas/categorias.schemas';
import { Model, Types } from 'mongoose';

@Injectable()
export class CategoriasRepository {
     constructor(@InjectModel(Categoria.name) private readonly categoriaModule: Model<CategoriaDocument>) {}
        
            public async encontrarTodasCategoria(){
               const categoria = await this.categoriaModule.find();
               return categoria;
            }
        
           public async encontrarUmaCategoria(id: string){
                return await this.categoriaModule.findById(id);
            }
        
            public criarCategoria(data: Categoria) {
                const categoria = new this.categoriaModule(data);
                categoria.save();
                
            }
        
            public async atualizarCategoria(id: string, data: Partial<Categoria>) {
                await this.categoriaModule.findByIdAndUpdate(id, data, {upsert:true})
            }
        
            public async deleteCategoria(id:string) {
                await this.categoriaModule.findByIdAndDelete(new Types.ObjectId(id));
            }
}
