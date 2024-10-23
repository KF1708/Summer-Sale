// console.log("connected");

const products = document.getElementsByClassName("card-body");
const totalItemPrice = document.getElementById("totalItemPrice");
const discountTotal = document.getElementById("discountTotal");
const totalPrice = document.getElementById("total");
const purchaseBtn = document.getElementById("btn-Purchase");
const couponCode = document.getElementById("coupon-Code");
const couponBtn = document.getElementById("btn-Coupon");

console.log(products);


products.addEventListener ("click",() => {
     

       fetch(`product.json`)
       .then(res => res.json())
       .then(data => {
              console.log(data)

              const cartItems = data.name;
              const itemsPrice = data.price;
              const itemsAddTOCart = document.createElement("li");
              itemsAddTOCart.innerHTML = cartItems;
              products.appendChild(itemsAddTOCart)

              const total = 0;
              const price = parseFloat(itemsPrice)
              total+=price;
              totalItemPrice.innerHTML = total;
              totalPrice.innerHTML = total

              if(total>=0){
                     purchaseBtn.removeAttribute("disabled");
              }
              if (total>=200) {
                     couponBtn.removeAttribute("disabled");
              }

              couponBtn.addEventListener("click",()=>{
                     const coupon = couponCode.value;

                     if (coupon === "SELL200"){
                            const discountedPrice = total * .20;
                            discountTotal.innerHTML = discountedPrice;
                            totalPrice.innerHTML = total - discountedPrice;
                            
                     }
                     if( purchaseBtn === coupon){
                            const congSection = document.getElementById("cong-section");
                            congSection.style.display = "block";
                     }
                         else {
                            alert("You need to select items..")
                         }   
              })


       })
       .catch(err => console.log(err)
       )
})
