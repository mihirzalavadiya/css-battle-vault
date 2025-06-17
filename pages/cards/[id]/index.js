import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import BackArrow from '@/components/BackArrow';
import CodeBlock from '@/components/CodeBlock';

const CardDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCard = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCard(data);
      }
      setLoading(false);
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!card) return <p>No card found.</p>;

  return (
    <div className="card-detail-container">
      <div className="custom-card-detail">
        <BackArrow />
        <div className="custom-card-body">
          <img
            src={card.image_url}
            alt="Card background"
            className="custom-card-detail-image"
            style={{ maxWidth: '600px', height: 'auto', borderRadius: '8px' }}
          />
        </div>
        <div className="custom-card-header">
          <p className="custom-card-label">{card.description}</p>
          <small className="custom-card-subtext">{card.created_date}</small>
          <h4 className="custom-card-title">{card.title}</h4>
          <CodeBlock code={card.code} />
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
