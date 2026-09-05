(function () {
  var botao = document.getElementById("imprimir");
  if (botao) {
    botao.addEventListener("click", function () {
      window.print();
    });
  }

  var links = document.querySelectorAll(".rail a");
  var secoes = [];
  links.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var el = document.querySelector(id);
      if (el) secoes.push({ link: link, el: el });
    }
  });

  function marcar() {
    var atual = secoes[0];
    secoes.forEach(function (item) {
      if (item.el.getBoundingClientRect().top <= 96) atual = item;
    });
    links.forEach(function (link) { link.classList.remove("ativa"); });
    if (atual) atual.link.classList.add("ativa");
  }

  document.addEventListener("scroll", marcar, { passive: true });
  marcar();
})();
