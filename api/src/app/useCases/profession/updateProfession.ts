import { Request, Response } from 'express';
import { Profession } from '../../models/Profession';

export async function updateProfession(req: Request, res: Response) {
  try {
    const { professionId } = req.params;
    const newBody = req.body;
    await Profession.findByIdAndUpdate(professionId, newBody);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}