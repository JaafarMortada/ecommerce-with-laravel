function productCardHover(){
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