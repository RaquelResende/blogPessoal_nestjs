
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: "testetypeorm", //nome dobanco de dados
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,// tomar cuidado p/ n deixar ativado com TRUE em produçao, sob risco de perda de dados no banco de dados
      });

      return dataSource.initialize();
    },
  },
];