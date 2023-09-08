import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { addItem } from './../redux/cartSlice.js'
import { useDispatch } from 'react-redux';

function Details(props){
  let {id} = useParams();
  let dispatch = useDispatch();
  let [isVisible, setIsVisible] = useState(true);
  
  let [tab, setTab] = useState(0);
  let findShoes = props.shoes.find(x => x.id == id)
  useEffect(()=>{
    let timer = setTimeout(()=>{ setIsVisible(false) },2000)
    return ()=>{
      clearTimeout(timer) // 타이머 클리어
    }
  }, [isVisible])

  let [fade2, setFade2] = useState('');
  useEffect(() => {
    setTimeout(()=>{ setFade2('end') }, 100);
    return () => {
      setFade2('');
    }
  }, [])

  const addItemToCart = () => {
    let item = {id : id, name : findShoes.title, count : 1}
    dispatch(addItem(item));
    alert('장바구니에 추가되었습니다.');
  }

  return(
    <div className={'container start ' + fade2}>
      {
        isVisible ? 
          <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
          : null
      }

      <div className="row"> 
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="100%" alt="상품"/>
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findShoes.title}</h4>
          <p>{findShoes.content}</p>
          <p>{findShoes.price}</p>
          <button className="btn btn-danger" onClick={addItemToCart}>주문하기</button> 
        </div>
      </div>

      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
    </Nav>
    <TabContent tab={tab}/>
    </div> 
  )
}

function TabContent({tab}){
  let [fade, setFade] = useState('');

  useEffect(() => {
    setTimeout(()=>{ setFade('end') }, 100)
    return () => {
      setFade('')
    }
  }, [tab]);

  return (<div className={`start ${fade}`}>
    { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
  </div>)
}

export default Details;