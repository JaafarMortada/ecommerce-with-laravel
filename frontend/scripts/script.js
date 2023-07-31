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
        <div class="product-card" data-id="${this.id}">
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
                <button class="card-btn add-to-favorites-btn">&#9733;</button>
                <button class="card-btn add-to-cart-btn">&#128722;</button>
            </div>
        </div>
        <div class="card-discription">
            ${this.details}
        </div>
        `
    }
    displayProductCardForAdmin(){
        return `
        <div class="product-card" data-id="${this.id}">
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
                <button class="card-btn edit-btn-one">✎</button>
                <button class="card-btn delete-btn-one">&#128465;</button>
            </div>
        </div>
        <div class="card-discription">
            ${this.details}
        </div>
        <div class="edit-modal">
        <div class="modal-content">
            <div class="modal-input-with-label">
                <label for="edit-product-name-input">Product name:</label>
                <input type="text" id="edit-product-name-input${this.id}" class="edit-product-name-input" name="edit-product-name-input" placeholder="Enter the product name" value="${this.name}">
            </div>
            <div class="modal-input-with-label">
                <label for="edit-product-details-input">Product details:</label>
                <input type="text" id="edit-product-details-input${this.id}" class="edit-product-details-input" name="edit-product-details-input" placeholder="Enter the product details" value="${this.details}">
            </div>
            <div class="modal-input-with-label">
                <label for="edit-product-category-input">Product category:</label>
                <input type="text" id="edit-product-category-input${this.id}" class="edit-product-category-input" name="edit-product-category-input" placeholder="Enter the product category" value="${this.category}">
            </div>
            <div class="modal-input-with-label">
                <label for="edit-product-price-input">Product price:</label>
                <input type="text" id="edit-product-price-input${this.id}" class="edit-product-price-input" name="edit-product-price-input" placeholder="Enter the product price" value="${this.price}">
            </div>
            <div class="modal-input-with-label">
                <label for="edit-product-image-input">Product image:</label>
                <input type="file" id="edit-product-image-input${this.id}" class="edit-product-image-input" name="edit-product-image-input" placeholder="Enter the product price" value="${this.image_path}">
            </div>
            <div class="modal-btns">
                <button type="button" class="modal-btn close-btn" id="close-btn">close</button>
                <button type="button" class="modal-btn edit-btn" id="edit-btn${this.id}">edit</button>
            </div>
        </div>
        `
    }
    }

class Cart {
    constructor(prod_name, prod_price, total){
        this.prod_name = prod_name
        this.prod_price = prod_price
        this.total = total
    }

    addToCartModal() {
        return `
        <div class="item-in-cart-div">
                <div>&nbsp; &#x25CF; ${this.prod_name}</div>
                <div>${this.prod_price}$ &nbsp;</div>
            </div>
        `
    }

    addTotalToCartModal(){
        return`
        <span class="total-text">Total: ${this.total}$ &nbsp;</span>
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
                    redirect: 'follow'
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
        if(signedin_usertype == 'admin'){
            productCards.forEach((card) => {
            
                const edit_modal = card.querySelector('.edit-modal')
                const image = card.querySelector('.product-image')
                const description = card.querySelector('.card-discription')
                const edit_btn = card.querySelector(".edit-btn-one")
                const delete_btn = card.querySelector(".delete-btn-one")
                
                const close_edit_btn = card.querySelector(".close-btn")
    
                card.addEventListener('mouseenter', (event) => {
                    image.style.display = 'none';
                    description.style.display = 'flex';
                    const product_id = event.currentTarget.dataset.id;
                    localStorage.setItem('prd_id', product_id)
                })
    
                card.addEventListener('mouseleave', () => {
                    image.style.display = 'block';
                    description.style.display = 'none';
                    localStorage.removeItem('prd_id')
                    })
    
                delete_btn.addEventListener('click', () => {
                    fetch(pages.base_url + "delete_product/" + localStorage.getItem('prd_id'))
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.log('error', error))
                }) 
    
                edit_btn.addEventListener('click', ()=>{
                    edit_modal.style.display = 'block'
                })
                
                close_edit_btn.addEventListener('click', ()=>{
                    edit_modal.style.display = 'none'
                })
                
                const edit_btn_and_send = card.querySelector(".edit-btn")
                edit_btn_and_send.addEventListener('click', () => {
                    
                    const edit_product_name_input = card.querySelector(".edit-product-name-input")
                    const edit_product_details_input = card.querySelector(".edit-product-details-input")
                    const edit_product_category_input = card.querySelector(".edit-product-category-input")
                    const edit_product_price_input = card.querySelector(".edit-product-price-input")
                    const edit_product_image_input = card.querySelector(".edit-product-image-input")
    
                    const new_name = edit_product_name_input.value
                    const new_details = edit_product_details_input.value
                    const new_category = edit_product_category_input.value
                    const new_price = edit_product_price_input.value
                    const new_image = edit_product_image_input.files[0]
    
                    const new_data = new FormData
                    
                    new_data.append("name", new_name);
                    new_data.append("details", new_details);
                    new_data.append("category", new_category);
                    new_data.append("price", new_price);
                    new_data.append("image_path", new_image);
    
                    fetch(pages.base_url + "add_update_product/" + localStorage.getItem('prd_id'), {
                        method: "POST",
                        body: new_data
                    }).then(response => response.json())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
    
                })
                })
            
        } else if (signedin_usertype == 'user'){
            productCards.forEach((card) => {
                const image = card.querySelector('.product-image')
                const description = card.querySelector('.card-discription')
                const add_to_cart_btn = card.querySelector('.add-to-cart-btn')
                const add_to_fav_btn = card.querySelector('.add-to-favorites-btn')
                card.addEventListener('mouseenter', (event) => {
                    image.style.display = 'none';
                    description.style.display = 'flex';
                    const product_id = event.currentTarget.dataset.id;
                    localStorage.setItem('prd_id', product_id)
                })
    
                card.addEventListener('mouseleave', () => {
                    image.style.display = 'block';
                    description.style.display = 'none';
                    localStorage.removeItem('prd_id')
                    })

                add_to_cart_btn.addEventListener('click', ()=>{
                    const add_to_cart_data = new FormData
                    add_to_cart_data.append('user_id', localStorage.getItem('user_id'))
                    add_to_cart_data.append('product_id', localStorage.getItem('prd_id'))

                    fetch(pages.base_url + 'add_to_cart',{
                        method: "POST",
                        body: add_to_cart_data
                    }).then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.log('error', error))
                })

                add_to_fav_btn.addEventListener('click', ()=>{
                    const add_to_fav_data = new FormData
                    add_to_fav_data.append('user_id', localStorage.getItem('user_id'))
                    add_to_fav_data.append('product_id', localStorage.getItem('prd_id'))

                    fetch(pages.base_url + 'add_to_favorites',{
                        method: "POST",
                        body: add_to_fav_data
                    }).then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.log('error', error))
                })
                })
        }
        })
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

