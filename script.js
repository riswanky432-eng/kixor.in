/* ================================
   KIXOR WEBSITE — MAIN JAVASCRIPT
================================ */


/* ================================
   WHATSAPP NUMBER
================================ */

const whatsappNumber = "919656591308";


/* ================================
   PRODUCT DETAILS
================================ */

const productName = "NIKE P-6000 TRAINER METALLIC GOLD";
const productPrice = "₹2,699";


/* ================================
   KIXOR CART
================================ */

let kixorCart =
    JSON.parse(localStorage.getItem("kixorCart")) || [];


/* ================================
   DOM CONTENT LOADED
================================ */

document.addEventListener("DOMContentLoaded", function () {


    /* ================================
       PRODUCT SIZE SELECTION
    ================================= */

const productCards = document.querySelectorAll(".product-card");

productCards.forEach((product) => {
    const sizes = product.querySelectorAll(
        ".quick-sizes span, .quick-sizes .size-option"
    );

    sizes.forEach((size) => {
        size.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            // Remove selected size from ALL products
            document.querySelectorAll(
                ".quick-sizes span.selected-size, .quick-sizes .size-option.selected-size"
            ).forEach((item) => {
                item.classList.remove("selected-size");
            });

            // Select the clicked size
            this.classList.add("selected-size");

            // Store selected product size
            product.dataset.selectedSize =
                this.dataset.size || this.textContent.trim();
        });
    });
});

    /* ================================
       WHATSAPP ORDER
    ================================= */

    document.querySelectorAll(".product-card").forEach(function (product) {

        const orderButton =
            product.querySelector(".quick-order");

        if (!orderButton) return;

        orderButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const selectedSize =
                product.dataset.selectedSize;

            /* Check size */
            if (!selectedSize) {

                alert("Please select your shoe size first.");

                return;
            }

            /* Product name */
            const name =
                product.querySelector("h3")?.textContent.trim() ||
                "Product";

            /* Product price */
            const price =
                product.querySelector(".current-price")?.textContent.trim() ||
                "₹0";

            /* WhatsApp message */
            const message =
`Hi Kixor 🛍️

I'd like to order:

Product: ${name}
Price: ${price}
Size: ${selectedSize}

Please confirm availability and order details.`;

            /* WhatsApp URL */
            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank");

        });

    });


    /* ================================
       SIZE GUIDE MODAL
    ================================= */

    const sizeModal =
        document.getElementById("sizeModal");

    if (sizeModal) {

        sizeModal.addEventListener("click", function (event) {

            if (event.target === sizeModal) {

                closeSizeGuide();

            }

        });

    }


    /* ================================
       MOBILE MENU
    ================================= */

    const menuButton =
        document.querySelector(".menu-btn");

    const headerElement =
        document.querySelector(".header");

    if (menuButton && headerElement) {

        const mobileMenu =
            document.createElement("div");

        mobileMenu.className =
            "kixor-mobile-menu";

        mobileMenu.innerHTML = `

            <div class="mobile-menu-header">

                <span>MENU</span>

                <button
                    type="button"
                    class="mobile-menu-close"
                    aria-label="Close Menu">
                    ×
                </button>

            </div>

            <nav class="mobile-menu-links">

                <a href="#new-arrivals">
                    NEW ARRIVALS
                </a>

                <a href="#men">
                    MEN
                </a>

                <a href="#women">
                    WOMEN
                </a>

                <a
                    href="https://wa.me/${whatsappNumber}"
                    target="_blank"
                    rel="noopener noreferrer">
                    CUSTOMER SUPPORT
                </a>

            </nav>

        `;

        document.body.appendChild(mobileMenu);


        const closeButton =
            mobileMenu.querySelector(".mobile-menu-close");

        const menuLinks =
            mobileMenu.querySelectorAll(".mobile-menu-links a");


        /* OPEN MENU */

        menuButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            mobileMenu.classList.add("active");

            document.body.classList.add("menu-open");

        });


        /* CLOSE MENU */

        if (closeButton) {

            closeButton.addEventListener("click", function () {

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        }


        /* CLOSE AFTER LINK CLICK */

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        });


        /* ESC CLOSE */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            }

        });

    }


    /* ================================
       PRODUCT IMAGE CLICK
    ================================= */

    const productImage =
        document.querySelector(".product-image img");

    if (productImage) {

        productImage.addEventListener("click", function () {

            this.classList.toggle("image-zoom");

        });

    }


    /* ================================
       HEADER SCROLL EFFECT
    ================================= */

    const pageHeader =
        document.querySelector(".header");

    window.addEventListener("scroll", function () {

        if (!pageHeader) return;

        if (window.scrollY > 50) {

            pageHeader.classList.add("header-scrolled");

        } else {

            pageHeader.classList.remove("header-scrolled");

        }

    });


    /* ================================
       HERO VIDEO FALLBACK
    ================================= */

    const heroVideo =
        document.querySelector(".hero-video");

    if (heroVideo) {

        heroVideo.addEventListener("error", function () {

            console.log(
                "Hero video could not be loaded."
            );

        });

    }


    /* ================================
       MEN / WOMEN FILTER BUTTONS
    ================================= */

    const shopMen =
        document.getElementById("shop-men");

    const shopWomen =
        document.getElementById("shop-women");


    if (shopMen) {

        shopMen.addEventListener("click", function () {

            filterProducts("men");

        });

    }


    if (shopWomen) {

        shopWomen.addEventListener("click", function () {

            filterProducts("women");

        });

    }


    /* ================================
       SEARCH
    ================================= */

    const searchButton =
        document.getElementById("searchButton");

    const searchBox =
        document.getElementById("searchBox");

    const searchInput =
        document.getElementById("searchInput");

    const closeSearch =
        document.getElementById("closeSearch");

    const searchResults =
        document.getElementById("searchResults");


    /* SEARCH BUTTON */

    if (searchButton && searchBox) {

        searchButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            searchBox.classList.add("active");

            setTimeout(function () {

                if (searchInput) {

                    searchInput.focus();

                }

            }, 50);

        });

    }


    /* LIVE SEARCH */

    if (searchInput && searchResults) {

        searchInput.addEventListener("input", function () {

            const typed =
                normalizeSearch(searchInput.value);


            /* EMPTY */

            if (!typed) {

                searchResults.innerHTML = "";

                searchResults.classList.remove("active");

                return;

            }


            const products =
                document.querySelectorAll(
                    "#all-products > .product-card"
                );


            searchResults.innerHTML = "";

            let found = 0;


            products.forEach(function (product) {

                const name =
                    product.querySelector("h3")?.textContent || "";

                const category =
                    product.querySelector(
                        ".product-category"
                    )?.textContent || "";


                const searchableText =
                    normalizeSearch(
                        name + " " + category
                    );


                if (searchableText.includes(typed)) {

                    found++;


                    const image =
                        product.querySelector(
                            ".gallery-main img"
                        )?.src || "";


                    const price =
                        product.querySelector(
                            ".current-price"
                        )?.textContent.trim() || "";


                    const result =
                        document.createElement("a");


                    result.className =
                        "search-result-item";

                    result.href = "#";


                    result.innerHTML = `

                        <img
                            src="${image}"
                            alt="${name}"
                        >

                        <div class="search-result-info">

                            <h3>${name}</h3>

                            <p>${price}</p>

                        </div>

                    `;


                    result.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            searchBox.classList.remove("active");

                            searchResults.classList.remove("active");

                            searchInput.value = "";

                            product.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        }
                    );


                    searchResults.appendChild(result);

                }

            });


            /* NO RESULTS */

            if (found === 0) {

                searchResults.innerHTML = `

                    <div class="search-no-result">
                        No products found.
                    </div>

                `;

            }


            searchResults.classList.add("active");

        });

    }


    /* CLOSE SEARCH */

    if (closeSearch) {

        closeSearch.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (searchInput) {

                searchInput.value = "";

            }

            if (searchResults) {

                searchResults.innerHTML = "";

                searchResults.classList.remove("active");

            }

            if (searchBox) {

                searchBox.classList.remove("active");

            }

        });

    }


    /* ================================
       CART INITIAL LOAD
    ================================= */

    updateKixorCartCount();

    renderKixorCart();


    /* ================================
       CART CLOSE
    ================================= */

    const cartDrawer =
        document.getElementById("cartDrawer");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const closeCart =
        document.getElementById("closeCart");


    function closeKixorCart() {

        if (cartDrawer) {

            cartDrawer.classList.remove("active");

        }

        if (cartOverlay) {

            cartOverlay.classList.remove("active");

        }

    }


    if (closeCart) {

        closeCart.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            closeKixorCart();

        });

    }


    if (cartOverlay) {

        cartOverlay.addEventListener("click", function () {

            closeKixorCart();

        });

    }


    /* ================================
       HEADER CART BUTTON
    ================================= */

    const cartButton =
        document.getElementById("cartButton");


    if (cartButton && cartDrawer) {

    cartButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        /* CLOSE SEARCH WHEN CART OPENS */

        if (searchBox) {
            searchBox.classList.remove("active");
        }

        if (searchResults) {
            searchResults.innerHTML = "";
            searchResults.classList.remove("active");
        }

        if (searchInput) {
            searchInput.value = "";
        }

        /* OPEN CART */

        cartDrawer.classList.add("active");

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }

        renderKixorCart();

    });

}


    /* ================================
       CHECKOUT POPUP
    ================================= */

    const checkoutModal =
        document.getElementById("checkoutModal");

    const closeCheckout =
        document.getElementById("closeCheckout");

    const checkoutForm =
        document.getElementById("checkoutForm");

    const cartWhatsApp =
        document.getElementById("cartWhatsApp");


    /* OPEN CHECKOUT */

    if (cartWhatsApp) {

        cartWhatsApp.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();


            if (!kixorCart || kixorCart.length === 0) {

                alert("Your cart is empty.");

                return;

            }


            if (checkoutModal) {

                checkoutModal.classList.add("active");

            }

        });

    }


    /* CLOSE CHECKOUT */

    if (closeCheckout) {

        closeCheckout.addEventListener("click", function () {

            if (checkoutModal) {

                checkoutModal.classList.remove("active");

            }

        });

    }


    /* CLOSE CHECKOUT OUTSIDE */

    if (checkoutModal) {

        checkoutModal.addEventListener("click", function (event) {

            if (event.target === checkoutModal) {

                checkoutModal.classList.remove("active");

            }

        });

    }


    /* SUBMIT CHECKOUT */

    if (checkoutForm) {

        checkoutForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /* CUSTOMER DETAILS */

            const customerName =
                document.getElementById("customerName")?.value.trim() || "";

            const phone1 =
                document.getElementById("phone1")?.value.trim() || "";

            const phone2 =
                document.getElementById("phone2")?.value.trim() || "";

            const address =
                document.getElementById("customerAddress")?.value.trim() || "";

            const district =
                document.getElementById("customerDistrict")?.value.trim() || "";

            const pincode =
                document.getElementById("customerPincode")?.value.trim() || "";


            /* ORDER MESSAGE */

            let message =
`Hi Kixor 🛍️

I'd like to place an order.

CUSTOMER DETAILS

Name: ${customerName}
Phone 1: ${phone1}
Phone 2: ${phone2 || "Not provided"}

Address: ${address}
District: ${district}
Pincode: ${pincode}

ORDER DETAILS

`;


            let total = 0;


            kixorCart.forEach(function (item, index) {

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.quantity) || 1;

                const subtotal =
                    price * quantity;


                total += subtotal;


                message +=
`${index + 1}. ${item.name}
Size: ${item.size}
Price: ₹${price.toLocaleString("en-IN")}
Quantity: ${quantity}
Subtotal: ₹${subtotal.toLocaleString("en-IN")}

`;

            });


            message +=
