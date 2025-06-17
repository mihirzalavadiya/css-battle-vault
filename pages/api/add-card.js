import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, description, code, image_url } = req.body;

  const { data, error } = await supabase.from('items').insert([
    {
      title,
      description,
      code,
      image_url,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Card added successfully', data });
}
