'use strict';

function defineEndpoint(config) {
    return config;
}

var index = defineEndpoint(async (router, { services, database, getSchema }) => {
  const { ItemsService } = services;
  const petsTypeService = new ItemsService("petType", {
    knex: database,
    schema: await getSchema()
  });
  router.post("/", async (req, res) => {
    try {
      const { type, geography, character } = req.body;
      const createdPet = await petsTypeService.createOne({
        type,
        geography,
        character
      });
      res.json(createdPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
  router.get("/", async (_req, res) => {
    try {
      const petsType = await petsTypeService.readMany();
      res.json(petsType);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const petTypeId = req.params.id;
      const petType = await petsTypeService.readOne(petTypeId);
      res.json(petType);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
  router.patch("/:id", async (req, res) => {
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
      res.status(500).json({ error });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const petTypeId = req.params.id;
      await petsTypeService.deleteOne(petTypeId);
      res.json({ message: "Pet Type deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
});

module.exports = index;
