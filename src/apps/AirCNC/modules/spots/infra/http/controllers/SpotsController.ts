import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSpotService from '@apps/AirCNC/modules/spots/services/CreateSpotService';
import ListSpotsService from '@apps/AirCNC/modules/spots/services/ListSpotsService';

export default class SpotsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { techs } = request.query;

    const listSpotsService = container.resolve(ListSpotsService);

    const spots = await listSpotsService.execute({ techs: techs as string[] });

    return response.json(spots);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { company, techs, price } = request.body;
    const { user_id } = request.headers;

    const createUserService = container.resolve(CreateSpotService);

    const spot = await createUserService.execute({
      thumbnail: filename,
      company,
      price,
      techs,
      user_id: user_id as string,
    });

    return response.json(spot);
  }
}
