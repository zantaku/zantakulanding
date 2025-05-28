-- Add user_id column to affiliate_profiles table
ALTER TABLE "public"."affiliate_profiles" 
ADD COLUMN "user_id" UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add any existing users to profiles
-- Note: This won't actually run unless you have an admin/service role key
-- and you'd need to populate with actual user IDs

-- Create an index on user_id for faster lookups
CREATE INDEX idx_affiliate_profiles_user_id ON public.affiliate_profiles(user_id);

-- Add Row Level Security policies

-- Enable RLS on the table
ALTER TABLE "public"."affiliate_profiles" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view any profile
CREATE POLICY "Profiles are viewable by everyone" 
ON "public"."affiliate_profiles" FOR SELECT USING (true);

-- Create policy to allow users to update only their own profile
CREATE POLICY "Users can update their own profile" 
ON "public"."affiliate_profiles" FOR UPDATE USING (
  auth.uid() = user_id
);

-- Create policy to allow users to insert if they don't already have a profile
CREATE POLICY "Users can insert their own profile" 
ON "public"."affiliate_profiles" FOR INSERT WITH CHECK (
  auth.uid() = user_id 
  AND NOT EXISTS (
    SELECT 1 FROM public.affiliate_profiles 
    WHERE user_id = auth.uid()
  )
);

-- Also add RLS for social links
ALTER TABLE "public"."affiliate_social_links" ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing social links
CREATE POLICY "Social links are viewable by everyone" 
ON "public"."affiliate_social_links" FOR SELECT USING (true);

-- Create policy for updating social links (check if user owns the profile)
CREATE POLICY "Users can update their own social links" 
ON "public"."affiliate_social_links" FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.affiliate_profiles 
    WHERE id = affiliate_social_links.profile_id 
    AND user_id = auth.uid()
  )
);

-- Create policy for inserting social links
CREATE POLICY "Users can insert their own social links" 
ON "public"."affiliate_social_links" FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.affiliate_profiles 
    WHERE id = affiliate_social_links.profile_id 
    AND user_id = auth.uid()
  )
);

-- Create policy for deleting social links
CREATE POLICY "Users can delete their own social links" 
ON "public"."affiliate_social_links" FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.affiliate_profiles 
    WHERE id = affiliate_social_links.profile_id 
    AND user_id = auth.uid()
  )
); 