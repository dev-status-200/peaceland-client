import Cookies from "js-cookie";

const saveCart = (options) => {
    let getCart = [];
    if(Cookies.get("cart")){
        getCart = JSON.parse(Cookies.get("cart"))
        getCart.push(options)
    } else {
        getCart.push(options)
    }
    Cookies.set("cart", JSON.stringify(getCart));
}

const retrieveCart = () => {
    let cart = [];
    if(Cookies.get("cart")){
        cart = JSON.parse(Cookies.get("cart"))
    }
    return cart
}

const destroyCart = async() => {
    // await Cookies.remove("cart", { path: '' })
    await Cookies.remove("cart")
}

const removeFromCart = (id) => {
    let tempProducts = JSON.parse(Cookies.get("cart"))
    tempProducts = tempProducts.filter((x)=>{
        return x.tourId!=id
    })
    Cookies.set("cart", JSON.stringify(tempProducts));
}

export { saveCart, retrieveCart, removeFromCart, destroyCart }