const ORDER_ASC_BY_COST = "MENOR A MAYOR";
const ORDER_DESC_BY_COST = "MAYOR A MENOR";
const ORDER_BY_SOLD_COUNT = "Precio.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}


// Funcion que muestra los productos en un card
function showProducts() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        //Filtro rango
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {


            htmlContentToAppend += `
<div class="col-md-4">            
    <a href="product-info.html" class="shadow-sm custom-card">
            
        <div class="card mb-4 shadow-sm">
            <img class="card-img-top img-fluid" src="` + product.imgSrc + `" alt="`+product.description+`">
            <div class="card-body">
                <h5 class="card-text">`+ product.name + `</h5>
                <p class="card-text">`+ product.description + `</p>   
               <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <p class="card-text"> `+ product.currency + " " + product.cost + `</p>
                  </div>
                   <small class="text-muted">` + product.soldCount + ` artículos</small>
                  
                </div>
            </div>
        </div>
    </a>
</div>    
        `
        }
        document.getElementById("products-list").innerHTML = htmlContentToAppend;
    }
}


function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProducts();
}
// Buscador en tiempo real por nombre.
function myFunction() {
    var texto, div, search, x, i, txtValue;
    search = document.getElementById("buscador");
    texto = search.value.toLowerCase();
    div = document.getElementById("products-list").getElementsByTagName("div");

    for (i = 0; i < div.length; i++) {
        x = div[i].getElementsByClassName("data")[0];
        if (x) {
            txtValue = x.textContent;
            if (txtValue.toLowerCase().indexOf(texto) > -1) {
                div[i].style.display = "";
            } else {
                div[i].style.display = "none";
            }
        }
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            //Muestro lista de productos
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });
    //buscador
    document.getElementById("buscador").addEventListener("keyup", function () {
        myFunction()
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProducts()
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }
        showProducts();
    });
});