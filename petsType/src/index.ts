import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint(async (router, { services, database, getSchema }) => {
  const { ItemsService } = services;

  const petsTypeService = new ItemsService("petType", {
      knex: database,
      schema: await getSchema(),
  });
  // const petsTypeService = services.collections['pets'];

  // List Operation (Create a new pet)
  router.post('/', async (req: any, res: any) => {
    try {
      const { type, geography, character} = req.body;
      const createdPet = await petsTypeService.createOne({
        type,
				geography,
				character
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
      const petsType = await petsTypeService.readMany();
      res.json(petsType);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });

  // Read a single pet by ID
  router.get('/:id', async (req: any, res: any) => {
    try {
      const petTypeId = req.params.id;
      const petType = await petsTypeService.readOne(petTypeId);
      res.json(petType);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });

  // Update a pet by ID
  router.patch('/:id', async (req: any, res: any) => {
    try {
      const petTypeId = req.params.id;
      const { type, geography, character } = req.body;
      const updatedPet = await petsTypeService.updateOne(petTypeId, {
        type,
				geography,
				character
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
      const petTypeId = req.params.id;
      await petsTypeService.deleteOne(petTypeId);
      res.json({ message: 'Pet Type deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  });
});