'use strict';

function defineEndpoint(config) {
    return config;
}

var index = defineEndpoint((router) => {
  router.get("/", (_req, res) => res.send("Hello, From Directus Dockerization!"));
});

module.exports = index;
//# sourceMappingURL=index.js.map
