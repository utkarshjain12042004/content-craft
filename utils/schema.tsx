import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutput', {
    id: serial('id').primaryKey(),
    formData:varchar('formdata').notNull(),
    aiResponse:text('aiResponse').notNull(),
    templateSlug:varchar('templateSlug').notNull(),
    templateName:varchar('templateName').notNull(),
    templateIcon:varchar('templateIcon').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull()
})