import { Injectable } from '@nestjs/common';
import { Produto } from './interfaces/produto.interface';

const dbProdutos: Array<Produto> = [
  {
    id: 1,
    nome: "Pizza",
    preco: 25.00,
    descricao: "Uma deliciosa Pizza"
  },
  {
    id: 2, 
    nome: "Suco de Uva",
    preco: 6.00
  }
]
@Injectable()
export class ProdutosRepository {
  public encontrarTodosOsProdutos(): Array<Produto> {
    return dbProdutos;
  }

  public encontrarUmProduto(id: number): Produto | undefined {
    return dbProdutos.find(p => p.id === Number(id));
  }

  public criarProduto(data: Produto){
    dbProdutos.push(data);
  }
  public atualizarProduto(id: number, data: Produto) {
    const index = dbProdutos.findIndex(p => p.id === Number(id));

    dbProdutos[index] = {
      ...data,
      id: Number(id)
    };
  }

  public deletarProduto (id: number) {
    const index = dbProdutos.findIndex(p => p.id === Number(id));

    dbProdutos.splice(index, 1);
  }
}