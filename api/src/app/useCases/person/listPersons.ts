import { Request, Response } from 'express';
import { Person } from '../../models/Person';

export async function listPersons(req: Request, res: Response) {
  try {
    const persons = await Person.find()
      .sort({ createAt: 1 })
      .populate('profession')

    res.json(persons);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
