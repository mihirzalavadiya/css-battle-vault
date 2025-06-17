'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

const AdminUploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = null;

    if (formData.image) {
      const fileExt = formData.image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, formData.image);

      if (uploadError) {
        setMessage('Image upload failed');
        setUploading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    const { error } = await supabase.from('items').insert([
      {
        title: formData.title,
        description: formData.description,
        code: formData.code,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      setMessage('Failed to save data');
    } else {
      setMessage('Card added successfully!');
      setFormData({
        title: '',
        description: '',
        code: '',
        image: null,
      });
    }

    setUploading(false);
  };

  return (
    <div className="admin-upload-wrapper">
      <form onSubmit={handleSubmit} className="admin-upload-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <textarea
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AdminUploadForm;
