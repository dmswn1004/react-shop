import { Table } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux';
import { minusCount, addCount } from '../store';

function Cart(){
    let cart = useSelector((state)=> state.cart );
    let dispatch = useDispatch();

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
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
                                <button onClick={()=>{dispatch(minusCount(item.id))}}>-</button>
                                <button onClick={()=>{dispatch(addCount(item.id))}}>+</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;