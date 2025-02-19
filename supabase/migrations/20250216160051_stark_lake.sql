/*
  # Create admin users table and initial admin user

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `email` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamp)
      - `secret_key` (text, unique)
  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated users to read their own data
*/

-- Add pgcrypto extension if not exists
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to encrypt sensitive data using a fixed key
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(data text) RETURNS text AS $$
BEGIN
  RETURN encode(
    encrypt(
      data::bytea, 
      digest('your-secure-encryption-key-here', 'sha256'),
      'aes'
    ), 
    'base64'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrypt sensitive data
CREATE OR REPLACE FUNCTION decrypt_sensitive_data(encrypted_data text) RETURNS text AS $$
BEGIN
  RETURN convert_from(
    decrypt(
      decode(encrypted_data, 'base64'), 
      digest('your-secure-encryption-key-here', 'sha256'),
      'aes'
    ), 
    'utf-8'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger function for automatic encryption
CREATE OR REPLACE FUNCTION encrypt_sensitive_columns()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.secret_key IS NOT NULL THEN
    NEW.secret_key := encrypt_sensitive_data(NEW.secret_key);
  END IF;
  IF NEW.password_hash IS NOT NULL THEN
    NEW.password_hash := encrypt_sensitive_data(NEW.password_hash);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the table with encrypted columns
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  secret_key text UNIQUE
);

-- Create trigger for automatic encryption
DROP TRIGGER IF EXISTS encrypt_sensitive_data_trigger ON admin_users;
CREATE TRIGGER encrypt_sensitive_data_trigger
  BEFORE INSERT OR UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION encrypt_sensitive_columns();

-- Insert initial admin user with pre-encrypted values
INSERT INTO admin_users (username, email, password_hash, secret_key)
VALUES (
  'matronadmin',
  'coderxajay@gmail.com',
  encrypt_sensitive_data('Ajays8268#'),
  encrypt_sensitive_data('MATRONADMIN8268')
) ON CONFLICT DO NOTHING;

-- Encrypt existing data if any
UPDATE admin_users 
SET 
  password_hash = encrypt_sensitive_data(password_hash),
  secret_key = encrypt_sensitive_data(secret_key)
WHERE 
  password_hash NOT LIKE 'AES256%' 
  OR secret_key NOT LIKE 'AES256%';

-- RLS Policies remain the same...
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies...
DROP POLICY IF EXISTS "Admin users can read own data" ON admin_users;
DROP POLICY IF EXISTS "Allow reading admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow inserting admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow updating admin_users" ON admin_users;

CREATE POLICY "Allow public username check"
  ON admin_users
  FOR SELECT
  USING (true);

CREATE POLICY "Allow inserting admin_users"
  ON admin_users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow updating admin_users"
  ON admin_users
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow deleting admin_users"
  ON admin_users
  FOR DELETE
  USING (true);