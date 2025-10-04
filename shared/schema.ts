import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const practiceAreas = pgTable("practice_areas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleKo: text("title_ko").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionKo: text("description_ko").notNull(),
  descriptionEn: text("description_en").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull(),
});

export const newsItems = pgTable("news_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleKo: text("title_ko").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionKo: text("description_ko"),
  descriptionEn: text("description_en"),
  category: text("category").notNull(),
  date: text("date").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleKo: text("title_ko").notNull(),
  titleEn: text("title_en").notNull(),
  contentKo: text("content_ko").notNull(),
  contentEn: text("content_en").notNull(),
  date: text("date").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const attorneys = pgTable("attorneys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameKo: text("name_ko").notNull(),
  nameEn: text("name_en").notNull(),
  titleKo: text("title_ko").notNull(),
  titleEn: text("title_en").notNull(),
  practiceAreasKo: text("practice_areas_ko").array().notNull(),
  practiceAreasEn: text("practice_areas_en").array().notNull(),
  imageUrl: text("image_url").notNull(),
  office: text("office").notNull(),
});

export const offices = pgTable("offices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameKo: text("name_ko").notNull(),
  nameEn: text("name_en").notNull(),
  addressKo: text("address_ko").notNull(),
  addressEn: text("address_en").notNull(),
  type: text("type").notNull(),
});

export const insertPracticeAreaSchema = createInsertSchema(practiceAreas).omit({
  id: true,
});

export const insertNewsItemSchema = createInsertSchema(newsItems).omit({
  id: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
});

export const insertAttorneySchema = createInsertSchema(attorneys).omit({
  id: true,
});

export const insertOfficeSchema = createInsertSchema(offices).omit({
  id: true,
});

export type InsertPracticeArea = z.infer<typeof insertPracticeAreaSchema>;
export type PracticeArea = typeof practiceAreas.$inferSelect;

export type InsertNewsItem = z.infer<typeof insertNewsItemSchema>;
export type NewsItem = typeof newsItems.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

export type InsertAttorney = z.infer<typeof insertAttorneySchema>;
export type Attorney = typeof attorneys.$inferSelect;

export type InsertOffice = z.infer<typeof insertOfficeSchema>;
export type Office = typeof offices.$inferSelect;
