import request from 'supertest';
import app from '../src/app';

describe('test create profession', () => {
  test('Must return an object containing _id, name and createdAt keys', async() => {
    return await request('http://localhost:7000').post('/profession').send({
      name: 'Desenvolvedor'
    })
    .then(res => {
      expect(res.type).toEqual('application/json');
      expect(res.status).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
        "name": expect.any(String),
        "_id": expect.any(String),
        "createdAt": expect.any(String)
      }));
    })
  })
})
