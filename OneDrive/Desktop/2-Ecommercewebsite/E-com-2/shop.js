const cartProductArray = []


const cartButtons = document.querySelectorAll(".cart");


// document.addEventListener("DOMContentLoaded", () => {
    
    cartButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            
            const product = button.parentElement;
            const productName = product.querySelector("h5").innerText;
            const productPrice = product.querySelector("h4").innerText;
            const productImage = product.querySelector("img").src;
            

const productObj = {
    productName,productImage,productPrice
}




console.log(cartProductArray);


        
            
            const existingProduct = cartProductArray.find(item => item.productName === productName);
         
            
            if (existingProduct) {
                existingProduct.quantity += 1;
                //cartProductArray[0].quantity = 
                alert("already added")
                return
            } else {
                cartProductArray.push(productObj)

                localStorage.setItem("cartProducts",JSON.stringify(cartProductArray))

            }
            

   
        });
    });
// });