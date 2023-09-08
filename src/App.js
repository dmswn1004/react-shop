import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import data from './data.js'
import Details from './pages/Detail';
import Cart from './pages/Cart';
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(data);
  let [isVisible, setIsVisible] = useState(true);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate("/")}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<div>
          <div className='main-bg'></div>
          <div className="container">
            <div className="row">
              {
                shoes.map((a,i)=>{
                  return(
                    <div key={i}>
                      <Cards shoes={a} i={i+1}></Cards>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {
            isVisible ? 
            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data3.json')
              .then((result)=>{ 
                let copy = [...shoes, ...result.data];
                setShoes(copy);
                setIsVisible(false)
               })
               .catch(()=>{
                console.log('실패')
               })
            }}>더보기</button>
            : alert('마지막 상품입니다.')
          }
        </div>}/>
        <Route path='/detail/:id' element={<Details shoes={shoes}/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='*' element={<div>404 error</div>} />
      </Routes>
    </div>
  );
}

function Cards(props){
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"} width="80%" alt='상품'/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;