pages.cartModal = () =>{
    const cart_modal = document.getElementById('cart-modal')
    const close_cart_btn = document.getElementById('close-cart-btn')
    const open_cart_btn = document.getElementById('view-cart-nav-btn')
    open_cart_btn.addEventListener('click', () => {
        cart_modal.style.display = "block"

        const cart_form_data = new FormData
        cart_form_data.append("user_id", localStorage.getItem('user_id'))
        fetch(pages.base_url + "view_cart", {
            method: "POST",
            body: cart_form_data
        }).then(response => response.json())
        .then(data => {
            Object.values(data.cart_items).forEach(item => {
                const cart_item = new Cart(item.name, item.price, item.total)
                document.querySelector('.cart-items').innerHTML += cart_item.addToCartModal()
            })
            const total = new Cart("","", data.total)
            document.querySelector('.total-div').innerHTML += total.addTotalToCartModal()
        })
    })

    window.addEventListener('click', (e) =>{
        if (e.target == cart_modal) {
            document.querySelector('.cart-items').innerHTML = ""
            document.querySelector('.total-div').innerHTML = ""
            cart_modal.style.display = "none"
        }
    })

    close_cart_btn.addEventListener('click', ()=>{
        document.querySelector('.cart-items').innerHTML = ""
        document.querySelector('.total-div').innerHTML = ""
        cart_modal.style.display = "none"
    })

}

pages.favModal = () =>{
    const fav_modal = document.getElementById('fav-modal')
    const close_fav_btn = document.getElementById('close-fav-btn')
    const open_fav_btn = document.getElementById('view-fav-nav-btn')
    open_fav_btn.addEventListener('click', () => {
        fav_modal.style.display = "block"

    //     const cart_form_data = new FormData
    //     cart_form_data.append("user_id", localStorage.getItem('user_id'))
    //     fetch(pages.base_url + "view_cart", {
    //         method: "POST",
    //         body: cart_form_data
    //     }).then(response => response.json())
    //     .then(data => {
    //         Object.values(data.cart_items).forEach(item => {
    //             const cart_item = new Cart(item.name, item.price, item.total)
    //             document.querySelector('.cart-items').innerHTML += cart_item.addToCartModal()
    //         })
    //         const total = new Cart("","", data.total)
    //         document.querySelector('.total-div').innerHTML += total.addTotalToCartModal()
    //     })
    })

    window.addEventListener('click', (e) =>{
        if (e.target == fav_modal) {
            document.querySelector('.fav-items').innerHTML = ""
            fav_modal.style.display = "none"
        }
    })

    close_fav_btn.addEventListener('click', ()=>{
        document.querySelector('.fav-items').innerHTML = ""
        fav_modal.style.display = "none"
    })

}