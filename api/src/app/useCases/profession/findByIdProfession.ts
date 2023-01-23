import { Request, Response } from 'express';
import { Profession } from '../../models/Profession';

export async function findByIdProfession(req: Request, res: Response) {
  try {
    const { professionId } = req.params;
    const profession = await Profession.findById(professionId);
    
    if(profession === null){
      return res.status(204).json('No Profession Found');
    }

    res.status(200).json(profession);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}