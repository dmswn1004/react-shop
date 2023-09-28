function WatchedItem(){
    let items = localStorage.getItem('watched');
    items = JSON.parse(items);

    return(
        <div className="bar">
            <div className="watched-item">
                <span className="title">최근 본 상품</span>
                {
                    items.map((a,i)=>{
                        return(
                            <img key={i} src={"https://codingapple1.github.io/shop/shoes" + (a + 1) + ".jpg"} width="80%" alt='상품'/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WatchedItem;