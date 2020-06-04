import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController{
    async index(request: Request, response: Response){
        //cidade, uf, items (Query Params)
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim())
        );

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');


        return response.json(points);
    }

    async show(request: Request, response: Response){
        const id = request.params.id;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({
                message: 'Point not found.'
            })
        }

        //SELECT * FROM items JOIN point_items ON items_id = point_items.id
        //WHERE point_items.point_id = {id}
        const items = await knex('items')
        .join('point_items', 'items.id', '=','point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        return response.json({point, items});
    }

    async create(request: Request, response: Response) {
        //de certo modo faz a instanciação de todos os objetos do lado esquerdo
        //chama-se desestrutução
        //é uma alternativa a --> const name = request.body.name; (...)
        const {
            name,
            email,
            whatsapp,
            latitude, 
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();//transaction
    
        const point = {
            image: 'image-fake',
            name, 
            email,
            whatsapp,
            latitude, 
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) =>{
            return{
                item_id,
                point_id,
            };
        })
        await trx('point_items').insert(pointItems);
    
        await trx.commit();
        
        return response.json({
            id: point_id,
            ... point,
        });
    }
}


export default PointsController;