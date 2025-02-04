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

updateCartTotal()
                
            }
            

   
        });
    });
// });


// Update subtotal when quantity changes
document.querySelectorAll("#cart input[type='number']").forEach(input => {
    input.addEventListener('change', updateCartTotal);
});

function updateCartTotal() {
    let total = 0;
    document.querySelectorAll("#cart tbody tr").forEach(row => {
        const price = parseFloat(row.children[3].textContent.replace('$', ''));
        const quantity = row.children[4].querySelector('input').value;
        const subtotal = price * quantity;
        row.children[5].textContent = `$${subtotal.toFixed(2)}`;
        total += subtotal;
    });
    document.querySelector("#subtotal td:last-child strong").textContent = `$${total.toFixed(2)}`;
}