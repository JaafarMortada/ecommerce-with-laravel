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
        <img src="data:image/png;base64,${this.image_path}" class="product-image">
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
    displayProductCardForAdmin(){
        return `
        <div class="product-card">
        <img src="data:image/png;base64,${this.image_path}" class="product-image">
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
                <button class="card-btn edit-btn">✎</button>
                <button class="card-btn delete-btn">&#128465;</button>
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
                        localStorage.setItem('user_id', data.user.id)
                        localStorage.setItem('usertype', data.user.usertype)
                        window.location.href='./frontend/html/home.html'
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
    const signedin_usertype = localStorage.getItem('usertype')
    if (signedin_usertype == 'user'){
        document.querySelector('.add-product-btn-div').style.display = 'none'
    }
    const show_classes_form_data = new FormData();
    fetch(pages.base_url + 'dashboard/', {
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
        
        if (signedin_usertype == 'user'){
            document.querySelector('.product-cards-container').innerHTML += product_obj.displayProductCard();
            document.querySelector('.add-product-btn-div').style.display = 'none'
        } else if(signedin_usertype == 'admin'){
            document.querySelector('.product-cards-container').innerHTML += product_obj.displayProductCardForAdmin();
            document.querySelector('.add-product-btn-div').style.display = 'flex'

        }

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

pages.modal = () =>{
    const edit_add_modal = document.getElementById('edit-add-modal')
    // const update_btn = document.getElementById('update-btn')
    const close_btn = document.getElementById('close-btn')
    const add_product_btn = document.getElementById('add-product-btn')

    add_product_btn.addEventListener('click', () => {
        edit_add_modal.style.display = "block"
    })

    window.addEventListener('click', (e) =>{
        if (e.target == edit_add_modal) {
            edit_add_modal.style.display = "none"
        }
    })

    close_btn.addEventListener('click', ()=>{
        edit_add_modal.style.display = "none"
    })

    // const add_product_to_db_btn = document.getElementById('add-btn')
}

pages.addProduct = () => {
    const add_product_to_db_btn = document.getElementById('add-btn')
    add_product_to_db_btn.addEventListener('click', ()=> {
        const prod_name =  document.getElementById('add-product-name-input').value
        const prod_details =  document.getElementById('add-product-details-input').value
        const prod_category =  document.getElementById('add-product-category-input').value
        const prod_price =  document.getElementById('add-product-price-input').value
        const prod_image =  document.getElementById('add-product-image-input').files[0]

        const product_form_data = new FormData();
        product_form_data.append("name", prod_name);
        product_form_data.append("details", prod_details);
        product_form_data.append("category", prod_category);
        product_form_data.append("price", prod_price);
        product_form_data.append("image_path", prod_image);

        fetch(pages.base_url + "add_update_product/", {
            method: "POST",
            body: product_form_data
        }).then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    })
}