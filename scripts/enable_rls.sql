-- Fix Supabase RLS Configuration for ApexVerse
-- This enables Row Level Security and creates permissive policies
-- to allow the API to access the tables

-- Enable RLS on testimonials table
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations on testimonials
-- This is permissive for now; you can restrict it later based on your auth needs
CREATE POLICY "Allow all access to testimonials"
ON public.testimonials
FOR ALL
USING (true)
WITH CHECK (true);

-- Enable RLS on contact_submissions table
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations on contact_submissions
CREATE POLICY "Allow all access to contact_submissions"
ON public.contact_submissions
FOR ALL
USING (true)
WITH CHECK (true);

-- Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('testimonials', 'contact_submissions');
