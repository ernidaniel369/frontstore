import Cookies from 'js-cookie';

export class Product {
  static productsArray = [];

  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  static addNewProduct(id, name, price, stock, email) {
    const newProduct = new Product(id, name, price, stock);
    this.addProduct(newProduct, email);
    console.log('item agregado');
  }

  static addProduct(product, email) {
    const products = JSON.parse(Cookies.get(`products-${email}`) || '[]');
    const existingProductIndex = products.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        products[existingProductIndex].quantity++;
    } else {
        // Si es un nuevo producto, establece la cantidad en 1
        product.quantity = 1;
        products.push(product);
    }

    Cookies.set(`products-${email}`, JSON.stringify(products));
}


  static getAllProducts(email) {
    const products = Cookies.get(`products-${email}`);
    if (products) {
      try {
        return JSON.parse(products);
      } catch (error) {
        console.error('Error al parsear el JSON de productos:', error);
      }
    }
    return [];
  }

static deleteProduct(id, email) {
    const products = JSON.parse(Cookies.get(`products-${email}`));
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex > -1) {
      products.splice(productIndex, 1);
      Cookies.set(`products-${email}`, JSON.stringify(products));
      console.log(`El producto ${id} ha sido eliminado.`);
    } else {
      console.log(`No se encontró ningún producto con el id ${id}.`);
    }
}
  //muestra y elimina todas las cookies 
  static muestraCookies() {
    Object.keys(Cookies.get()).forEach(function (products) {
      Cookies.remove(products);
    });
    console.log('cookies eliminadas');
    
  }

  
  

}