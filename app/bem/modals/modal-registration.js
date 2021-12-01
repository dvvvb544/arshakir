let regBtn = document.getElementById("reg-btn");

regBtn.addEventListener('click', (e) => {

    // open, close the modal and change visibility of reg-body and reg-success when you click (X btn)
    let modalWrap = document.querySelector('.modal-signup__outer');
    modalWrap.classList.add("modal-signup__outer--visible"); 

    
    
    let closeModal = document.querySelector('.modal-signup__close');
    closeModal.addEventListener('click', () => {
        modalWrap.classList.remove("modal-signup__outer--visible");  
        
        let modalRegBody = document.querySelector('.modal-signup__reg-body');
        let modalRegSuccess = document.querySelector('.modal-signup__reg-success');

        if (modalRegSuccess.classList.contains('modal-signup__reg-success--visible')) {
            modalRegSuccess.classList.remove('modal-signup__reg-success--visible')
            modalRegBody.classList.add('modal-signup__reg-body--visible')
        }
    });
});