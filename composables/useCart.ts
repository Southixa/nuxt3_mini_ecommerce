const useCart = function () {
    const cart = useState("cart", () => []);
    return {cart};
}

export {useCart}