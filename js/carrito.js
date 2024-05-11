$(document).ready(function() {
  fnCargarProductosGaleria();
  fnObtenerSesionCarrito();
  fnListarCarrito();
});

var carrito = [];
var productos = [];

function fnCargarProductosGaleria() {
  $.ajax({
    url: "/js/json/productos.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var productosHTML = "";
      productos = data;
      for (var i = 0; i < data.length; i++) {
        var producto = data[i];

        var estrellasHTML = "";
        for (var j = 0; j < 5; j++) {
          estrellasHTML += '<i class="fas fa-star"></i>';
        }

        productosHTML += '<div class="box">';
        productosHTML += '<div class="image">';
        productosHTML +=
          '<img src="' + '../image/' + 
          producto.imagen +
          '" alt="' +
          producto.nombre +
          '" width="261" height="193" class="imagen">';
        productosHTML += '<a href="#" class="fas fa-heart"></a>';
        productosHTML += "</div>";
        productosHTML += '<div class="content">';
        productosHTML += '<div class="stars">' + estrellasHTML + "</div>";
        productosHTML += "<h3>" + producto.nombre + "</h3>";
        productosHTML += "<p>" + producto.descripcion + "</p>";
        productosHTML +=
          '<button class="btn" onclick="fnAgregarCarrito(' +
          producto.id +
          ')">Agregar al carrito</button>';
        productosHTML +=
          '<span class="price">€' + producto.precio + "</span>";
        productosHTML += "</div>";
        productosHTML += "</div>";
      }

      if(document.getElementById("productosGaleria") != null){
        document.getElementById("productosGaleria").innerHTML +=
        productosHTML;

        fnAgregarEfectoGaleria();
      }
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar productos: " + error);
    },
  });
}

function fnAgregarEfectoGaleria(){
  const imagenes = document.querySelectorAll(".imagen");
    
  imagenes.forEach(function (imagen) {
    imagen.addEventListener("mouseover", function () {
      imagen.style.transform = "scale(1.1)";
    });

    imagen.addEventListener("mouseout", function () {
      imagen.style.transform = "scale(1)";
    });
  });
}

function fnObtenerSesionCarrito() {
  if (localStorage.getItem("carrito") !== null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  } else {
    carrito = [];
  }
}

function fnGuardarSesionCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function fnAgregarCarrito(id) {
  var indice = fnExisteProductoCarrito(id);
  var producto = fnBuscarProducto(id);

  if (indice === -1) {
    var itemCarrito = {
      id: producto.id,
      imagen: producto.imagen,
      nombre: producto.nombre,
      tamanio: producto.descripcion,
      precio: producto.precio,
      cantidad: 1,
    };
    carrito.push(itemCarrito);
  } else {
    carrito[indice].cantidad = carrito[indice].cantidad + 1;
  }

  fnGuardarSesionCarrito();
}

function fnBuscarProducto(id) {
  for (var i = 0; i < productos.length; i++) {
    var item = productos[i];

    if (item.id === id) {
      return item;
    }
  }
  return null;
}

function fnExisteProductoCarrito(id) {
  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];

    if (item.id === id) {
      return i;
    }
  }
  return -1;
}

function fnListarCarrito() {
    var html = '';
    var total = 0;

    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];

        html += `
            <tr>
                <td>
                    <img class='card_img' src='../image/${item.imagen}' style='width: 100px;height: 50px;' >
                </td>
                <td>${item.nombre}</td>
                <td>${item.precio.toFixed(2)}</td>
                <td>${item.cantidad}</td>
                <td>${(item.cantidad * item.precio ).toFixed(2)}</td>
                <td>
                    <a href='#' onclick='fnEliminarItemCarrito(${i})' class='btn-eliminar' title='Eliminar'>X</a>
                </td>
        </tr>
        `;
        total += (item.cantidad * item.precio);

    }

    if(document.getElementById("listCarrito") != null){
      if (carrito.length === 0) {
          document.getElementById("listCarrito").classList.add("ocultar");
      } else {
          document.getElementById("listCarrito").classList.remove("ocultar");
      }
      document.getElementById("listCarrito").classList.remove("ocultar");
      document.getElementById('subtotal').innerHTML = total.toFixed(2);
      document.getElementById('envio').innerHTML = (0).toFixed(2);
      document.getElementById('total').innerHTML = total.toFixed(2);
      document.getElementById('valor_act_presupuesto').value = total.toFixed(2);
      document.getElementById('valor_presupuesto').value = total.toFixed(2);

      document.getElementById('listCarrito').innerHTML = html;
    }
}

function fnEliminarItemCarrito(indice) {
    carrito.splice(indice, 1);

    fnListarCarrito();
    fnGuardarSesionCarrito();
}

function fnAgregarExtra(){
  var suma = 0;
  
  var checkboxes = document.querySelectorAll('.formulario__input[type="checkbox"]');
  
  checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
          suma += parseInt(checkbox.value); 
      }
  });

  var totalActual = parseFloat(document.getElementById('valor_act_presupuesto').value);
 
  var nuevoTotal = totalActual + suma;
  document.getElementById('valor_presupuesto').value = nuevoTotal.toFixed(2);
}