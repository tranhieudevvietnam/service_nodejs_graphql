import { Autoloader } from "autoloader-ts";

export async function loadGraphqlSchema() {
  const loader = await Autoloader.dynamicImport();
  await loader.fromGlob(__dirname + "/../modules/**/*.schema.ts");
  const exports = loader.getResult().exports;
  return exports;
}
