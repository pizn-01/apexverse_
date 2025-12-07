// Only load dotenv in development (Vercel provides env vars directly)
if (process.env.NODE_ENV !== 'production') {
  // Use require for synchronous loading in development
  require('dotenv').config();
}

import { type ContactSubmission, type InsertContactSubmission, type Testimonial, type InsertTestimonial, contactSubmissions, testimonials } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
const { Pool } = pg;
import { desc, eq } from 'drizzle-orm';

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: string): Promise<ContactSubmission | undefined>;

  // Testimonials methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
}

// PostgreSQL Storage Implementation
export class PostgresStorage implements IStorage {
  private db;

  constructor(connectionString: string) {
    // Optimize pool for serverless environment
    const pool = new Pool({
      connectionString,
      max: 1, // Limit connections in serverless
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
    this.db = drizzle(pool);
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await this.db
      .insert(contactSubmissions)
      .values({
        name: insertSubmission.name,
        email: insertSubmission.email,
        subject: insertSubmission.subject ?? null,
        message: insertSubmission.message,
      })
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await this.db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id: string): Promise<ContactSubmission | undefined> {
    const [submission] = await this.db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id));
    return submission;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await this.db
      .insert(testimonials)
      .values({
        platform: insertTestimonial.platform,
        postUrl: insertTestimonial.postUrl,
        authorName: insertTestimonial.authorName,
        authorHandle: insertTestimonial.authorHandle ?? null,
        content: insertTestimonial.content,
        imageUrl: insertTestimonial.imageUrl ?? null,
      })
      .returning();
    return testimonial;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await this.db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const [testimonial] = await this.db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id));
    return testimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await this.db
      .delete(testimonials)
      .where(eq(testimonials.id, id))
      .returning();
    return result.length > 0;
  }
}

// In-Memory Storage Implementation (for development without database)
export class MemStorage implements IStorage {
  private contactSubmissions: Map<string, ContactSubmission>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.contactSubmissions = new Map();
    this.testimonials = new Map();
    console.log("⚠️  Using in-memory storage. Data will be lost on restart. Set DATABASE_URL to use persistent storage.");
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      id,
      name: insertSubmission.name,
      email: insertSubmission.email,
      subject: insertSubmission.subject ?? null,
      message: insertSubmission.message,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContactSubmission(id: string): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = {
      id,
      platform: insertTestimonial.platform,
      postUrl: insertTestimonial.postUrl,
      authorName: insertTestimonial.authorName,
      authorHandle: insertTestimonial.authorHandle ?? null,
      content: insertTestimonial.content,
      imageUrl: insertTestimonial.imageUrl ?? null,
      createdAt: new Date(),
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonials.delete(id);
  }
}

// Auto-select storage based on environment
// If DATABASE_URL is set, use PostgreSQL; otherwise use in-memory storage
export const storage: IStorage = process.env.DATABASE_URL
  ? new PostgresStorage(process.env.DATABASE_URL)
  : new MemStorage();

// Log which storage is being used
if (process.env.DATABASE_URL) {
  console.log("✅ Using PostgreSQL storage");
} else {
  console.log("⚠️  DATABASE_URL not set - using in-memory storage (data will not persist)");
}

