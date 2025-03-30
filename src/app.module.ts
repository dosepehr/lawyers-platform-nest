import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './resources/blogs/blogs.module';
import { ServicesModule } from './resources/services/services.module';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BlogsModule,
    ServicesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
