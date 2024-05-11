$(document).ready(function() {
  fnNoticias()
});

function fnNoticias() {
    $.ajax({
      url: "/js/json/noticias.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        var noticias = data;
        for (var i = 0; i < noticias.length; i++) {
          var card = "<div>";
          card += '<div class="content">';
          card += "<h3>" + noticias[i].titulo + "</h3>";
          card += "<p>" + noticias[i].descripcion + "</p>";
          card +=
            '<a href="' +
            noticias[i].link +
            '" class="btn btn-success btn-sm" target="_blank">Ver más</a>';
          card += "</div></div></br>";

          document.getElementById("noticias").innerHTML += card;
        }
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar noticias: " + error);
      },
    });
  }
