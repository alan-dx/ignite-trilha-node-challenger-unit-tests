import { createConnection, getConnectionOptions } from 'typeorm';

(async () => {
  const defaultOptions = await getConnectionOptions()
  return await createConnection(
    Object.assign(defaultOptions, {
      host: "localhost",
      database: "fin_api"
    })
  )
})();
