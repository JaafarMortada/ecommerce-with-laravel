const pages = {};

pages.base_url = "http://127.0.0.1:8000/api/";

pages.login = () => {
    const email_input = document.getElementById('email-input')
    const password_input = document.getElementById('password-input')
    const signin_btn = document.getElementById('signin-btn')
    signin_btn.addEventListener('click', e => {
        e.preventDefault()
        const email = email_input.value
        const password = password_input.value
        if(email && password){
            const signin_form_data = new FormData();
            signin_form_data.append("email", email);
            signin_form_data.append("password", password);
    
            fetch(pages.base_url + "login", {
                method: 'POST',
                body: signin_form_data,
                })
                .then(response => response.json())
                .then(data => {
                    if(data.authorization.token){
                        // alert('logged in')
                    }
                })
                .catch(error => console.log('error', error));
            }
    })
    }

pages.signup = () => {
    const name_input = document.getElementById('name-input')
    const email_input = document.getElementById('email-input-signup')
    const password_input = document.getElementById('password-input-signup')
    const verify_password_input = document.getElementById('password-input-verify')
    const signup_btn = document.getElementById('signup-btn')
    
    signup_btn.addEventListener('click', e => {
        e.preventDefault()
        const name = name_input.value
        const email = email_input.value
        const password = password_input.value
        const verify_password = verify_password_input.value
        if(email && password && verify_password && email && name ){
            if (password == verify_password){
                const signup_form_data = new FormData();
                signup_form_data.append("name", name);
                signup_form_data.append("email", email);
                signup_form_data.append("password", password);
                
                fetch(pages.base_url + "register", {
                    method: 'POST',
                    body: signup_form_data,
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.message == 'User created successfully'){
                            console.log('User created successfully')
                        }
                    })
                    .catch(error => console.log('error', error));
            } else {
                console.log('passwords don\'t match.')
            }
            
            }else{
                console.log('fill all please.')
            }
    })
    }



pages.productCardHover = () =>{
    const card = document.getElementById('product-card')

    card.addEventListener('mousemove', () => {

        const desc = document.getElementById('two')
        desc.style.opacity = '1'
        desc.style.display = 'flex'
        document.getElementsByClassName('product-image')[0].style.display = 'none'
    })

    card.addEventListener('mouseout', () => {
        const details = document.getElementById('two')
        details.style.display = 'none'

        document.getElementsByClassName('product-image')[0].style.display = 'block'
})
}