`TOTAL: ₹${total.toLocaleString("en-IN")}

Please confirm availability and order details.`;


            /* WHATSAPP */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank"
            );


            /* CLOSE */

            if (checkoutModal) {

                checkoutModal.classList.remove("active");

            }

        });

    }


    /* ================================
       MOBILE PRODUCT IMAGE SWIPE
    ================================= */

    const galleries =
        document.querySelectorAll(".product-card");


    galleries.forEach(function (card) {

        const mainImage =
            card.querySelector(".gallery-main img");

        const thumbnails =
            card.querySelectorAll(".gallery-thumb");


        if (!mainImage || !thumbnails.length) return;


        let startX = 0;


        mainImage.addEventListener(
            "touchstart",
            function (event) {

                startX =
                    event.touches[0].clientX;

            },
            { passive: true }
        );


        mainImage.addEventListener(
            "touchend",
            function (event) {

                const endX =
                    event.changedTouches[0].clientX;


                const difference =
                    startX - endX;


                /* Minimum swipe */

                if (Math.abs(difference) < 50) {

                    return;

                }


                let currentIndex = 0;


                thumbnails.forEach(
                    function (thumb, index) {

                        if (
                            thumb.classList.contains("active")
                        ) {

                            currentIndex = index;

                        }

                    }
                );


                /* LEFT → NEXT */

                if (difference > 0) {

                    currentIndex++;

                    if (
                        currentIndex >=
                        thumbnails.length
                    ) {

                        currentIndex = 0;

                    }

                }


                /* RIGHT → PREVIOUS */

                else {

                    currentIndex--;

                    if (currentIndex < 0) {

                        currentIndex =
                            thumbnails.length - 1;

                    }

                }


                const selectedThumb =
                    thumbnails[currentIndex];


                const image =
                    selectedThumb.querySelector("img");


                if (!image) return;


                /* CHANGE IMAGE */

                mainImage.src =
                    image.src;


                /* ACTIVE THUMBNAIL */

                thumbnails.forEach(
                    function (thumb) {

                        thumb.classList.remove("active");

                    }
                );


                selectedThumb.classList.add("active");

            },
            { passive: true }
        );

    });


});


