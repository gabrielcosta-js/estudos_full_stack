import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDTO } from './dtos/criarCategoriaDTO';
import { AtualizarCategoriaDTO } from './dtos/atualizarCategoriaDTO';

@Controller('categorias')
export class CategoriasController {
    constructor(private categoriaService: CategoriasService) {}

    @Get()
    encontrarTodasCategoria(){
        return this.categoriaService.encontrarTodasCategoria();
    }

    @Get('/:id')
    encontrarUmaCategoria(@Param('id') id: string){
        return this.categoriaService.encontrarUmaCategoria(id);
    }

    @Post()
    criarCategoria(@Body() data: CriarCategoriaDTO): string {
        return this.categoriaService.criarCategoria(data);
    }

    @Put('/:id')
    atualizarCategoria(@Param('id') id: string, @Body() data: AtualizarCategoriaDTO) {
        return this.categoriaService.atualizarCategoria(id, data);
    }

    @Delete('/:id')
    deleteCategoria(@Param('id') id:string) {
        return this.categoriaService.deleteCategoria(id);
    }
}
