import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports:[MongooseModule.forRoot('mongodb://gabrielcosta9505_db_user:Gabriel123@ac-imlcbe0-shard-00-00.oaw38tb.mongodb.net:27017,ac-imlcbe0-shard-00-01.oaw38tb.mongodb.net:27017,ac-imlcbe0-shard-00-02.oaw38tb.mongodb.net:27017/?ssl=true&replicaSet=atlas-qdyy66-shard-0&authSource=admin&appName=Cluster0')],
})
export class DatabaseModule {}