/* ================================
   SIZE GUIDE FUNCTIONS
================================ */

function openSizeGuide() {

    const modal =
        document.getElementById("sizeModal");

    if (modal) {

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    }

}


function closeSizeGuide() {

    const modal =
        document.getElementById("sizeModal");

    if (modal) {

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }

}


/* ================================
   ESC KEY
================================ */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeSizeGuide();


        const searchBox =
            document.getElementById("searchBox");

        const searchInput =
            document.getElementById("searchInput");

        const searchResults =
            document.getElementById("searchResults");


        if (searchBox) {

            searchBox.classList.remove("active");

        }


        if (searchInput) {

            searchInput.value = "";

        }


        if (searchResults) {

            searchResults.innerHTML = "";

            searchResults.classList.remove("active");

        }

    }

});


/* ================================
   PRODUCT IMAGE GALLERY
================================ */

function changeProductImage(
    imageName,
    thumbnail
) {

    if (!thumbnail) return;


    const gallery =
        thumbnail.closest(".product-gallery");


    if (!gallery) return;


    const mainImage =
        gallery.querySelector(".gallery-main img");


    if (!mainImage) return;


    mainImage.src =
        imageName;


    const thumbnails =
        gallery.querySelectorAll(".gallery-thumb");


    thumbnails.forEach(function (item) {

        item.classList.remove("active");

    });


    thumbnail.classList.add("active");

}


