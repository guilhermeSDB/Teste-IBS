import { Request, Response } from 'express';
import { Profession } from '../../models/Profession';

export async function listProfessions(req: Request, res: Response) {
  try {
    const professions = await Profession.find()
      .sort({ createAt: 1 })

    res.json(professions);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
