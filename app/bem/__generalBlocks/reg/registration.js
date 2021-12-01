let regBody__signUp = document.getElementById('reg-body__signUp');
regBody__signUp.addEventListener('click', ()=> {
    //fetch
    let regisrationFormData = {
        email: "test@test.com", 
        phone: "+7(777) 777-77-77", 
        password: "123qwerty", 
        password_confirmation: "123qwerty"
    }

    async function sendFormData() {
        let response = await fetch('https://html-css-test-task.arkenstone.agency/registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(regisrationFormData)
        });
        let result = await response.json();
        return result.status;
    }

    let getResponseStatus = async () => {
        let status = await sendFormData();
        if (status === 'success') {
            console.log('form data sending: we"re done it');

            let modalRegBody = document.querySelector('.modal-signup__reg-body');
            let modalRegSuccess = document.querySelector('.modal-signup__reg-success')

            modalRegBody.classList.remove("modal-signup__reg-body--visible");         
            modalRegSuccess.classList.add('modal-signup__reg-success--visible');
        }
    };
    
    getResponseStatus();   
});
    