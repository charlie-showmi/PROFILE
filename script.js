const icon=document.querySelector('.click')
const cart=document.querySelector('.allpage')
const close=document.querySelector('.closebtn')
console.log(icon, cart , close);



icon.addEventListener('click' ,function (params) {
    cart.classList.toggle('allpageclick')
})

close.addEventListener('click' ,function (params) {
    cart.classList.remove('allpageclick')
})