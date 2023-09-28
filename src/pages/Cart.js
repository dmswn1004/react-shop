import { Table } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux';
import { minusCount, addCount, deleteItem } from '../redux/cartSlice';
import { changeName } from '../redux/userSlice.js';
import { styled } from 'styled-components';
import { AiOutlineMinusCircle } from "react-icons/ai";

function Cart(){
    let dispatch = useDispatch();
    let cart = useSelector((state)=> state.cart );
    let store = useSelector((state)=> state );

    return(
        <div>
            <Title onClick={()=>dispatch(changeName())}>{store.user.name}의 장바구니</Title>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cart.map((item,i) => (
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>
                                <Button onClick={()=>{dispatch(minusCount(item.id))}}>-</Button>
                                <Button onClick={()=>{dispatch(addCount(item.id))}}>+</Button>
                            </td>
                            <td><AiOutlineMinusCircle onClick={()=>dispatch(deleteItem(i))}/></td>
                        </tr>
                       
                    ))
                }
                </tbody>
            </Table> 
        </div>
    )
}

const Title = styled.h3`
    padding: 20px; 0
`

const Button = styled.button`
    width: 30px;
    height: 30px;
    display: flex-inline;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    border: none;
    border-radius: 10px;
    background: black;
    color: white;

    &:hover{
        background: gray;
    }
`

export default Cart;