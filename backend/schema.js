import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const partners = pgTable('partners', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  logoUrl: text('logo_url').notNull(),
  website: text('website').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const committee = pgTable('committee', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  bio: text('bio').notNull(),
  email: text('email').notNull(),
  linkedin: text('linkedin').default(''),
  twitter: text('twitter').default(''),
  imageUrl: text('image_url').default(''),
  createdAt: timestamp('created_at').defaultNow(),
})

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  eventDate: timestamp('event_date').notNull(),
  location: text('location').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
