let qtd = 1;     // padrao da qtd de escolha
let pizId = 0;  //pizza selecionada
let cart = [];   //carrinho


const c = (el)=> {
    return document.querySelector(el);
}

const call = (el)=> {
    return document.querySelectorAll(el);
}

// QTD PIZZA NA JANELA DE CONFIRMAÇAO




pizzaJson.map((item, index)=>{

let pizzaItem = c('.pizza-item').cloneNode(true);

//preencher as info da div pizza-item

pizzaItem.setAttribute('data-key', index);

pizzaItem.querySelector('.pizza-item--img img').src = item.img;

pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$  ${item.price[2].toFixed(2)}`; //STRING `  ` ; toFixed(2) apenas 2 algoritimos apos a virgula.

pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;


pizzaItem.querySelector('a').addEventListener('click', (e)=> {
    e.preventDefault();
    
     let key = e.target.closest('.pizza-item').getAttribute('data-key');
     

   pizId = key; // INFORMA A PIZZA SELECIONADA.
   qtd=1; // QTD PIZZA NA JANELA DE CONFIRMAÇAO

     // MOSTRANDO ELEMENTOS NA JANELA DE COMPRA

c('.pizzaBig img').src = pizzaJson[key].img;
c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

c('.pizzaInfo--actualPrice').innerHTML = `R$  ${item.price[2].toFixed(2)}`; //STRING `  ` ; toFixed(2) apenas 2 algoritimos apos a virgula.


// TAMANHOS DA PIZZA 
c('.pizzaInfo--size.selected').classList.remove('selected');

call('.pizzaInfo--size').forEach((size, sizeIndex) => {
   
     if (sizeIndex ==2) {

        size.classList.add('selected');
     };
   

    size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
  
});


// VARIAVEL PREÇO x TAMANHO

let precoAtual = [ ];

call('.pizzaInfo--size').forEach((price, precoIndex) => {
    price.addEventListener('click', () => {
        
     c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[precoIndex].toFixed(2)}`;
         
    });
});

    
c('.pizzaInfo--qt').innerHTML = qtd;


     // MOSTRANDO JANELA E ESTILO DE APARIÇÃO DA JANELA DE COMPRA
    c('.pizzaWindowArea').style.opacity=0;

    c('.pizzaWindowArea').style.display="flex";
     
    setTimeout(()=> {
        c('.pizzaWindowArea').style.opacity=1;

    },300)
    

});


c('.pizza-area').append(pizzaItem);
// clona o a div pizza-item sem preencher


});


// EVENTOS DA JANELA

function closeJanela() {

    c('.pizzaWindowArea').style.opacity=0;
            
    setTimeout(()=> {
        c('.pizzaWindowArea').style.display='none';

    },500);

};

call('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{

  item.addEventListener('click', closeJanela);

})






// QTD DE PIZZAS
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{

    qtd++;
    c('.pizzaInfo--qt').innerHTML = qtd;
})


c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (qtd >1) {
    qtd--;
    c('.pizzaInfo--qt').innerHTML = qtd;
}
}) 



//selecionando tamanhos das pizzas;
call('.pizzaInfo--size').forEach((size, sizeIndex) => {


  size.addEventListener('click', (e)=>{

     c('.pizzaInfo--size.selected').classList.remove('selected');
 
     size.classList.add('selected');


  })


});


// botao de add

c('.pizzaInfo--addButton').addEventListener('click', ()=>{

 
let size = c('.pizzaInfo--size.selected').getAttribute('data-key');


// agrupando itens iguais

let identifier = pizzaJson[pizId].id+'@'+size;

let key = cart.findIndex((item)=> item.identifier == identifier);

if(key>-1) {

cart[key].qt+= qtd;

}  


else {

    //carrinho de compras
    cart.push({

        id:pizzaJson[pizId].id,
        size,
        qt:qtd,
       
     
        
        })
        attCart ();
        closeJanela();
}

})




// mostrando o carrinho no celular
c('.menu-openner').addEventListener('click', ()=>{

if (cart.length>0) {

    c('aside').style.left = '0';

}  });


c('.menu-closer').addEventListener('click', ()=>{
   
    c('aside').style.left = '100vw';

})


// atualizando carrinho

function attCart () {


c('.menu-openner span').innerHTML=cart.length;

if (cart.length > 0) {

c('aside').classList.add('show');
c('.cart').innerHTML='';


let subtotal = 0;

let desconto = 0;

let total = 0;



for (let i in cart) {

 let cartItem = c('.cart--item').cloneNode(true);
 let pizza = pizzaJson.find((item)=> item.id == cart[i].id);
   
 let valor =  pizza.price[i];

            
            subtotal += pizza.price[i] * cart[i].qt;  


let pizzaName = `${pizza.name}` + " " + "(" + cart[i].size +")"+ " " + valor;


cartItem.querySelector('img').src=pizza.img;
cartItem.querySelector('.cart--item-nome').innerHTML= pizzaName;
cartItem.querySelector('.cart--item--qt').innerHTML= cart[i].qt;



cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{ 
cart[i].qt++,
attCart();

});


cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{ 
    
    if (cart[i].qt > 1) {

        cart[i].qt--;

    }
    
    else {

       cart.splice(i,1);

    }

        attCart();
    
    });



c('.cart').append(cartItem);

}

desconto = subtotal*0.15;
 total = subtotal - desconto;


//`R$ ${subtotal.toFixed(2)}`

c('.subtotal span:last-child').innerHTML= `R$ ${subtotal.toFixed(2)}`;

c('.desconto span:last-child').innerHTML= `R$ ${desconto.toFixed(2)}`;

c('.total span:last-child').innerHTML= `R$ ${total.toFixed(2)}`;


}  else {

    c('aside').classList.remove('show');
    c('aside').style.left='100vw';
}



// Exibição de valores







}

