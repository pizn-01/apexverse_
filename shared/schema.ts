import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Testimonials Schema
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(), // 'instagram' or 'x'
  postUrl: text("post_url").notNull(),
  authorName: text("author_name").notNull(),
  authorHandle: text("author_handle"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  platform: true,
  postUrl: true,
  authorName: true,
  authorHandle: true,
  content: true,
  imageUrl: true,
}).extend({
  platform: z.enum(['instagram', 'x'], {
    errorMap: () => ({ message: "Platform must be 'instagram' or 'x'" })
  }),
  postUrl: z.string().url("Please enter a valid URL"),
  authorName: z.string().min(1, "Author name is required"),
  content: z.string().min(1, "Content is required"),
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Portfolio Items Schema
export const portfolioItems = pgTable("portfolio_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  lineArtUrl: text("line_art_url").notNull(),
  fullArtUrl: text("full_art_url").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).pick({
  title: true,
  category: true,
  lineArtUrl: true,
  fullArtUrl: true,
  description: true,
}).extend({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  lineArtUrl: z.string().url("Please enter a valid URL for line art"),
  fullArtUrl: z.string().url("Please enter a valid URL for full art"),
  description: z.string().optional(),
});

export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
