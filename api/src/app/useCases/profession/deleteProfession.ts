import { Request, Response } from 'express';
import { Profession } from '../../models/Profession';

export async function deleteProfession(req: Request, res: Response) {
  try{
    const { professionId } = req.params;

    await Profession.findByIdAndDelete(professionId);
    res.status(204).json({ message: 'Profession deleted successfully' });
  } catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}
