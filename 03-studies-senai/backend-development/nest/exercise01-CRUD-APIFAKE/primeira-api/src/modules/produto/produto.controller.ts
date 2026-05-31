import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import {Produto} from './interfaces/produto.interface';

@Controller('produto')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) {}

    @Get()
    encontrarTodosOsProdutos(): Array<Produto> {
         return this.produtoService.encontrarTodosOsProdutos();
    }

    @Get('/:id')
    encontrarUmProduto(@Param('id') id: number): Produto {
        return this.produtoService.encontrarUmProduto(id);
    } 

    @Post()
    criarProduto(@Body() data: Produto) : String {
        return this.produtoService.criarProduto(data);
    }

    @Put('/:id')
    atualizarProduto(@Param('id') id:number, @Body() data: Produto) {
        return this.produtoService.atualizarProduto(id, data);
    }
    @Delete('/:id')
    deletarProduto(@Param('id') id:number) {
        return this.produtoService.deletarProduto(id);
    }
}
