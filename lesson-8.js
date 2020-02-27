"use strict"

// объект с картинами из кода галереи

let newLogo = document.getElementsByClassName('logo')
newLogo[0].innerText = 'E-SHOP'
newLogo[1].innerText = 'E-SHOP Gallery'

let IMGS = [
    'https://i.ibb.co/s9gr3sF/1514188160141511997.jpg',
    'https://i.ibb.co/Y8FLz2v/HMUB2.png',
    'https://i.ibb.co/P1HmQS7/Xiaomi-Mi-Notebook-Air.jpg',
    'https://i.ibb.co/jfYmLvN/640-05-lg.jpg',
    'https://i.ibb.co/nbJxcp2/81-PLqxtr-J3-L-SX466.png',
    'https://i.ibb.co/K20pMT7/126-08-lg.jpg',
    'https://i.ibb.co/FXGbBjW/126-04-lg.jpg',
    'https://i.ibb.co/m4jhQ3N/520-34-lg.jpg'
    ]


// элементы каталога

let PRODUCTS_NAMES = ['Процессор', 'Монитор', 'Ноутбук', 'Мышь', 'Клавиатура', 'Наушники', 'Микрофон', 'Коврик'],
    PRICES = [100, 120, 1000, 15, 18, 30, 20, 10],
    IDS = [0, 1, 2, 3, 4, 5, 6, 7],
    products = []
let totalPrice = 0
let totalItems = 0
let totalPrice2 = 0
let totalItems2 = 0

// https://placehold.it/200x150
function createProduct(index) {
    return {
        product_name: PRODUCTS_NAMES[index],
        price: PRICES[index],
        id_product: IDS[index],
        img: IMGS[index],
        createTemplate() {
            return `
                <div class='product-item' data-id="${this.id_product}">
                    <img class='item_image' src="${this.img}" alt="${this.product_name}">
                    <div class='desc'>
                        <h3>${this.product_name}</h3>
                        <p> ${this.price} $</p>
                        <button class="buy-btn"
                            data-id="${this.id_product}"
                            data-name="${this.product_name}"
                            data-price="${this.price}">
                            Купить
                        </button>
                    </div>
                </div>
            `
        }
    }
}

let catalog = {
    items: [],
    container: '.products',
    cart: null,

    init() {
        this._fetchItems()
        this._render()

        console.log(`Корзина пуста`);
        document.getElementById('cart_items').innerHTML = `
                <div class='product-item-cart'>                    
                    <div class='desc'>
                        <p>Куплено товаров:</p> 
                        <h3>0</h3>
                        <p>Корзина пуста</p> 
                                                
                    </div>
                </div>
          `
        document.querySelector('#cart_items').style.background = 'lightgrey'
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.classList.contains('buy-btn')) {
                let product = evt.target.dataset
                totalPrice += +product.price
                    ++totalItems
                console.log(`Куплен ${product.name}, по цене ${+product.price}$`);
                document.getElementById('cart').innerHTML = `Товар ${product.name} добавлен в корзину, всего в корзине товаров ${+(totalItems+totalItems2)} шт.`;

                document.getElementById('cart_items').innerHTML = `
                <div class='product-item-cart'>                    
                    <div class='desc'>
                        <p>Добавлен товар:</p> 
                        <h3>${product.name}</h3>
                        <p>общая стоимость корзины:</p> 
                        <p> ${(totalPrice+totalPrice2)} $</p>                        
                    </div>
                </div>
                `

                document.querySelector('#cart_items').style.background = 'white'
            }
        })
    },
    _fetchItems() {
        let length = IDS.length
        for (let i = 0; i < length; i++) {
            this.items.push(createProduct(i))
        }
    },
    _render() {
        let container = document.querySelector(this.container)
        let domString = ''
        this.items.forEach(item => {
            domString += item.createTemplate()
        })
        container.innerHTML = domString
    }
}


catalog.init()



// Элемент управления корзиной 

btn_cart.addEventListener("mouseover", function () {
    cart_items.classList.remove("hidden")
    //console.log('log from cart button')
})
btn_cart.addEventListener("mouseout", function () {
    cart_items.classList.add("hidden")
    //console.log('log from cart button')
})


