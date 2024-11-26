import React, { useState } from 'react';
import Logo from './Logo';
import ListaDeCoisas from './ListaDeCoisas';
import Estatistica  from './Estatistica';
import Form  from './Form';

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
    const confirmed = window.confirm('Você tem certeza que deseja excluir?');
    if(confirmed)
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


