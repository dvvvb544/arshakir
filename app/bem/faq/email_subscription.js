let emailBtn = document.getElementById("email_subscription");

emailBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // fetch
    let newsFormData = {
        email: "test@test.com"
    }

    async function sendEmail() {
        let response = await fetch('https://html-css-test-task.arkenstone.agency/feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsFormData)
        });
        let result = await response.json();
        return result.status;
    }


    // get status and show notice block
    let getResponseStatus = async () => {
        let status = await sendEmail();
        if (status === 'success') {
            console.log('email sending: we"re done it');
            let el = document.getElementById('modal-notice');

            el.classList.add("modal-notice--visible");    
            setTimeout(()=>{
                el.classList.remove("modal-notice--visible");        
                
                el.classList.add("modal-notice--fading");
                setTimeout(()=>{
                    el.classList.remove("modal-notice--fading");
                }, 1000); //duration of the fading animation in css
            }, 5000); // block visibility duration
        }
    };
    
    getResponseStatus();    
});