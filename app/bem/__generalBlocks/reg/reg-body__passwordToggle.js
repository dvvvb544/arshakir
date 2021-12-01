let togglePasswordEye = document.querySelector('#reg-body__password-eye');
let passwordInput = document.querySelector('#reg-body__password');


togglePasswordEye.addEventListener('click', () => {
    let type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    let src = togglePasswordEye.getAttribute('src') === 'img/eye--hide.svg' ? 'img/eye--show.svg' : 'img/eye--hide.svg';
    togglePasswordEye.src = src;
});


let toggleConfirmPasswordEye = document.querySelector('#reg-body__confirmPassword-eye');
let confirmPasswordInput = document.querySelector('#reg-body__confirmPassword');


toggleConfirmPasswordEye.addEventListener('click', () => {
    let type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);

    let src = toggleConfirmPasswordEye.getAttribute('src') === 'img/eye--hide.svg' ? 'img/eye--show.svg' : 'img/eye--hide.svg';
    toggleConfirmPasswordEye.src = src;
});
