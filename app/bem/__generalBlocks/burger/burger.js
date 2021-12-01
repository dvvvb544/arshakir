let burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
    const x = document.querySelector(".header__menu");
    x.classList.toggle('header__menu--fixed')
});