-- Add new fields to affiliate_profiles table
ALTER TABLE "public"."affiliate_profiles" 
  ADD COLUMN IF NOT EXISTS "pronouns" text,
  ADD COLUMN IF NOT EXISTS "custom_pronouns" text,
  ADD COLUMN IF NOT EXISTS "country" text,
  ADD COLUMN IF NOT EXISTS "state" text,
  ADD COLUMN IF NOT EXISTS "reason" text,
  ADD COLUMN IF NOT EXISTS "excitement" integer,
  ADD COLUMN IF NOT EXISTS "contact_method" text,
  ADD COLUMN IF NOT EXISTS "email" text,
  ADD COLUMN IF NOT EXISTS "discord" text,
  ADD COLUMN IF NOT EXISTS "is_in_discord" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "heard_from" text,
  ADD COLUMN IF NOT EXISTS "platform" text DEFAULT 'AniList',
  ADD COLUMN IF NOT EXISTS "anilist_username" text,
  ADD COLUMN IF NOT EXISTS "anilist_avatar" text,
  ADD COLUMN IF NOT EXISTS "is_verified" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "is_public" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "is_approved" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "submitted_at" timestamptz;

-- Add validation checks
ALTER TABLE "public"."affiliate_profiles"
  ADD CONSTRAINT "excitement_range" CHECK (excitement >= 1 AND excitement <= 10),
  ADD CONSTRAINT "contact_method_values" CHECK (contact_method IN ('Email', 'Discord')),
  ADD CONSTRAINT "heard_from_values" CHECK (heard_from IN ('Twitter', 'Discord', 'Friend', 'Other'));

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_affiliate_profiles_anilist_username ON public.affiliate_profiles(anilist_username);
CREATE INDEX IF NOT EXISTS idx_affiliate_profiles_platform ON public.affiliate_profiles(platform);

-- Update RLS policies
ALTER TABLE "public"."affiliate_profiles" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view public profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON "public"."affiliate_profiles" FOR SELECT 
USING (is_public = true);

-- Allow profile owners to view their own profiles
CREATE POLICY "Users can view their own profiles" 
ON "public"."affiliate_profiles" FOR SELECT 
USING (auth.uid() = user_id);

-- Allow profile owners to update their own profiles
CREATE POLICY "Users can update their own profiles" 
ON "public"."affiliate_profiles" FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow new users to create their profile
CREATE POLICY "Users can create their own profile" 
ON "public"."affiliate_profiles" FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
ON "public"."affiliate_profiles" FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Allow admins to update any profile
CREATE POLICY "Admins can update any profile" 
ON "public"."affiliate_profiles" FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = id 
    AND raw_user_meta_data->>'role' = 'admin'
  )
); 