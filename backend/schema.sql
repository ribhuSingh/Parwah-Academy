-- Schema for PERN app

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS committee (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT DEFAULT '',
  twitter TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Example seed (password is hashed with bcrypt)
-- Test account: email=admin@test.com, password=admin123
INSERT INTO users (name, email, password) VALUES ('Admin User','admin@test.com','$2b$10$8J0p0vZL3cFPKEZM8D9HYO5JxNKPmQ8PJ8V6m4zQ1R.2kZVhKZK7e') ON CONFLICT (email) DO NOTHING;

INSERT INTO partners (name, category, description, logo_url, website) VALUES
  ('Global Sports Equipment', 'Equipment Supplier', 'Leading provider of high-quality sports equipment for professional athletes and teams worldwide.', '/assets/E1.jpeg', '#'),
  ('Health First Medical', 'Healthcare Partner', 'Specialized medical services for athletes, focusing on sports medicine, injury prevention, and rehabilitation.', '/assets/E2.jpeg', '#'),
  ('City Marathon Organizers', 'Event Organizer', 'Organizers of the annual city marathon, hosting thousands of runners from around the world.', '/assets/E3.jpeg', '#')
ON CONFLICT DO NOTHING;

INSERT INTO committee (name, role, bio, email, linkedin, twitter, image_url) VALUES
  ('Dr. Sarah Johnson', 'President', 'Dr. Johnson is a former Olympic athlete with over 20 years of experience in sports administration.', 'president@sportsfederation.org', '#', '#', '/assets/M1.jpeg'),
  ('Michael Chen', 'Vice President', 'With a background in sports medicine and business administration, Michael oversees our athlete development programs and strategic partnerships.', 'vp@sportsfederation.org', '#', '#', '/assets/M2.jpeg'),
  ('Elena Rodriguez', 'Secretary General', 'Elena brings extensive experience in international sports governance and has represented our federation at global sporting events for over a decade.', 'secretary@sportsfederation.org', '#', '#', '/assets/M3.jpeg')
ON CONFLICT DO NOTHING;

INSERT INTO events (title, description, event_date, location) VALUES
  ('Annual Sports Gala', 'Celebrate the achievements of our athletes with awards and performances.', '2024-06-15 18:00:00+00', 'Grand Hall, Sports Center'),
  ('Youth Training Workshop', 'Interactive workshop for young athletes to learn new skills and techniques.', '2024-07-20 10:00:00+00', 'Training Field A'),
  ('Community Open Day', 'Open day for the community to participate in various sports activities.', '2024-08-10 09:00:00+00', 'Main Stadium')
ON CONFLICT DO NOTHING;

INSERT INTO partners (name, category, description, logo_url, website) VALUES
  ('Global Sports Equipment', 'Equipment Supplier', 'Leading provider of high-quality sports equipment for professional athletes and teams worldwide.', '/assets/E1.jpeg', '#'),
  ('Health First Medical', 'Healthcare Partner', 'Specialized medical services for athletes, focusing on sports medicine, injury prevention, and rehabilitation.', '/assets/E2.jpeg', '#'),
  ('City Marathon Organizers', 'Event Organizer', 'Organizers of the annual city marathon, hosting thousands of runners from around the world.', '/assets/E3.jpeg', '#')
ON CONFLICT DO NOTHING;

INSERT INTO committee (name, role, bio, email, linkedin, twitter, image_url) VALUES
  ('Dr. Sarah Johnson', 'President', 'Dr. Johnson is a former Olympic athlete with over 20 years of experience in sports administration.', 'president@sportsfederation.org', '#', '#', '/assets/M1.jpeg'),
  ('Michael Chen', 'Vice President', 'With a background in sports medicine and business administration, Michael oversees our athlete development programs and strategic partnerships.', 'vp@sportsfederation.org', '#', '#', '/assets/M2.jpeg'),
  ('Elena Rodriguez', 'Secretary General', 'Elena brings extensive experience in international sports governance and has represented our federation at global sporting events for over a decade.', 'secretary@sportsfederation.org', '#', '#', '/assets/M3.jpeg')
ON CONFLICT DO NOTHING;
