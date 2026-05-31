import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { ProdutosRepository } from './produto.repository';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutosRepository]
})
export class ProdutoModule {}
