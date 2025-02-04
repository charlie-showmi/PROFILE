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