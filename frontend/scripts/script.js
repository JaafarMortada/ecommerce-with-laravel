class Product {
    constructor(id, name, details, category, price, image_path) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.category = category;
        this.price = price;
        this.image_path = image_path;
        }
        
    displayProductCard(){
        return `
        <div class="product-card">
        <img src="../assets/images/no-pic.webp" class="product-image">
        <div class="product-details-container" id="one">
            <div class="product-details">
                <div>
                    <span class="card-text-name">Name:</span>
                    <span class="card-text">${this.name}</span>
                </div>
                <div>
                    <span class="card-text-name">Price:</span>
                    <span class="card-text">${this.price}</span><span class="card-text">$</span>
                </div>
                <div>
                    <span class="card-text-name">Category:</span>
                    <span class="card-text">${this.category}</span>
                </div>
            </div>
            <div class="product-btns">
                <button class="card-btn">&#9733;</button>
                <button class="card-btn">&#128722;</button>
            </div>
        </div>
        <div class="card-discription">
            ${this.details}
        </div>
        `
    }
    }

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
    const usertype_checkbox = document.getElementById('usertype')
    
    signup_btn.addEventListener('click', e => {
        e.preventDefault()
        const name = name_input.value
        const email = email_input.value
        const password = password_input.value
        const verify_password = verify_password_input.value
        let usertype = 'user'
        if (usertype_checkbox.checked){
            usertype = 'admin'
        }
        if(email && password && verify_password && email && name ){
            if (password == verify_password){
                const signup_form_data = new FormData();
                signup_form_data.append("name", name);
                signup_form_data.append("email", email);
                signup_form_data.append("password", password);
                signup_form_data.append("usertype", usertype);
                
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

pages.showProductsDashboard = () => {
    const show_classes_form_data = new FormData();
    fetch(pages.base_url + 'dashboard', {
        method: "POST",
        body: show_classes_form_data
        })
        .then(response => response.json())
        .then(data => {
        data.products.forEach(element => {
            const product_obj = new Product(
            element.id,
            element.name,
            element.details,
            element.category,
            element.price,
            element.image_path,
            );
            
        document.querySelector('.product-cards-container').innerHTML += product_obj.displayProductCard();
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                const image = card.querySelector('.product-image');
                const description = card.querySelector('.card-discription');
                image.style.display = 'none';
                description.style.display = 'flex';
            });
            card.addEventListener('mouseleave', () => {
                const image = card.querySelector('.product-image');
                const description = card.querySelector('.card-discription');
                image.style.display = 'block';
                description.style.display = 'none';
                });
            });
        });
    })
}