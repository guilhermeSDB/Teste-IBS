import { Request, Response } from 'express';
import { Person } from '../../models/Person';

export async function findByIdPerson(req: Request, res: Response) {
  try {
    const { personId } = req.params;
    const person = await Person.findById(personId);

    if(person === null){
      return res.status(204).json('No Person Found');
    }

    await person.populate('profession');
    res.status(200).json(person);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}