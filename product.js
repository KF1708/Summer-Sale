const productContainer = document.getElementById("product-container");
const totalItemPriceEl = document.getElementById("totalItemPrice");
const discountTotalEl = document.getElementById("discountTotal");
const totalPriceEl = document.getElementById("total");
const purchaseBtnEl = document.getElementById("btn-Purchase");
const couponCodeEl = document.getElementById("coupon-Code");
const couponBtnEl = document.getElementById("btn-Coupon");
const addedItems = document.getElementById("addedItems");
const gohomeBtnEL = document.getElementById("btn-gohome");

let totalPrice = 0;

const handleProductClick = (product) => {
  totalPrice += product.price;
  totalItemPriceEl.innerHTML = totalPrice;

  const singleProduct = document.createElement("li");
  singleProduct.innerText = product.name;
  addedItems.appendChild(singleProduct);

  console.log(totalPrice);

  if (totalPrice > 0) {
    purchaseBtnEl.removeAttribute("disabled");
  } else {
    purchaseBtnEl.setAttribute("disabled", true);
  }

  if (totalPrice <= 200) {
    couponBtnEl.setAttribute("disabled", true);
  } else {
    couponBtnEl.removeAttribute("disabled");
  }
};

fetch("./product.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    for (let i = 0; i <= data.length; i++) {
      const productData = data[i];

      const product = document.createElement("div"); // create a new div element
      product.classList.add("col-md-3"); // use the classList to add three columns based on a medium device or above for each product
      product.addEventListener("click", () => handleProductClick(productData));
      product.innerHTML = `
              <div class=" justify-content-center my-3">
                                <div class="card">
                                 
            
                <img src="${
                  productData.img
                }" class=" bg-body-secondary " id="img">
                
                 <div> <i class="fa-regular fa-star ${
                   productData.rating >= 1 ? "icon-orange" : ""
                 } style="background-color: goldenrod""></i>
              <i class="fa-regular fa-star ${
                productData.rating >= 2 ? "icon-orange" : ""
              } "></i>
              <i class="fa-regular fa-star ${
                productData.rating >= 3 ? "icon-orange" : ""
              }"></i>
              <i class="fa-regular fa-star ${
                productData.rating >= 4 ? "icon-orange" : ""
              }"></i>
              <i class="fa-regular fa-star ${
                productData.rating >= 5 ? "icon-orange" : ""
              }"></i></div>
              <h1 style="font-size :16px;" class =" my-2"> ${
                productData.name
              } </h1>
              <h5 style="color:gray;font-size :15px;" "><span>$${
                productData.price
              }.00</span></h5>
              </div>
                     </div>
               
              </div>  `;
      productContainer.appendChild(product);
    }
  })
  .catch((err) => console.log(err));

couponBtnEl.addEventListener("click", () => {
  const coupon = couponCodeEl.value;

  if (coupon === "SELL200") {
    const discountedPrice = Math.round(totalPrice * 0.2);
    discountTotalEl.innerHTML = discountedPrice;
    totalPriceEl.innerHTML = totalPrice - discountedPrice;
    totalPrice -= discountedPrice;
  }
  if (purchaseBtnEl.value === coupon) {
    const congSection = document.getElementById("cong-section");
    congSection.style.display = "block";
  }
});

gohomeBtnEL.addEventListener("click", function () {
  totalItemPriceEl.innerText = "";
  discountTotalEl.innerText = "";
  totalPriceEl.innerText = "";
  addedItems.innerText = "";
});
