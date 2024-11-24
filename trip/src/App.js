import React, { useState } from 'react';

const initialItems = [
  {id:1, description: "Passaporte", quantity:1, packed:true},
  {id:2, description: "Meias", quantity:2, packed:true},
  {id:3, description: "Carregador", quantity:1, packed:false},
]


export default function App(){
  const [items, setItems] = useState([]);

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
    
  

  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <ListaDeCoisas items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
      <Estatistica/>
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

function ListaDeCoisas({items, onDeleteItem, onToggleItem}){
  return (
    <div className="list">
      <ul >
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} onToggleItem={onToggleItem}/>  
        ))}
      </ul>
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

function Estatistica(){
  return <footer className="stats">
    <em>Você tem X itens na sua lista, adicione mais X (X%) 🧳</em>
  </footer>
}
