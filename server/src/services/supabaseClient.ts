/**
 * Supabase Connector Service
 * Enables optional Supabase synchronization for Ideal Career Institute.
 */

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  serviceRoleKey?: string;
  isConfigured: boolean;
}

export const supabaseConfig: SupabaseConfig = {
  url: process.env.SUPABASE_URL,
  anonKey: process.env.SUPABASE_ANON_KEY,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  isConfigured: !!(process.env.SUPABASE_URL && (process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY))
};

export async function syncLeadToSupabase(leadData: any): Promise<{ synced: boolean; error?: string }> {
  if (!supabaseConfig.isConfigured) {
    return { synced: false, error: 'SUPABASE_NOT_CONFIGURED' };
  }

  try {
    const endpoint = `${supabaseConfig.url}/rest/v1/enquiries`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': supabaseConfig.serviceRoleKey || supabaseConfig.anonKey || '',
        'Authorization': `Bearer ${supabaseConfig.serviceRoleKey || supabaseConfig.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(leadData)
    });

    if (res.ok) {
      return { synced: true };
    } else {
      const err = await res.text();
      return { synced: false, error: err };
    }
  } catch (err: any) {
    return { synced: false, error: err.message };
  }
}
