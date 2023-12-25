'use strict';

function defineEndpoint(config) {
    return config;
}

var R={fetch:globalThis.fetch,WebSocket:globalThis.WebSocket,URL:globalThis.URL},w=(e,t={})=>{let o=t.globals?{...R,...t.globals}:R;return {globals:o,url:new o.URL(e),with(s){return {...this,...s(this)}}}};function D(e){return typeof e!="object"||!e?!1:"headers"in e&&"ok"in e&&"json"in e&&typeof e.json=="function"&&"text"in e&&typeof e.json=="function"}async function g(e){if(!(typeof e!="object"||!e)){if(D(e)){let t=e.headers.get("Content-Type")?.toLowerCase();if(t?.startsWith("application/json")||t?.startsWith("application/health+json")){let o=await e.json();if(!e.ok)throw o;return "data"in o?o.data:o}if(t?.startsWith("text/html")||t?.startsWith("text/plain")){let o=await e.text();if(!e.ok)throw o;return o}return e}return "data"in e?e.data:e}}var y=async(e,t,o=globalThis.fetch)=>{t.headers=typeof t.headers=="object"&&!Array.isArray(t.headers)?t.headers:{};let s=await o(e,t);return g(s).catch(m=>{throw {errors:typeof m=="object"&&"errors"in m?m.errors:m,response:s}})};var O=e=>{let t={};if(Array.isArray(e.fields)&&e.fields.length>0){let o=(s,m=[])=>{if(typeof s=="object"){let c=[];for(let a in s){let n=s[a]??[];if(Array.isArray(n))for(let d of n)c.push(o(d,[...m,a]));else if(typeof n=="object")for(let d of Object.keys(n)){let f=n[d];for(let l of f)c.push(o(l,[...m,`${a}:${d}`]));}}return c.flatMap(a=>a)}return [...m,String(s)].join(".")};t.fields=e.fields.flatMap(s=>o(s)).join(",");}e.filter&&Object.keys(e.filter).length>0&&(t.filter=JSON.stringify(e.filter)),e.search&&(t.search=e.search),"sort"in e&&e.sort&&(t.sort=typeof e.sort=="string"?e.sort:e.sort.join(",")),typeof e.limit=="number"&&e.limit>=-1&&(t.limit=String(e.limit)),typeof e.offset=="number"&&e.offset>=0&&(t.offset=String(e.offset)),typeof e.page=="number"&&e.page>=1&&(t.page=String(e.page)),e.deep&&Object.keys(e.deep).length>0&&(t.deep=JSON.stringify(e.deep)),e.alias&&Object.keys(e.alias).length>0&&(t.alias=JSON.stringify(e.alias)),e.aggregate&&Object.keys(e.aggregate).length>0&&(t.aggregate=JSON.stringify(e.aggregate)),e.groupBy&&e.groupBy.length>0&&(t.groupBy=e.groupBy.join(","));for(let[o,s]of Object.entries(e))o in t||(typeof s=="string"||typeof s=="number"||typeof s=="boolean"?t[o]=String(s):t[o]=JSON.stringify(s));return t};var r=(e,t)=>{if(e.length===0)throw new Error(t)};var h=(e,t)=>{if(String(e).startsWith("directus_"))throw new Error(t)};var Ss=(e,t)=>()=>(r(String(e),"Collection cannot be empty"),h(e,"Cannot use readItems for core collections"),{path:`/items/${e}`,params:t??{},method:"GET"});var F={},xi=(e={})=>t=>{let o={...F,...e};return {async request(s){let m=s();if(m.headers||(m.headers={}),"Content-Type"in m.headers?m.headers["Content-Type"]==="multipart/form-data"&&delete m.headers["Content-Type"]:m.headers["Content-Type"]="application/json","getToken"in this){let d=await this.getToken();d&&(m.headers||(m.headers={}),m.headers.Authorization=`Bearer ${d}`);}let c=S(t.url,m.path,m.params),a={method:m.method??"GET",headers:m.headers??{}};"credentials"in o&&(a.credentials=o.credentials),m.body&&(a.body=m.body),m.onRequest&&(a=await m.onRequest(a)),o.onRequest&&(a=await o.onRequest(a));let n=await y(c.toString(),a,t.globals.fetch);return "onResponse"in m&&(n=await m.onResponse(n,a)),"onResponse"in e&&(n=await e.onResponse(n,a)),n}}};var b="/",A=(e,t)=>(e.endsWith(b)&&(e=e.slice(0,-1)),t.startsWith(b)||(t=b+t),e+t),S=(e,t,o)=>{let s=e.pathname===b?t:A(e.pathname,t),m=new globalThis.URL(s,e);if(o)for(let[c,a]of Object.entries(O(o)))if(a&&typeof a=="object"&&!Array.isArray(a))for(let[n,d]of Object.entries(a))m.searchParams.set(`${c}[${n}]`,String(d));else m.searchParams.set(c,a);return m};

const client = w("https://lionfish-app-c9ayl.ondigitalocean.app").with(xi());
var index = defineEndpoint(async (router, { services, database, getSchema }) => {
  const { ItemsService } = services;
  const petsService = new ItemsService("pets", {
    knex: database,
    schema: await getSchema()
  });
  router.post("/", async (req, res) => {
    try {
      const { name, age, breed } = req.body;
      const createdPet = await petsService.createOne({
        name,
        age,
        breed
      });
      res.json(createdPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
  router.get("/", async (_req, res) => {
    try {
      const pets = await petsService.readMany();
      res.json(pets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const petId = req.params.id;
      const result = await client.request(
        Ss("pets", {
          // search: petId,
          filter: {
            "id": {
              "_eq": petId
            }
          },
          fields: [
            "id",
            "age",
            "name",
            { "breed": ["type", "geography"] }
          ]
        })
      );
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
  router.patch("/:id", async (req, res) => {
    try {
      const petId = req.params.id;
      const { name, age, breed } = req.body;
      const updatedPet = await petsService.updateOne(petId, {
        name,
        age,
        breed
      });
      res.json(updatedPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const petId = req.params.id;
      await petsService.deleteOne(petId);
      res.json({ message: "Pet deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
});

module.exports = index;
