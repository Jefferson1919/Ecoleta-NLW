import express, { request, response } from 'express';
import PointsController from './controller/PointsController'
import ItemsController from './controller/ItemsController';

//index --> listagem de muitos
//show --> listagemd de 1
//create
//update
//delete

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// Request Param: Parâmetros que vem na própria rota que identifica um recurso
// Query Param: Parâmetros que vem na própria rota geralmente opcionais p/ filtros, paginação
// Request Body: Parâmetros p/ criação/atualização de informações  

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;

// Service pattern
// Repository Pattern (Data Mapper)