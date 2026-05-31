import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutoRepository } from './produtos.repository';
import { CriarProdutoDTO } from './dtos/criarProduto.dto';
import { AtualizarProdutoDTO } from './dtos/atualizarProduto.dto';

@Injectable()
export class ProdutosService {
    constructor(private produtoRepository: ProdutoRepository) {}
    
        public encontrarTodosOsProdutos(){
            return this.produtoRepository.encontrarTodosOsProdutos();
        }
    
        public encontrarUmProduto(id: string) {
            const produto = this.produtoRepository.encontrarUmProduto(id);

            if(!produto) {
                throw new NotFoundException("Nenhum produto encontrado")
            }

            return produto;
        }
    
        public criarProduto(data: CriarProdutoDTO): string {
            this.produtoRepository.criarProduto(data);

            return 'Produto Criado Com Sucesso';
        } 
    
        public atualizarProduto(id: string, data: AtualizarProdutoDTO) {
            this.encontrarUmProduto(id);
            this.produtoRepository.atualizarProduto(id, data);

            return 'PRoduto Atualizado com sucesso';
        }
    
        public deletarProduto(id: string): string {
            this.encontrarUmProduto(id);
            this.produtoRepository.deletarProduto(id);

            return 'Produto Deletado com Sucesso'
        }
}
