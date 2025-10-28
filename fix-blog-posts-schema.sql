-- Add missing updated_at column to blog_posts table
-- Bu kodu Supabase SQL Editor'da çalıştırın

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing records to have updated_at = created_at
UPDATE blog_posts SET updated_at = created_at WHERE updated_at IS NULL;

-- Create trigger to automatically update updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;

-- Create new trigger
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