/* ================================
   MEN / WOMEN SIZE GUIDE
================================ */

function showSizeTable(type, button) {

    const menTable =
        document.getElementById("menSizeTable");

    const womenTable =
        document.getElementById("womenSizeTable");

    const tabs =
        document.querySelectorAll(".size-tab");


    tabs.forEach(function (tab) {

        tab.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }


    if (type === "men") {

        if (menTable) {

            menTable.classList.add("active");

        }

        if (womenTable) {

            womenTable.classList.remove("active");

        }

    } else {

        if (womenTable) {

            womenTable.classList.add("active");

        }

        if (menTable) {

            menTable.classList.remove("active");

        }

    }

}


/* ================================
   PRODUCT FILTER
================================ */

function filterProducts(category) {

    const products =
        document.querySelectorAll(
            "#all-products > .product-card"
        );


    products.forEach(function (product) {

        const productCategory =
            product.dataset.category;


        if (

            category === "all" ||

            productCategory === category ||

            (
                productCategory === "unisex" &&
                (
                    category === "men" ||
                    category === "women"
                )
            )

        ) {

            product.style.setProperty(
                "display",
                "block",
                "important"
            );

        } else {

            product.style.setProperty(
                "display",
                "none",
                "important"
            );

        }

    });


    const newArrivals =
        document.getElementById("new-arrivals");


    if (newArrivals) {

        newArrivals.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ================================
   SEARCH NORMALIZE
================================ */

function normalizeSearch(text) {

    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .trim();

}


/* ================================
   CART COUNT
================================ */

function updateKixorCartCount() {

    const count =
        document.getElementById("cartCount");


    if (count) {

        const totalQuantity =
            kixorCart.reduce(
                function (total, item) {

                    return total +
                        (Number(item.quantity) || 1);

                },
                0
            );


        count.textContent =
            totalQuantity;

    }

}


/* ================================
   RENDER CART
================================ */

function renderKixorCart() {

    const itemsContainer =
        document.getElementById("cartItems");


    const totalElement =
        document.getElementById("cartTotal");


    if (!itemsContainer) return;


    if (kixorCart.length === 0) {

        itemsContainer.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;


        if (totalElement) {

            totalElement.textContent =
                "₹0";

        }


        return;

    }


    let total = 0;


    itemsContainer.innerHTML = "";


    kixorCart.forEach(
        function (item, index) {


            /* Quantity */

            if (!item.quantity) {

                item.quantity = 1;

            }


            const price =
                Number(item.price) || 0;


            const quantity =
                Number(item.quantity) || 1;


            const itemTotal =
                price * quantity;


            total += itemTotal;


            const cartItem =
                document.createElement("div");


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    style="
                        width:80px;
                        height:80px;
                        object-fit:contain;
                        background:#f7f7f7;
                    "
                >

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        ₹${price.toLocaleString("en-IN")}
                    </p>

                    <div class="quantity-control">

                        <button
                            class="quantity-btn"
                            onclick="changeKixorQuantity(${index}, -1)">
                            −
                        </button>

                        <span class="quantity-number">
                            ${quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            onclick="changeKixorQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                    <p class="item-subtotal">

                        Subtotal:

                        <strong>
                            ₹${itemTotal.toLocaleString("en-IN")}
                        </strong>

                    </p>

                    <button
                        class="remove-cart-item"
                        onclick="removeKixorCartItem(${index})">

                        Remove

                    </button>

                </div>

            `;


            itemsContainer.appendChild(
                cartItem
            );

        }
    );


    /* SAVE */

    localStorage.setItem(
        "kixorCart",
        JSON.stringify(kixorCart)
    );


    /* TOTAL */

    if (totalElement) {

        totalElement.textContent =
            "₹" +
            total.toLocaleString("en-IN");

    }

}


/* ================================
   CHANGE QUANTITY
================================ */

function changeKixorQuantity(
    index,
    change
) {

    const item =
        kixorCart[index];


    if (!item) return;


    item.quantity =
        (Number(item.quantity) || 1) +
        change;


    if (item.quantity < 1) {

        item.quantity = 1;

    }


    localStorage.setItem(
        "kixorCart",
        JSON.stringify(kixorCart)
    );


    updateKixorCartCount();

    renderKixorCart();

}


/* ================================
   REMOVE CART ITEM
================================ */

function removeKixorCartItem(index) {

    kixorCart.splice(
        index,
        1
    );


    localStorage.setItem(
        "kixorCart",
        JSON.stringify(kixorCart)
    );


    updateKixorCartCount();

    renderKixorCart();

}


/* ================================
   ADD TO CART
================================ */

document.addEventListener(
    "click",
    function (event) {


        const button =
            event.target.closest(".add-to-cart");


        if (!button) return;


        event.preventDefault();

        event.stopPropagation();


        const product =
            button.closest(".product-card");


        if (!product) return;


        /* SELECTED SIZE */

        const selectedSize =
            product.dataset.selectedSize;


        if (!selectedSize) {

            alert(
                "Please select your shoe size first."
            );

            return;

        }


        /* PRODUCT NAME */

        const name =
            product.querySelector("h3")
                ?.textContent.trim() ||
            "Product";


        /* PRICE */

        const priceText =
            product.querySelector(".current-price")
                ?.textContent.trim() ||
            "₹0";


        const price =
            parseInt(
                priceText.replace(/[^\d]/g, "")
            ) || 0;


        /* IMAGE */

        const image =
    product.querySelector(
        ".gallery-thumb:first-child img"
    )?.src || "";


        /* FIND SAME PRODUCT + SIZE */

        const existingItem =
            kixorCart.find(function (item) {

                return (
                    item.name === name &&
                    item.size === selectedSize
                );

            });


        /* SAME PRODUCT */

        if (existingItem) {

            existingItem.quantity =
                (Number(existingItem.quantity) || 1) +
                1;

        }


        /* NEW PRODUCT */

        else {

            kixorCart.push({

                name: name,

                price: price,

                size: selectedSize,

                image: image,

                quantity: 1

            });

        }


        /* SAVE */

        localStorage.setItem(
            "kixorCart",
            JSON.stringify(kixorCart)
        );


        /* UPDATE */

        updateKixorCartCount();

        renderKixorCart();


        /* OPEN CART */

        const drawer =
            document.getElementById("cartDrawer");


        const overlay =
            document.getElementById("cartOverlay");


        if (drawer) {

            drawer.classList.add("active");

        }


        if (overlay) {

            overlay.classList.add("active");

        }


        /* BUTTON TEXT */

        const oldText =
            button.textContent;


        button.textContent =
            "ADDED ✓";


        setTimeout(function () {

            button.textContent =
                oldText;

        }, 1200);


    }
);


/* ================================
   CONSOLE
================================ */

console.log(
    "KIXOR website loaded successfully."
);