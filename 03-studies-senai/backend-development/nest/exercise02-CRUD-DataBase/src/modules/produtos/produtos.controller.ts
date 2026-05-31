import { Body, Controller, Get, Delete, Param, Post, Put } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CriarProdutoDTO } from './dtos/criarProduto.dto';
import { AtualizarProdutoDTO } from './dtos/atualizarProduto.dto';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtoService: ProdutosService) {}

    @Get()
    encontrarTodosOsProdutos(){
        return this.produtoService.encontrarTodosOsProdutos();
    }

    @Get('/:id')
    encontrarUmProduto(@Param('id') id: string) {
        return this.produtoService.encontrarUmProduto(id);
    }

    @Post()
    criarProduto(@Body() data: CriarProdutoDTO): string {
        return this.produtoService.criarProduto(data);
    } 

    @Put('/:id')
    atualizarProduto(@Param('id') id: string, @Body() data: AtualizarProdutoDTO) {
        return this.produtoService.atualizarProduto(id, data);
    }

    @Delete('/:id')
    deletarProduto(@Param('id') id: string): string {
        return this.produtoService.deletarProduto(id);
    }
}
