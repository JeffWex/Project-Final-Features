
const phrases = [
    "Ready to collect.",
    "准备好收集",
    "ਇਕੱਠ ਕਰਨ ਲਈ ਤਿਆਰ",
    "Listo para recoger.",
    "集める準備ができています",
    "준비 완료",
    "آماده برای جمع آوری",
    "Pronto para coletar."
];

const display = document.getElementById("language-display");

let currentPhraseIndex = 0;


function toggleLanguage() {
    display.textContent = phrases[currentPhraseIndex];
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
}

setInterval(toggleLanguage, 1000);


let cart = [];
let total = 0;
let totalEth = 0;


$(".add-to-cart").click(function () {
    debugger;
    const product = $(this).data("product");
    const price = parseFloat($(this).data("price"));
    const priceCrypto = parseFloat($(this).data("eth"));

    cart.push({ product, price, priceCrypto });
    total += price;
    totalEth += priceCrypto;

    updateCart();
});

debugger;
$(document).on("click", ".remove-from-cart", function () {
    const index = $(this).data("index");
    const removedItem = cart.splice(index, 1)[0];
    total -= removedItem.price;
    totalEth -= removedItem.priceCrypto;

    updateCart();
});


function updateCart() {
    debugger;
    const cartItems = $("#cart-items");
    const cartTotal = $("#cart-total");
    const cartTotalEth = $("#cart-totaleth");

    cartItems.empty();
    cart.forEach((item, index) => {
        cartItems.append(`<li class="list-group-item">
                    ${item.product} - $${item.price.toFixed(2)} or <img src="ethIcon.png" width="20" height="20"> ${item.priceCrypto.toFixed(2)} 
                    <button class="btn btn-light btn-sm float-right remove-from-cart" data-index="${index}"><img src="trash.png" alt="" style="width: 20px;"></button>
                </li>`);
    });

    cartTotal.text(total.toFixed(2));
    cartTotalEth.text(totalEth.toFixed(2));
}

const login = document.getElementById("login-form");

login.addEventListener("submit", function (event) {
    event.preventDefault();

    debugger;
    const username = login.username.value;
    const password = login.password.value;


    if ((localStorage.getItem("userName") !== null) && (localStorage.getItem("password") !== null)) {
        // you have values for both userName and password
    }

    if ((localStorage.getItem("userName") === null) && (localStorage.getItem("password") === null)) {
        localStorage.setItem("user", "Hub"); // writes name and password to local storage if not exists
        localStorage.setItem("pass", "nft");
    }

    if (localStorage.getItem("user") == username) {
        if (localStorage.getItem("pass") == password) {
            // login is successful
            // alert(`Logged in as ${username} you can continue purchase`);
            customAlert(true);
        }
    }
    else {
        // login or password invalid!.
        // alert(`Login ${username} or Password incorret!`);
        customAlert(false);
    }

});

function customAlert(bool) {
    debugger;
    const alertBoxFail = document.getElementById('customAlertBoxFail');
    const alertBoxSuccess = document.getElementById('customAlertBoxSuccess');


    if (bool) {
        alertBoxSuccess.textContent = 'Login in you can continue purchase!';
        alertBoxSuccess.style.display = 'block';
    }
    else {
        alertBoxFail.textContent = 'Login or password incorret!';
        alertBoxFail.style.display = 'block';
    }

    setTimeout(function () {
        alertBoxFail.style.display = 'none';
        alertBoxSuccess.style.display = 'none';
    }, 3000);
}