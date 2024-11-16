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
  return <div className="add-form">
    <h3>
      O que você precisa por na mala para sua viagem?
    </h3>
  </div>
}

function ListaDeCoisas(){
  return <div className="list">LISTA</div>
}

function Estatistica(){
  return <footer className="stats">
    <em>Você tem X itens na sua lista, adicione mais X (X%) 🧳</em>
  </footer>
}
