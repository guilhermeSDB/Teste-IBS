import { Request, Response } from 'express';
import { Person } from '../../models/Person';

export async function updatePerson(req: Request, res: Response) {
  try {
    const { personId } = req.params;
    const newBody = req.body
    console.log(newBody);

    await Person.findByIdAndUpdate(personId, newBody);
    res.sendStatus(204)
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
}
