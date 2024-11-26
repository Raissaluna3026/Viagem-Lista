import React, { useState } from 'react';

const initialItems = [
  {id:1, description: "Passaporte", quantity:1, packed:true},
  {id:2, description: "Meias", quantity:2, packed:true},
  {id:3, description: "Carregador", quantity:1, packed:false},
]


export default function App(){
  const [items, setItems] = useState([]);
  const numItems = items.length;

  function handleAddItems(item){
    setItems((items) => [...items,item])
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id){
    setItems((items) => items.map((item) => 
      item.id === id ? {...item, packed: !item.packed}
     : item))
  }

  function deleteItems(){
    setItems([]);

  }
    
  

  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <ListaDeCoisas items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onDeleteItems={deleteItems}/>
      <Estatistica items={items}/>
    </div>
  )
}

function Logo(){
  return (
    <h1>
      Bora viajar! 🧳
    </h1>
  )
}
  
function Form({onAddItems}){
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  

  function handleSubmit(e){
    e.preventDefault();
    
    if (!description) return;
    const newItem = {description,quantity,packed:false, id: Date.now()};
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);

  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>
        O que você precisa por na mala para sua viagem?
      </h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length:20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>
    <input 
    type='text' 
    placeholder="Item..." 
    value={description} 
    onChange={(e) => setDescription(e.target.value)
    } />
    <button onClick={handleSubmit}>Adicionar</button>
  </form>
  )
}

function ListaDeCoisas({items, onDeleteItem, onToggleItem, onDeleteItems}){
  const [sortBy, setSortBy] = useState('packed');

  let sortedItems;

  if(sortBy === 'input') sortedItems = items;
  if(sortBy === 'description') 
    sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));

  if(sortBy === 'packed') 
    sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul >
        {sortedItems.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} onToggleItem={onToggleItem}/>  
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
  )
}

function Item({item, onDeleteItem, onToggleItem}){
  return (
    <li>
      <input 
      type="checkbox" 
      value={item.checked} 
      onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
      {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Estatistica({items}){
  if(!items.length) return (
    <p className="stats"><em>Adicione algum item na sua lista!</em></p>
  )

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked/numItems) * 100);

  return <footer className="stats">
    <em>
      {percentage === 100
       ? "Você está pronto para viajar! 🎉" : `Você tem ${numItems} itens na sua lista, adicione mais ${numPacked} (${percentage}%)`}
      </em>
  </footer>
}
