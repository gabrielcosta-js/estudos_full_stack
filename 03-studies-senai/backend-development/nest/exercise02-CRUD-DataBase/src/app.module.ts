import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { DatabaseModule } from './modules/database/database.module';
import { CategoriasModule } from './modules/categorias/categorias.module';

@Module({
  imports: [ProdutosModule, CategoriasModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
