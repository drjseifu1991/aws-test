import { defineEndpoint } from '@directus/extensions-sdk';
import { createDirectus, rest, readItems } from '@directus/sdk';

const client = createDirectus('https://lionfish-app-c9ayl.ondigitalocean.app').with(rest());

export default defineEndpoint(async (router, { services, database, getSchema }) => {
  const { ItemsService } = services;

  const petsService = new ItemsService("pets", {
      knex: database,
      schema: await getSchema(),
  });
  // const petsService = services.collections['pets'];

  // List Operation (Create a new pet)
  router.post('/', async (req: any, res: any) => {
    try {
      const { name, age, breed } = req.body;
      const createdPet = await petsService.createOne({
        name,
        age,
        breed,
      });

      res.json(createdPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });

  // Read all pets
  router.get('/', async (_req: any, res: any) => {
    try {
      const pets = await petsService.readMany();
      res.json(pets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });

  // Read a single pet by ID
  router.get('/:id', async (req: any, res: any) => {
    try {
      const petId = req.params.id;
      // const pet = await petsService.readOne(petId);
      
      const result = await client.request(
        readItems('pets', {
          // search: petId,
          filter: {
            'id': {
              '_eq': petId
            }
          },
          fields: [
            'id',
            'age',
            'name', 
            { "breed": ['type', 'geography'] }
          ]
        })
      );
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });

  // Update a pet by ID
  router.patch('/:id', async (req: any, res: any) => {
    try {
      const petId = req.params.id;
      const { name, age, breed } = req.body;
      const updatedPet = await petsService.updateOne(petId, {
        name,
        age,
        breed,
      });

      res.json(updatedPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });

  // Delete a pet by ID
  router.delete('/:id', async (req: any, res: any) => {
    try {
      const petId = req.params.id;
      await petsService.deleteOne(petId);
      res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });
});
