import { Request, Response } from 'express';
import { Person } from '../../models/Person';

export async function createPerson(req: Request, res: Response) {
  try{
    const { 
      imageUrl,
      name,
      phone,
      email,
      profession
    } = req.body;

    if(!name){
      return res.status(400).json({
        error: 'Name is required',
      });
    }else if (!phone){
      return res.status(400).json({
        error: 'Phone is required',
      });
    }else if (!email){
      return res.status(400).json({
        error: 'Email is required',
      });
    }else if (!profession){
      return res.status(400).json({
        error: 'Profession is required',
      });
    }

    const person = await Person.create({
      imageUrl,
      name, 
      phone, 
      email, 
      profession 
    });

    await person.populate('profession');

    res.status(201).json(person);
  } catch(error){

    console.log(error);
    res.sendStatus(500);

  }
}
