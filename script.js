function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
 event.target.remove();
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const adicionandoItemCarrinho = async (id) => {
  const funcaoApiItem = await fetchItem(id);
  const itemClasse = document.querySelector('.cart__items');
  itemClasse.appendChild(createCartItemElement(funcaoApiItem));
  console.log(id);
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const item = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  item.addEventListener('click', () => adicionandoItemCarrinho(sku));
  section.appendChild(item);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const criandoLista = async (produto) => {
  const listaResultados = await fetchProducts(produto);
  const pegandoClasse = document.querySelector('.items');
  listaResultados.forEach(({ id: sku, title: name, thumbnail: image }) => { 
    const chamandoFuncao = createProductItemElement({ sku, name, image });
    pegandoClasse.appendChild(chamandoFuncao); 
  }); 
};

window.onload = async () => { 
  await criandoLista('computador');
  await cartItemClickListener();
};
