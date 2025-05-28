import { supabase } from '../lib/supabase';

/**
 * Creates a launch timer in Supabase if it doesn't exist
 * This is useful for development to ensure the timer exists
 * 
 * @param label The unique identifier for the timer
 * @param daysFromNow Days from current date for the timer to expire
 * @returns The created or existing timer
 */
export async function createLaunchTimer(label: string = 'site-launch', daysFromNow: number = 30) {
  try {
    // Check if timer exists first
    if (import.meta.env.DEV) {
      console.log('Checking for existing timer with label:', label);
    }
    const { data: existingTimer, error: fetchError } = await supabase
      .from('launch_timer')
      .select('*')
      .eq('label', label)
      .single();

    if (fetchError) {
      // If error is not a "no rows returned" error, it's a real error
      if (fetchError.code !== 'PGRST116') {
        console.error('Error checking for existing timer:', fetchError);
        throw fetchError;
      }
      if (import.meta.env.DEV) {
        console.log('No existing timer found with label:', label);
      }
    }

    if (existingTimer) {
      if (import.meta.env.DEV) {
        console.log('Launch timer already exists:', existingTimer);
      }
      return existingTimer;
    }

    // Create a new date, daysFromNow in the future
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + daysFromNow);
    if (import.meta.env.DEV) {
      console.log('Creating new timer with expiration:', expiresAt);
    }

    // Insert new timer
    const { data, error } = await supabase
      .from('launch_timer')
      .insert([
        { label, expires_at: expiresAt.toISOString() }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating launch timer:', error);
      throw error;
    }

    if (import.meta.env.DEV) {
      console.log('Created new launch timer:', data);
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in createLaunchTimer:', error);
    throw error;
  }
} 