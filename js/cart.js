var envioPercentage = 0.15;
var subtotal = 0;
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
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
                  <input type="number" class="form-control cantidad" id="productCountInput${i}" oninput="validity.valid||(value='');" placeholder="" onchange="calculos(${i})" required="" class="cantidad" value="` + cart.count + `"
                  min="1">
                     </td>
                  <td>
                    <div class="price-wrap"> <var class="price" id="costo">`+ cart.currency + " " + cart.unitCost + `</var> <small class="text-muted">
                      </small> </div>
                  </td>
                  <td>
                  <div class="price-wrap"> <var class="price">UYU <span class="pesos" id="resultado${i}">` + subtotalUYU + `<span/> </var> <small id ="resultadoUSD${i}" class="text-muted"> USD ` + subtotalUSD + ` </small> </div>
              </td>
                  
                  <td class="text-right d-none d-md-block"> <a data-original-title="Save to Wishlist" title="" href=""
                      class="btn btn-light" data-toggle="tooltip" data-abc="true"> <i class="fa fa-heart"></i></a> <button
                       class="btn btn-light remover" data-abc="true"> Remover</button> </td>
                </tr>

              </tbody>
            </table>
            
        `
  }
  document.getElementById("productCart").innerHTML = htmlCart;
}

//funcion que realiza los calculos subtotales
function calculos(posicion) {
  //if que convierte el costo unitario segun la moneda
  if (productCart.articles[posicion].currency === "USD") {
    costUnitUSD = productCart.articles[posicion].unitCost;
    costUnitUYU = productCart.articles[posicion].unitCost * 40;
  } else {
    costUnitUSD = productCart.articles[posicion].unitCost / 40;
    costUnitUYU = productCart.articles[posicion].unitCost;
  }

  m1 = costUnitUYU;
  m2 = document.getElementById("productCountInput" + posicion).value;
  m3 = costUnitUSD;
  r = m1 * m2
  r2 = m3 * m2;
  document.getElementById("resultado" + posicion).innerHTML = r;
  document.getElementById("resultadoUSD" + posicion).innerHTML = "USD " + r2;
  updateTotalCosts();
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
//funcion que remueve articulos
function remove() {
  let removeProductHTML = document.getElementsByClassName("table table-borderless table-shopping-cart");
  let Cartproducts = document.getElementsByClassName("remover");
  //El for utiliza un arreglo con los botones de remover y al clickear borra el producto
  for (let i = 0; i < Cartproducts.length; i++) {
    Cartproducts[i].addEventListener("click", function () {
      removeProductHTML[i].innerHTML = "";
      updateTotalCosts();
    })
  }
}

//funcion que bloquea los botones de la forma de pago no seleccioanda
function check() {
  let credito = document.getElementById("radiocard");
  let nombre = document.getElementById("nombre");
  let numero = document.getElementById("numero");
  let vencimientoMM = document.getElementById("MES");
  let vencimientoYY = document.getElementById("YY");
  let CVV = document.getElementById("CVV");
  let bancario = document.getElementById("bancario");

  if (credito.checked) {
    nombre.disabled = false;
    numero.disabled = false;
    vencimientoMM.disabled = false;
    vencimientoYY.disabled = false;
    CVV.disabled = false;
    bancario.disabled = true;

  } else {
    nombre.disabled = true;
    numero.disabled = true;
    vencimientoMM.disabled = true;
    vencimientoYY.disabled = true;
    CVV.disabled = true;
    bancario.disabled = false;
  }
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
      remove();
      check();
    }
    // Al cambiar el boton segun el tipo de envio cambia el porcentaje de envio y cambia el calculo
    document.getElementById("goldradio").addEventListener("change", function () {
      envioPercentage = 0.15;
      updateTotalCosts();
    });
    document.getElementById("expressradio").addEventListener("change", function () {
      envioPercentage = 0.07;
      updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function () {
      envioPercentage = 0.05;
      updateTotalCosts();
    });

    document.getElementById("sell").addEventListener("submit", function (e) {

      let calle = document.getElementById("calles");
      let esquina = document.getElementById("esquina");
      let numero = document.getElementById("numeroCasa");
      let nombre = document.getElementById("nombre");
      let numeroTarjeta = document.getElementById("numero");
      let vencimientoMM = document.getElementById("MES");
      let vencimientoYY = document.getElementById("YY");
      let CVV = document.getElementById("CVV");
      let bancario = document.getElementById("bancario");
      let tarjetaCredito = document.getElementById("radiocard");
      let numeroCuenta = document.getElementById("radiopay")
      let infoMissing = false;
      let cartelError = document.getElementById("cartelError");

      //Quito las clases que marcan como inválidos
      calle.classList.remove('is-invalid');
      esquina.classList.remove('is-invalid');
      numero.classList.remove('is-invalid');
      cartelError.classList.remove('show');
      //Se realizan los controles necesarios,


      //Consulto por la calle 
      if (calle.value === "") {
        calle.classList.add('is-invalid');
        infoMissing = true;
      }

      //Consulto por la esquina
      if (esquina.value === "") {
        esquina.classList.add('is-invalid');
        infoMissing = true;
      }

      //Consulto por el numero de dommicilio
      if (numero.value <= 0) {
        numero.classList.add('is-invalid');
        infoMissing = true;
      }
      //consulto por forma de pago cuenta bancaria
      if (bancario.value === "" && numeroCuenta.checked) {
        cartelError.classList.add("show");
        infoMissing = true;
      }
      // consulto forma de pago tarjeta de credtio
      if (tarjetaCredito.checked && (nombre.value === "" || numeroTarjeta.value === "" || vencimientoMM.value === "" || vencimientoYY.value === "" || CVV.value === "")) {
        cartelError.classList.add("show");
        infoMissing = true;
      }
 

      if (infoMissing === false) {
        //Aquí ingresa si pasó los controles, irá a enviar
        //la solicitud para crear la publicación.

        getJSONData(CART_BUY_URL).then(function (resultObj) {
          let msgToShowHTML = document.getElementById("resultSpan");
          let msgToShow = "";

          //Si la publicación fue exitosa, devolverá mensaje de éxito,
          //de lo contrario, devolverá mensaje de error.
          if (resultObj.status === 'ok') {
            msgToShow = resultObj.data.msg;
            document.getElementById("alertResult").classList.add('alert-success');
          }
          else if (resultObj.status === 'error') {
            msgToShow = ERROR_MSG;
            document.getElementById("alertResult").classList.add('alert-danger');
          }

          msgToShowHTML.innerHTML = msgToShow;
          document.getElementById("alertResult").classList.add("show");
        });
      }

      //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
      if (e.preventDefault) e.preventDefault();
      return false;
    });

  });
});


