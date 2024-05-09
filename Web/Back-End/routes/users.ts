import DBControllerFactory from "../Factory/DBControllerFactory";

/* GET users listing. */
async function init() {
  let dbInstance = DBControllerFactory.createInstance();
  let initDB = await dbInstance.initialize();
  let popDB = await dbInstance.populate();

  return "Database initialized"
}

init().then(res => console.log(res));
