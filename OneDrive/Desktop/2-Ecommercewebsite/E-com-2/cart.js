document.addEventListener("DOMContentLoaded", () => {
   const get = localStorage.getItem("cartProducts");

   if (!get || get === "[]") {
       alert("Cart is empty");
   } else {
       putDesign();
   }
});

function putDesign() {
   const get1 = localStorage.getItem("cartProducts");
   let cartList = JSON.parse(get1) || [];

   console.log(cartList);

   const design = cartList.map((product, index) => {
       const { productName, productImage, productPrice } = product;
       const price = parseFloat(productPrice.replace("$", '')) || 0;

       return `
           <tr class="c-products">
               <td><a href="#" class="remove-item" data-index="${index}"><i class="far fa-times-circle"></i></a></td>
               <td><img src="${productImage}" alt=""></td>
               <td class="pname">${productName}</td>
               <td class="price">$${price.toFixed(2)}</td>
               <td><input type="number" min="1" value="1" class="quantity"></td>
               <td class="nos">$${price.toFixed(2)}</td>
           </tr>`;
   }).join('');

   document.querySelector(".cartContainerTable").innerHTML = design;

   // Attach event listeners for remove buttons
   document.querySelectorAll(".remove-item").forEach(button => {
       button.addEventListener("click", remove);
   });

   // Attach event listeners for quantity change
   document.querySelectorAll(".quantity").forEach(input => {
       input.addEventListener('change', updateCartTotal);
   });

   updateCartTotal();
}

function remove(event) {
   event.preventDefault();

   const index = event.target.closest("a").getAttribute("data-index");
   let cartList = JSON.parse(localStorage.getItem("cartProducts")) || [];

   cartList.splice(index, 1);
   localStorage.setItem("cartProducts", JSON.stringify(cartList));

   putDesign();
}

function updateCartTotal() {
   let total = 0;

   document.querySelectorAll(".cartContainerTable tr").forEach(row => {
       const price = parseFloat(row.querySelector('.price').textContent.replace('$', '')) || 0;
       const quantity = parseInt(row.querySelector('.quantity').value) || 1;
       const subtotal = price * quantity;

       row.querySelector('.nos').textContent = `$${subtotal.toFixed(2)}`;
       total += subtotal;
   });

   const subtotalElement = document.querySelector("#subtotal td:last-child strong");
   if (subtotalElement) {
       subtotalElement.textContent = `$${total.toFixed(2)}`;
   }
}
