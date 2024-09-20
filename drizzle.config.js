/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://AI-App_owner:VNcWMe1AJ6ZY@ep-aged-poetry-a2bkkkaa.eu-central-1.aws.neon.tech/AI-App?sslmode=require',
    }
  };
