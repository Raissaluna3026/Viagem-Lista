import React from 'react';

export default function Estatistica({ items }) {
  if (!items.length) return (
    <p className="stats"><em>Adicione algum item na sua lista!</em></p>
  );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return <footer className="stats">
    <em>
      {percentage === 100
        ? "Você está pronto para viajar! 🎉" : `Você tem ${numItems} itens na sua lista, adicione mais ${numPacked} (${percentage}%)`}
    </em>
  </footer>;
}
