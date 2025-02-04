// Select elements
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const navbar = document.getElementById("navber");
const emailInput = document.querySelector(".form input");
const signUpButton = document.querySelector(".form button");
const marquee = document.querySelector("marquee");
const cartButtons = document.querySelectorAll(".cart");
const paginationLinks = document.querySelectorAll("#pagination a");
const smallImages = document.querySelectorAll(".small-img");
const mainImg = document.getElementById("MainImg");
const cartItems = document.querySelectorAll("#cart tbody tr");
const couponButton = document.querySelector("#coupon button");
const checkoutButton = document.querySelector("#subtotal button");

// Mobile menu toggle
if (bar && navbar) {
    bar.addEventListener("click", () => navbar.style.right = "0");
}
if (close && navbar) {
    close.addEventListener("click", () => navbar.style.right = "-100%");
}

// Email validation and submission
if (signUpButton && emailInput) {
    signUpButton.addEventListener("click", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            alert(`Thank you for signing up, ${email}!`);
            emailInput.value = ""; // Clear input field
        } else {
            alert("Please enter a valid email address.");
        }
    });
}

// Pause marquee on hover
if (marquee) {
    marquee.addEventListener("mouseover", () => marquee.stop());
    marquee.addEventListener("mouseout", () => marquee.start());
}

// Add to cart functionality
// cartButtons.forEach(button => {
//     button.addEventListener("click", (e) => {
//         e.preventDefault();
//         alert("Item added to cart!");
//     });
// });

// Smooth scrolling for pagination links
paginationLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        if (link.getAttribute("href") === "#") {
            alert("Pagination link clicked"); // Placeholder action
        }
    });
});

// Product image change on click
smallImages.forEach(img => {
    img.addEventListener("click", () => {
        if (mainImg) {
            mainImg.src = img.src;
        }
    });
});

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    if (bar) {
        bar.addEventListener("click", () => navbar.classList.add("active"));
    }
    if (close) {
        close.addEventListener("click", () => navbar.classList.remove("active"));
    }

    // Form Validation
    const form = document.querySelector("#form-detalis form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            
            let name = form.querySelector("input[placeholder='Your Name']").value.trim();
            let email = form.querySelector("input[placeholder='E-mail']").value.trim();
            let subject = form.querySelector("input[placeholder='Subject']").value.trim();
            let message = form.querySelector("textarea").value.trim();
            
            if (name === "" || email === "" || subject === "" || message === "") {
                alert("Please fill out all fields.");
                return;
            }
            
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }
            
            alert("Your message has been sent successfully!");
            form.reset();
        });
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    // Smooth Scrolling for internal links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Cart functionality

// Remove items from cart
cartItems.forEach(item => {
    const removeButton = item.querySelector("td:first-child a");
    if (removeButton) {
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            item.remove();
            updateCartTotal();
        });
    }
});

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

// Apply coupon button
couponButton.addEventListener("click", () => {
    const couponInput = document.querySelector("#coupon input").value.trim();
    if (couponInput === "DISCOUNT10") {
        alert("Coupon applied! You get a 10% discount.");
        applyDiscount(10);
    } else {
        alert("Invalid coupon code.");
    }
});

function applyDiscount(percentage) {
    let total = parseFloat(document.querySelector("#subtotal td:last-child strong").textContent.replace('$', ''));
    total = total - (total * percentage / 100);
    document.querySelector("#subtotal td:last-child strong").textContent = `$${total.toFixed(2)}`;
}

// Checkout button
checkoutButton.addEventListener('click', () => {
    alert("Proceeding to checkout!");
});









document.addEventListener("DOMContentLoaded", function () {
    let cartTableBody = document.querySelector("#cart tbody"); // Target table body
    let cartTotal = document.querySelector("#subtotal strong"); // Target total price

    let cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart data

    function updateCart() {
        cartTableBody.innerHTML = ""; // Clear table before adding new items
        let total = 0;

        cartItems.forEach((item, index) => {
            let subtotal = item.price * item.quantity;
            total += subtotal;

            let row = document.createElement("tr");
            row.innerHTML = `
                <td><a href="#" class="remove" data-index="${index}"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" class="quantity" data-index="${index}" value="${item.quantity}" min="1"></td>
                <td>$${subtotal.toFixed(2)}</td>
            `;

            cartTableBody.appendChild(row);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
        addEventListeners();
    }

    function addEventListeners() {
        // Remove item from cart
        document.querySelectorAll(".remove").forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                let index = this.getAttribute("data-index");
                cartItems.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cartItems));
                updateCart();
            });
        });

        // Update quantity
        document.querySelectorAll(".quantity").forEach((input) => {
            input.addEventListener("change", function () {
                let index = this.getAttribute("data-index");
                let newQuantity = parseInt(this.value);
                if (newQuantity > 0) {
                    cartItems[index].quantity = newQuantity;
                    localStorage.setItem("cart", JSON.stringify(cartItems));
                    updateCart();
                }
            });
        });
    }

    updateCart(); // Initialize cart display
});
