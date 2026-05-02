// BASE DE DADOS
const data = {
  produtos: [
    { id: 1, nome: "iPhone 14", preco: 5000, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Celular top", emEstoque: true },
    { id: 2, nome: "Samsung S23", preco: 4000, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Android poderoso", emEstoque: true },
    { id: 3, nome: "Notebook Dell", preco: 3500, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Ótimo para estudo", emEstoque: true },
    { id: 4, nome: "MacBook", preco: 9000, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Alta performance", emEstoque: false },
    { id: 5, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "RGB bonito", emEstoque: true },
    { id: 6, nome: "Teclado Mecânico", preco: 300, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Switch azul", emEstoque: true },
    { id: 7, nome: "PlayStation 5", preco: 4500, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Console da Sony", emEstoque: false },
    { id: 8, nome: "Xbox Series X", preco: 4300, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Console da Microsoft", emEstoque: true }
  ]
};

// DOM
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

// FORMATAR PREÇO
function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

// CRIAR CARD
function createProductCard(produto) {
  const card = document.createElement("div");

  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  card.style.backgroundColor = "#f9f9f9"; // uso de style

  const title = document.createElement("h3");
  title.textContent = produto.nome;

  const img = document.createElement("img");
  img.src = produto.imagem;

  const price = document.createElement("p");
  price.textContent = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.textContent = produto.categoria;

  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Ver detalhes";

  const btnHighlight = document.createElement("button");
  btnHighlight.textContent = "Destacar";

  // EVENTOS
  btnDetails.addEventListener("click", () => {
    showProductDetails(produto);
  });

  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

// RENDERIZAR PRODUTOS
function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  // querySelectorAll
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log("Card ID:", card.getAttribute("data-id"));
  });
}

// CATEGORIAS
function renderCategories() {
  const categorias = [...new Set(data.produtos.map(p => p.categoria))];

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// DETALHES
function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p>Preço: ${formatPrice(produto.preco)}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

// FILTRO
function filterProducts() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  return data.produtos.filter(p => {
    const matchNome = p.nome.toLowerCase().includes(texto);
    const matchCategoria = categoria === "Todas" || p.categoria === categoria;
    return matchNome && matchCategoria;
  });
}

// EVENTOS GERAIS
searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(filterProducts());
});

// INICIALIZAÇÃO
renderCategories();
renderProducts(data.produtos);