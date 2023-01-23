import { Request, Response } from 'express';
import { Person } from '../../models/Person';

export async function deletePerson(req: Request, res: Response) {
  try{
    const { personId } = req.params;

    await Person.findByIdAndDelete(personId);
    res.status(204).json({ message: 'Person deleted successfully' });
  } catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}
