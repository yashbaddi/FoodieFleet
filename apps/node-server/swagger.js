import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openapiPath = path.resolve(__dirname, "./openapi.yaml");
const openapiFile = fs.readFileSync(openapiPath, "utf8");
const swaggerSpec = YAML.parse(openapiFile);

export { swaggerUi, swaggerSpec };
