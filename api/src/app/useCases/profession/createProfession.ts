import { Request, Response } from 'express';
import { Profession } from '../../models/Profession';

export async function createProfession(req: Request, res: Response) {
  try{
    const { name } = req.body;

    if(!name){
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    const profession = await Profession.create({ name });

    res.status(201).json(profession);
  } catch(error){

    console.log(error);
    res.sendStatus(500);

  }
}
