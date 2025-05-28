import { supabase } from './supabase'

// Read all rows
export async function getAllProfiles() {
  const { data, error } = await supabase
    .from('affiliate_profiles')
    .select('*')
  return { data, error }
}

// Read specific columns
export async function getProfileColumns(username: string) {
  const { data, error } = await supabase
    .from('affiliate_profiles')
    .select('username,pfp_url,about,why_zantaku')
    .eq('username', username)
    .single()
  return { data, error }
}

// Read with referenced tables (joins)
export async function getProfileWithSocials(username: string) {
  const { data, error } = await supabase
    .from('affiliate_profiles')
    .select(`
      *,
      affiliate_social_links (
        id,
        platform_name,
        url,
        position
      )
    `)
    .eq('username', username)
    .single()
  return { data, error }
}

// Read with pagination
export async function getProfilesPaginated(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1
  
  const { data, error } = await supabase
    .from('affiliate_profiles')
    .select('*')
    .range(start, end)
  
  return { data, error }
} 