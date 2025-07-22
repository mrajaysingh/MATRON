/*
  # Create admin users table and authentication

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `email` (text, unique)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `admin_users` table
    - Add policies for authenticated users
*/

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Insert initial admin user
INSERT INTO admin_users (id, username, email)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'matronadmin',
  'coderxajay@gmail.com'
) ON CONFLICT DO NOTHING;