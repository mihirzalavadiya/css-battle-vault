import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  const { data, error } = await supabase.from('items').select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