// Галерея с картинками

let MAIN_PIC = document.querySelector('#MAIN-PIC')
let roulette = document.querySelector('#roulette')
let control = document.querySelector('#control')
let titleOfProduct = PRODUCTS_NAMES[0]
let priceOfProduct = PRICES[0]
let newBuyButton = document.getElementById('buy_button')

document.getElementById('title_of_product').innerHTML = titleOfProduct
document.getElementById('price_of_product').innerHTML = priceOfProduct
newBuyButton.dataset.id = IDS[0]
newBuyButton.dataset.name = PRODUCTS_NAMES[0]
newBuyButton.dataset.price = PRICES[0]

window.onload = () => {
    MAIN_PIC.src = IMGS[0]
    IMGS.forEach(img => {
        roulette.insertAdjacentHTML('beforeend', createItem(img).createTemplate())
    })
}

function createItem(url) {
    return {
        width: 150,
        height: 120,
        createTemplate() {
            return `
                <img src="${url}" width="${this.width}" height="${this.height}"></img>
            `
        }
    }
}

roulette.addEventListener('click', evt => {
    if (evt.target.tagName === 'IMG') {
        MAIN_PIC.src = evt.target.src
        document.getElementById('title_of_product').innerHTML = PRODUCTS_NAMES[IMGS.indexOf(MAIN_PIC.src)]
        document.getElementById('price_of_product').innerHTML = PRICES[IMGS.indexOf(MAIN_PIC.src)]
        newBuyButton.dataset.id = IDS[IMGS.indexOf(MAIN_PIC.src)]
        newBuyButton.dataset.name = PRODUCTS_NAMES[IMGS.indexOf(MAIN_PIC.src)]
        newBuyButton.dataset.price = PRICES[IMGS.indexOf(MAIN_PIC.src)]
    }
})
control.addEventListener('click', (evt) => {
    let btn = evt.target
    if (btn.name === 'control') {
        let delta = +btn.dataset.step
        let actual = IMGS.indexOf(MAIN_PIC.src)
        if ((actual === IMGS.length - 1) && (delta === 1)) actual = -1
        if ((actual === 0) && (delta === -1)) actual = IMGS.length
        MAIN_PIC.src = IMGS[actual + delta]
        document.getElementById('title_of_product').innerHTML = PRODUCTS_NAMES[IMGS.indexOf(MAIN_PIC.src)]
        document.getElementById('price_of_product').innerHTML = PRICES[IMGS.indexOf(MAIN_PIC.src)]
        newBuyButton.dataset.id = IDS[IMGS.indexOf(MAIN_PIC.src)]
        newBuyButton.dataset.name = PRODUCTS_NAMES[IMGS.indexOf(MAIN_PIC.src)]
        newBuyButton.dataset.price = PRICES[IMGS.indexOf(MAIN_PIC.src)]
    }
})


buy_button.addEventListener('click', (evt) => {

    if (evt.target.classList.contains('buy_button')) {
        totalPrice2 += PRICES[IMGS.indexOf(MAIN_PIC.src)]
            ++totalItems2
        console.log(`Куплен ${PRODUCTS_NAMES[IMGS.indexOf(MAIN_PIC.src)]}, по цене ${PRICES[IMGS.indexOf(MAIN_PIC.src)]}$`);
        document.getElementById('cart').innerHTML = `Товар ${PRODUCTS_NAMES[IMGS.indexOf(MAIN_PIC.src)]} помещен в корзину, всего в корзине товаров ${(totalItems2+totalItems)} шт.`;
        document.getElementById('cart_items').innerHTML = `
                <div class='product-item-cart'>                    
                    <div class='desc'>
                        <p>Добавлен товар:</p> 
                        <h3>${PRODUCTS_NAMES[IMGS.indexOf(MAIN_PIC.src)]}</h3>
                        <p>общая стоимость корзины:</p> 
                        <p>${(totalPrice2+totalPrice)}$</p>                        
                    </div>
                </div>
                `
        document.querySelector('#cart_items').style.background = 'white'
    }
})