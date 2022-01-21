// função para salvar no local storage 
const pegandoClasse = document.querySelector('.cart__items');

const saveLocalStorage = () => {
 const filhosOl = pegandoClasse.children;
 const listArray = [];
 for (let index = 0; index < filhosOl.length; index += 1) {
   const pegandoTexto = filhosOl[index].innerText;
   listArray.push(pegandoTexto);
  }
  const tranformandoObjeto = { listArray };
  
  const tranformandoStringObjeto = JSON.stringify(tranformandoObjeto);
  console.log(tranformandoStringObjeto);
  saveCartItems(tranformandoStringObjeto);
};

// função que já veio pronta que cria a imagem 
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// função que eu criei para fazer a soma dos itens do carrinho
const somaCarrinho = () => {
  const pegandoClassePreco = document.querySelector('.total-price');
  const itensCarrinho = Array.from(document.getElementsByClassName('cart__item'));
  const map = itensCarrinho.map((element) => {
    const itemTexto = element.innerText;
     return +itemTexto.split('$')[1];
  });
   const precoFinal = map.reduce((acc, elemento) => acc + elemento, 0);
   pegandoClassePreco.innerText = precoFinal;
 };

// função que veio estruturada, eu usei para apagar o item no carrinho, atraves do target
function cartItemClickListener(event) {
 event.target.remove();
 somaCarrinho();
 saveLocalStorage();
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// função que veio pronta que estrutura o que tem no carrinho de compras, e que chama a função de apagar o item do carrinho quando tem o evento de click.
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// função criada do zero para pegar o id do fetchItem e ai eu capito a classe e coloco um filho nela chamando a função que cria a estrutura e dentro dela o parametro é a minha funcão com o API do item que eu tenho o objeto e ai consigo pegar os dados que eu quero. 
const adicionandoItemCarrinho = async (id) => {
  const funcaoApiItem = await fetchItem(id);
  pegandoClasse.appendChild(createCartItemElement(funcaoApiItem));
  somaCarrinho();
  saveLocalStorage();
};

// função que veio criada com os elementos para manipular o id, name e image e ai dentro do botão carrinho eu coloquei um evento de click que vai chamar a minha função de adicionar o item no carrinho. 
function createProductItemElement(props) {
 const { id, title, thumbnail } = props;
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const item = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  item.addEventListener('click', () => {
    adicionandoItemCarrinho(id);
  });
  section.appendChild(item);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// função para carregar a pagina enquanto esta carregando a API
const carregandoApi = () => {
const divCarregando = document.createElement('div');
divCarregando.className = 'loading';
const sectionCarregando = document.querySelector('.items');
sectionCarregando.appendChild(divCarregando);
divCarregando.innerText = 'carregando...';
};

// função tirando o carregando depois de carregar o API
const tirandoApi = () => {
const classeLoad = document.getElementsByClassName('loading')[0];
classeLoad.remove();
};

// função que eu criei para poder pegar a API dos pordutos e ai eu pego a minha classe do html e dentro dela eu faço um forEach para poder ir em item por item do meu API e dentro do for eu chamo a minha função creatProductItemElement que vai pegar os valores id, name, e image e coloca ela como filho da classe Items.
const criandoLista = async (produto) => {
   carregandoApi();
  const listaResultados = await fetchProducts(produto);
  const pegandoClasse1 = document.querySelector('.items');
  listaResultados.forEach((elemento) => { 
    const chamandoFuncao = createProductItemElement(elemento);
    pegandoClasse1.appendChild(chamandoFuncao); 
  }); 
  tirandoApi();
};

// função que eu criei para esvaziar o carrinho todo quando apertar o botão esvaziar
const esvaziarCarrinhoCompras = (() => {
 const botao = document.querySelector('.empty-cart');
 botao.addEventListener('click', () => {
  const itensLista = document.querySelectorAll('.cart__items li');
    for (let i = 0; i < itensLista.length; i += 1) {
      itensLista[i].remove();
    }
    somaCarrinho();
    localStorage.clear();
  });
});

// função para pegar o que eu salvei na local storage
const getLocalStorage = () => {
  const itemLocalStorage = getSavedCartItems();
  const { listArray } = JSON.parse(itemLocalStorage);
  listArray.forEach((item) => {
    const criandoLi = document.createElement('li');
    criandoLi.innerText = item;
    criandoLi.className = 'cart__item';
    pegandoClasse.appendChild(criandoLi);
    criandoLi.addEventListener('click', cartItemClickListener);
  });
   const botao = document.querySelector('.empty-cart');
  botao.addEventListener('click', esvaziarCarrinhoCompras);
  somaCarrinho();
};
   esvaziarCarrinhoCompras();
window.onload = async () => { 
  await criandoLista('computador');
  getLocalStorage();
};

// o requisito 2 e requisito 5 e o requsito 4  foi com a ajuda do Alessandro
// o requisito 3 tirei uma dúvida na monitoria
// Mariana ajudou no requisito 4 
