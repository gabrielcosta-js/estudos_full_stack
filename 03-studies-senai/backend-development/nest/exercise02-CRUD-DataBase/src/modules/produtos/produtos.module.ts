import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutosSchemas } from '../database/schemas/produtos.schemas';
import { ProdutoRepository } from './produtos.repository';


@Module({
  imports: [MongooseModule.forFeature([{name: Produto.name, schema: ProdutosSchemas}])],
  controllers: [ProdutosController],
  providers: [ProdutosService, ProdutoRepository]
})
export class ProdutosModule {}
