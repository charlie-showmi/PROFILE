const get = localStorage.getItem("cartProducts")

if(!get){
// alert("cart is empty")
}

else{

   const cartList =  JSON.parse(get)

   console.log(cartList);
   

  const design = cartList.map((product)=>{
    const {productName,productImage,productPrice} = product
    return `
     <tr>
                    <td><a href="#"><i class="far fa-times-circle"></i></a></td>
                    <td><img src="${productImage}" alt=""></td>
                    <td>${productName}</td>
                    <td>${productPrice}</td>
                    <td><input type="number" value="1"></td>
                    <td>${productPrice * 1}</td>
                </tr>`
   }).join('')

   document.querySelector(".cartContainerTable").innerHTML += design
}

