var envioPercentage = 0.15;
var subtotal = 0;
var subtotalArray = [];

//Funcion que muestra los productos en el carrito, recorriendo el array mediante un for 
//muestra los distintos productos
function showCart(array) {

  let htmlCart = "";

  for (let i = 0; i < array.length; i++) {
    let cart = array[i];
    //if para mostrar el costo unitario en UYU y en USD
    if (cart.currency === "USD") {
      costUnitUSD = cart.unitCost;
      costUnitUYU = cart.unitCost * 40;
    } else {
      costUnitUSD = cart.unitCost / 40;
      costUnitUYU = cart.unitCost;
    }

    subtotalUYU = costUnitUYU * cart.count;
    subtotalUSD = costUnitUSD * cart.count;

    htmlCart += `
        <table class="table table-borderless table-shopping-cart">
              <thead class="text-muted">
                <tr class="small text-uppercase">
                  <th scope="col">Producto</th>
                  <th scope="col" width="120">Cantidad</th>
                  <th scope="col" width="120">Precio</th>
                  <th scope="col">Subtotal</th>

                  <th scope="col" class="text-right d-none d-md-block" width="200"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="nombre">
                    <figure class="itemside align-items-center">
                      <div class="aside"><img
                          src="`+ cart.src + `" class="img-sm">
                      </div>
                      <figcaption class="info"> <a href="product-info.html" class="title text-dark" data-abc="true">`+ cart.name + `
                          </a>
                        <p class="text-muted small">En Stock </p>
                      </figcaption>
                    </figure>
                  </td>
                  <td>
                  <input type="number" class="form-control cantidad" id="productCountInput${i}" placeholder="" required="" class="cantidad" value="` + cart.count + `"
                  min="0">
                     </td>
                  <td>
                    <div class="price-wrap"> <var class="price" id="costo">`+ cart.currency + " " + cart.unitCost + `</var> <small class="text-muted">
                      </small> </div>
                  </td>
                  <td>
                  <div class="price-wrap"> <var class="price">UYU <span class="pesos" id="resultado${i}">` + subtotalUYU + `<span/> </var> <small id ="resultadoUSD${i}" class="text-muted"> USD ` + subtotalUSD + ` </small> </div>
              </td>
                  
                  <td class="text-right d-none d-md-block"> <a data-original-title="Save to Wishlist" title="" href=""
                      class="btn btn-light" data-toggle="tooltip" data-abc="true"> <i class="fa fa-heart"></i></a> <a
                      href="" class="btn btn-light" data-abc="true"> Remover</a> </td>
                </tr>

              </tbody>
            </table>
            
        `
  }
  document.getElementById("productCart").innerHTML = htmlCart;
  updateSubtotal();
}

//funcion que realiza los calculos subtotales
function calculos() {
  //Arreglo que trae todos los input
  let subtotalArray = document.getElementsByClassName("cantidad");

  for (let i = 0; i < subtotalArray.length; i++) {
    if (productCart.articles[i].currency === "USD") {
      costUnitUSD = productCart.articles[i].unitCost;
      costUnitUYU = productCart.articles[i].unitCost * 40;
    } else {
      costUnitUSD = productCart.articles[i].unitCost / 40;
      costUnitUYU = productCart.articles[i].unitCost;
    }

    m1 = costUnitUYU;
    m2 = subtotalArray[i].value;
    m3 = costUnitUSD;
    r = m1 * m2
    r2 = m3 * m2;
    document.getElementById("resultado" + i).innerHTML = r;
    document.getElementById("resultadoUSD" + i).innerHTML = "USD " + r2;
    updateTotalCosts();
  }
}

//Funcion que muestra el subtotal y total
function updateSubtotal() {
  let subtotalArray = document.getElementsByClassName("cantidad");
  // Utiliza un arreglo con los distintos input y ejecuta las funciones para mostrar subtotales
  // al cambiar los valores de los input 
  for (let i = 0; i < subtotalArray.length; i++) {
    subtotalArray[i].addEventListener("change", function () {
      calculos();
    });
  }
}

// Funcion que calcula total
function updateTotalCosts() {
  // El for utiliza un arreglo con los valores subtotales y los suma en la variable subtotal
  let subtotalArray = document.getElementsByClassName("pesos");
  for (let i = 0; i < subtotalArray.length; i++) {
    subtotal += parseInt(subtotalArray[i].textContent);
  }

  let unitProductCostHTML = document.getElementById("subtotalCost");
  let envioCostHTML = document.getElementById("envioCost");
  let totalCostHTML = document.getElementById("totalcost");

  let unitCostToShow = "$" + subtotal;
  let comissionToShow = "$" + (subtotal * envioPercentage);
  let totalCostToShow = "$" + (subtotal + (subtotal * envioPercentage));

  unitProductCostHTML.innerHTML = unitCostToShow;
  envioCostHTML.innerHTML = comissionToShow;
  totalCostHTML.innerHTML = totalCostToShow;
  subtotal = 0;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productCart = resultObj.data;

      //Muestro productos carrito
      showCart(productCart.articles);
      //Muestro total
      updateTotalCosts();
    }
    // Al cambiar el boton segun el tipo de envio cambia el porcentaje de envio y cambia el calculo
    document.getElementById("premiumradio").addEventListener("change", function () {
      envioPercentage = 0.07;
      updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function () {
      envioPercentage = 0.05;
      updateTotalCosts();
    });

  });
});


