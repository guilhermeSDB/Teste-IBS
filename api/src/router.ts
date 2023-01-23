import { Router } from 'express';

import { listPersons } from './app/useCases/person/listPersons';
import { findByIdPerson } from './app/useCases/person/findByIdPerson';
import { createPerson } from './app/useCases/person/createPerson';
import { updatePerson } from './app/useCases/person/updatePerson';
import { deletePerson } from './app/useCases/person/deletePerson';

import { listProfessions } from './app/useCases/profession/listProfessions';
import { findByIdProfession } from './app/useCases/profession/findByIdProfession';
import { createProfession } from './app/useCases/profession/createProfession';
import { updateProfession } from './app/useCases/profession/updateProfession';
import { deleteProfession } from './app/useCases/profession/deleteProfession';

const router = Router();

//#region Person 

// List Persons
router.get('/persons', listPersons);

// Find Person By Id
router.get('/person/:personId', findByIdPerson);

// Create Person
router.post('/person', createPerson);

// Update Person
router.put('/person/:personId', updatePerson);

// Delete Person
router.delete('/person/:personId', deletePerson);

//#endregion

//#region Profession

// List Professions
router.get('/professions', listProfessions);

// Find Person By Id
router.get('/profession/:professionId', findByIdProfession);

// Create Profession
router.post('/profession', createProfession);

// Update Profession
router.put('/profession/:professionId', updateProfession);

// Delete Person
router.delete('/profession/:professionId', deleteProfession);

//#endregion

export default router;