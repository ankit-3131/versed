const closeLogo = document.querySelector(".icon-close");
const wrapper = document.querySelector(".wrapper");
const upLoginBtn = document.querySelector(".btnLogin-popup");

closeLogo.addEventListener('click', ()=>{
    wrapper.classList.add('hiding');
    wrapper.classList.remove('showing');
})
upLoginBtn.addEventListener('click', ()=>{
    wrapper.classList.add('showing');
    wrapper.classList.remove('hiding');
})