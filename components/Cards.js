'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import Loader from './Loader';

const Cards = ({ initialCards }) => {
  const router = useRouter();
  const [cardData] = useState(initialCards);
  const [filteredCards, setFilteredCards] = useState(initialCards);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    let result = [...cardData];
    result = result.filter(
      (card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      let aField = a[sortField];
      let bField = b[sortField];

      if (sortField === 'created_date') {
        aField = new Date(aField);
        bField = new Date(bField);
      } else {
        aField = aField.toLowerCase();
        bField = bField.toLowerCase();
      }

      return sortOrder === 'asc'
        ? aField < bField
          ? -1
          : aField > bField
          ? 1
          : 0
        : aField > bField
        ? -1
        : aField < bField
        ? 1
        : 0;
    });

    setFilteredCards(result);
  }, [searchTerm, sortField, sortOrder, cardData]);

  const handleCardClick = (id) => {
    router.push(`/cards/${id}`);
  };

  return (
    <>
      <div className="controls-wrapper">
        <div className="control-group">
          <input
            type="text"
            placeholder="Search by title or description 🔍"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="control search-input"
          />
        </div>
        <div className="control-group">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="control select-input"
          >
            <option value="title">Title</option>
            <option value="created_date">Date Created</option>
          </select>
        </div>
        <div className="control-group">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="control select-input"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="not-found-wrapper">
          <FiSearch size={72} color="#888" />
          <p className="not-found-text">No matching results found.</p>
        </div>
      ) : (
        <div className="custom-card-row">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="custom-card"
              onClick={() => handleCardClick(card.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="custom-card-body">
                <img
                  src={card.image_url}
                  alt="Card background"
                  className="custom-card-image"
                />
              </div>
              <div className="custom-card-header">
                <p className="custom-card-label">{card.description}</p>
                <small className="custom-card-subtext">
                  {card.created_date}
                </small>
                <h4 className="custom-card-title">{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Cards;
