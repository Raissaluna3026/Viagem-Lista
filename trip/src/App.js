const initialItems = [
  {id:1, description: "Passaporte", quantity:1, packed:true},
  {id:2, description: "Meias", quantity:2, packed:true},
  {id:3, description: "Carregador", quantity:1, packed:false},
]


export default function App(){
  return (
    <div className="app">
      <Logo/>
      <Form/>
      <ListaDeCoisas/>
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

function Form(){
  function handleSubmit(e){
    e.preventDefault();
    
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>
        O que você precisa por na mala para sua viagem?
      </h3>
      <select>
        {Array.from({length:20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
    <input type='text' placeholder="Item..."/>
    <button onClic={handleSubmit}>Adicionar</button>
  </form>
  )
}

function ListaDeCoisas(){
  return (
    <div className="list">
      <ul >
        {initialItems.map((item) => (
          <Item item={item} key={item.id}/>  
        ))}
      </ul>
    </div>
  )
}

function Item({item}){
  return (
    <li>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
      {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Estatistica(){
  return <footer className="stats">
    <em>Você tem X itens na sua lista, adicione mais X (X%) 🧳</em>
  </footer>
}
