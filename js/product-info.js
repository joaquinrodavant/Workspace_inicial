var product = {};
var productlist = [];
var productComent = [];
var newcoment = [];
var estrellas = 0;
//Funcion que muestra las Imagenes en un carrusel
function showImagesGallery(array) {

    let html = "";
    let htmlImages = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        //for que controla los li con clase "active"
        if (i == 0) {
            html += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `" class="active"></li>`
            htmlImages += `
                     <div class="carousel-item active">
                       <img src="`+ imageSrc + `" class="d-block w-100" alt="...">
                     </div>
        `} else {
            html += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `"</li>`
            htmlImages +=
                ` <div class="carousel-item">
                    <img src="`+ imageSrc + `" class="d-block w-100" alt="...">
                  </div>`
        }
    }
    document.getElementById("productImages").innerHTML = htmlImages;
    document.getElementById("carrusel").innerHTML = html
}

//Funcion que muestra Prouctos relacionados
function showProuctsRealated(array) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productlist = resultObj.data;

            let htmlContentToAppend = "";
           //Cada elemento de array lo pasa como posicion en productlist
            for (let i = 0; i < array.length; i++) {
                let relatedPosition = array[i];
                let productrelated = productlist[relatedPosition];

                htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6 border">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + productrelated.imgSrc + `" alt="">
                <h3 style="text-align:center;"> ` + productrelated.name + ` </h3>
                <div> `+ productrelated.description + ` </div>
                <a href="product-info.html" target="_blank"> ver mas </a> 
            </div>
        </div>
        `

                document.getElementById("productRelated").innerHTML = htmlContentToAppend;
            }
        }
    })
}

//Funcion que Muestra comentarios
function showProductComent(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let coment = array[i];

        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="d-block mb-4 h-100">
                <h5> <strong> `+ coment.user + ` </strong> </h5>
                <span class="comentscore"> </span>
                <p class="small"> Fecha `+ coment.dateTime + `  </p>
                <div> `+ coment.description + ` </div>
            </div>
        </div>
        `
        document.getElementById("coment").innerHTML = htmlContentToAppend;
    }
}

// Funcion que muestra las estrellas en los comentarios.
function showRating(array) {
    for (let i = 0; i < array.length; i++) {
        let htmlstars = ""
        let rating = array[i].score;
        let stars = "";

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fa fa-star checked"></i>';
            } else {
                stars += '<i class="fa fa-star"></i>';
            }

            htmlstars = `<span>  ${stars}</span>`
        }

        document.getElementsByClassName("comentscore")[i].innerHTML = htmlstars;
    }
}

// Determinar la fecha
let d = new Date();
let A = d.getFullYear();
let B = d.getMonth() + 1;
let C = d.getDate();
let D = d.getHours();
let E = d.getMinutes();
let F = d.getSeconds();
//Funcion que muestra los nuevos comentarios
function newComent() {
    let newdate = A + "-" + B + "-" + C + " " + D + ":" + E + ":" + F;
    let ncoment = document.getElementById("opinion").value;

    let html = "";

    html += `
        <div class="list-group-item">
            <div class="d-block mb-4 h-100">
                <h5> <strong> `+ localStorage.getItem("Dirección correo electronico") + ` </strong> </h5>
                <span id="newcomentscore"> </span>
                <p class="small"> Fecha ` + newdate + `  </p>
                <div> ` + ncoment + ` </div>
            </div>
        </div>
        `
    document.getElementById("newcoment").innerHTML = html;
}
//Funcion que muestra las estrellas de los nuevos comentarios
function newShowRating() {
    let rating = estrellas
    let html = "";
    let newstars = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            newstars += '<i class="fa fa-star checked"></i>';
        } else {
            newstars += '<i class="fa fa-star"></i>';
        }

        html = `<span>  ${newstars}</span>`
    }

    document.getElementById("newcomentscore").innerHTML = html;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productCount");
            let productCostHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            //Muetro productos relacionados
            showProuctsRealated(product.relatedProducts);

        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComent = resultObj.data;

            //Muestro comentarios y rating
            showProductComent(productComent);
            showRating(productComent);
        }
    });
    //Traigo el valor del input estrellas despues de hacer click en dicho input
    document.getElementById("radio1").addEventListener("click", function () {
        estrellas = document.getElementById("radio1").value;
    });
    document.getElementById("radio2").addEventListener("click", function () {
        estrellas = document.getElementById("radio2").value;
    });
    document.getElementById("radio3").addEventListener("click", function () {
        estrellas = document.getElementById("radio3").value;
    });
    document.getElementById("radio4").addEventListener("click", function () {
        estrellas = document.getElementById("radio4").value;
    });
    document.getElementById("radio5").addEventListener("click", function () {
        estrellas = document.getElementById("radio5").value;
    });
    //Funcion que se ejecuta luego de hacer click en el boton Publicar.
    document.getElementById("publicar").addEventListener("click", function () {
        //Muestro nuevos comentarios y rating
        newComent();
        newShowRating();
        //Bloquea el boton Publicar luego de hacer un comentario
        publicar.disabled = true;
        //Vacia textarea luego de comentar
        document.getElementById("opinion").value = "";
    });

});




