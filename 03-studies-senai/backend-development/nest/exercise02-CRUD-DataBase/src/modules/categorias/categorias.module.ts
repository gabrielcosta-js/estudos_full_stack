import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchemas } from '../database/schemas/categorias.schemas';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CategoriasRepository } from './categorias.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Categoria.name, schema: CategoriaSchemas }])],
    controllers: [CategoriasController],
    providers: [CategoriasService, CategoriasRepository],
})
export class CategoriasModule { }

