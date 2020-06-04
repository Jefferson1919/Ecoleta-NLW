import express from 'express';
import routes from './routes'
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors()); 
app.use(express.json()); //add uma funcionalidade a mais p/ o express ou
//''sempre preciso fazer isso para o express aprender a "ler" JSON.''

// SELECT * FROM users WHERE name = 'Jefferson'
// knex('users').where('name','Jefferson').select('*')

app.use(routes);

app.use('/uploads', express.static(
    path.resolve(__dirname, '..', 'uploads')
));

app.listen(3333);

