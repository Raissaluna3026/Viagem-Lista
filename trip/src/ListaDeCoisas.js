import React, { useState } from 'react';
import  Item from './App';

export default function ListaDeCoisas({ items, onDeleteItem, onToggleItem, onDeleteItems }) {
  const [sortBy, setSortBy] = useState('packed');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Classificar por ordem de entrada</option>
          <option value='description'>Classificar por descrição</option>
          <option value='packed'>Classificar por status da embalagem</option>
        </select>
        <button onClick={() => onDeleteItems()}>Limpar lista</button>
      </div>
    </div>
  );
}
