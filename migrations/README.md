# Database Migrations

This directory contains SQL migrations for the Zantaku Supabase database.

## Adding User Authentication to Profiles

The main migration adds authentication support to affiliate profiles, allowing users to create accounts and edit their profiles after submission.

### Migration Steps

1. Connect to your Supabase project SQL Editor
2. Run the SQL in `add_user_id_to_profiles.sql`
3. Ensure RLS (Row Level Security) is enabled in the Supabase dashboard
4. Set up email authentication in the Supabase Auth settings

### Schema Changes

The migration adds:
- A `user_id` column to the `affiliate_profiles` table
- Security policies to control access to profiles and social links
- Indexes for better performance

### Security Model

This migration implements the following security model:

- Any visitor can view all profiles (read-only)
- Only authenticated profile owners can edit their own profiles
- Only authenticated profile owners can add/edit/delete their own social links
- Profiles are associated with user accounts via the user_id column

### User Experience Flow

1. User enters the custom link wizard
2. User completes profile details
3. User creates an account or signs in
4. User's account is linked to their profile
5. User can edit their profile anytime when signed in

### Troubleshooting

If you encounter issues after migration:

1. Verify that the `user_id` column was added correctly
2. Check that RLS policies are active in the Supabase dashboard
3. Test authentication flows in development before going to production

For more information, refer to the [Supabase Auth documentation](https://supabase.com/docs/guides/auth/overview). 