import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriasRepository } from './categorias.repository';
import { CriarCategoriaDTO } from './dtos/criarCategoriaDTO';
import { AtualizarCategoriaDTO } from './dtos/atualizarCategoriaDTO';

@Injectable()
export class CategoriasService {
    constructor(private categoriaRepository: CategoriasRepository) {}
    
        public encontrarTodasCategoria(){
            return this.categoriaRepository.encontrarTodasCategoria();
        }
    
       public async encontrarUmaCategoria(id: string){
            const categoria = await this.categoriaRepository.encontrarUmaCategoria(id);

            if(!categoria) {
                throw new NotFoundException('Categoria Não encontrada');
            }

            return categoria;
        }
    
        public criarCategoria(data: CriarCategoriaDTO): string {
            this.categoriaRepository.criarCategoria(data);
            
            return 'Categoria Criada com Sucesso';
        }
    
        public async atualizarCategoria(id: string, data: AtualizarCategoriaDTO) {
            await this.encontrarUmaCategoria(id);
            await this.categoriaRepository.atualizarCategoria(id, data);

            return 'Categoria Atualizada';
        }
    
        public async deleteCategoria(id:string) {
            await this.encontrarUmaCategoria(id);
            await this.categoriaRepository.deleteCategoria(id);

            return 'Categoria Apagada'
        }
}

