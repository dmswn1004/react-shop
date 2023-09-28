import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import shoesData from './data.js'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios';
import WatchedItem from './components/WatchedItem';
import { useQuery } from '@tanstack/react-query';

const Detail = lazy(() => import('./pages/Detail'));
const Cart = lazy(() => import('./pages/Cart'));

function App() {
  let watched;
  useEffect(()=>{
    watched = localStorage.getItem('watched');
    if(!watched){
      localStorage.setItem('watched', JSON.stringify([]));
    }
  },[]);

  let [shoes, setShoes] = useState(shoesData);
  let [isVisible, setIsVisible] = useState(true);
  let navigate = useNavigate();

  // react-query
  let { status, data, error, isFetching, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      let { data } = await axios.get(
        'https://codingapple1.github.io/userdata.json',
      )
      return data
    },
    staleTime: 2000
  })

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate("/")}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isLoading ? '로딩중' : data.name}
            { error && '에러'}
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path='/' element={<div>
            <div className='main-bg'></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map((a,i)=>{
                    return <Cards shoes={a} i={i + 1} key={i} />
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
          <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='*' element={<div>404 error</div>} />
        </Routes>
      </Suspense>
      { watched && <WatchedItem /> }
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

