import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Produto } from './interfaces/produto.interface';
import { ProdutosRepository } from './produto.repository';

@Injectable()
export class ProdutoService {
    constructor(private produtoRepository: ProdutosRepository) {}

    public encontrarTodosOsProdutos(): Array<Produto> {
        return this.produtoRepository.encontrarTodosOsProdutos();
    }
    public encontrarUmProduto(id: number): Produto {
        if (!id) {
            throw new BadRequestException('Informe um ID o campo está vazio');
        }
        if (!Number(id) || id < 0) {
            throw new BadRequestException('Informe algo que seja um número ou ;que seja número positivo');
        }
        const produto =  this.produtoRepository.encontrarUmProduto(id);

        if (!produto){
            throw new NotFoundException('Produto não encontrado!');
        }
        return produto;
    }

    criarProduto(data: Produto): String {
        this.produtoRepository.criarProduto(data);
        return 'Produto Criado';
    }

    atualizarProduto(id: number, data: Produto) {
        this.encontrarUmProduto(id);
        this.produtoRepository.atualizarProduto(id, data);
        return 'Produto Atualizado';
    }

    deletarProduto(id: number) {
        this.encontrarUmProduto(id);
        this.produtoRepository.deletarProduto(id);
        return 'Produto Deletado';
    }
}
