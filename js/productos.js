let prod1 = {
    nombre: "Capuccino",
    img: "capuccino.png",
    categoria: "Cafés calientes",
    // precio: 1500,
    breve: "El equilibrio entre espresso intenso, leche vaporizada y espuma suave.",
    descripcion: "Una danza equilibrada entre espresso intenso, leche vaporizada y espuma suave. Su aroma a café recién molido te envuelve mientras la taza se posa en la mesa. Cada sorbo es un encuentro con la Italia de las plazas soleadas.",
    variantes: [
        {nombre: "Normal", medida: 200, precio: 1800},
        {nombre: "Grande", medida: 280, precio: 2000}
    ]
};

let prod2 = {
    nombre: "Café americano",
    img: "cafe.png",
    categoria: "Cafés calientes",
    precio: 1500,
    breve: "Fusión directa entre un espresso fuerte y agua caliente.",
    descripcion: "Bebida simple y directa. Se prepara agregando agua caliente a un espresso, diluyendo así su intensidad. No tiene espuma ni adornos; es pura cafeína y sabor. Es como el despertador matutino que te dice: “Aquí estoy para ayudarte a empezar el día”.",
};

let prod3 = {
    nombre: "Sundae Frutilla",
    img: "sundae.png",
    categoria: "Postres",
    precio: 1000,
    breve: "Delicioso helado de vainilla con salsa de frutilla.",
    descripcion: "El helado, cremoso y frío, se derrite en la lengua como un abrazo de verano. Pero lo que lo hace especial es esa salsa de frutilla. Imagina fresas maduras, rojas y jugosas, cocidas con un toque de azúcar hasta que se vuelven irresistiblemente dulces. La salsa se desliza sobre el helado, formando un río rosado que se mezcla con la crema.",
};

let prod4 = {
    nombre: "Chocolate Caliente",
    img: "chocolate-caliente.png",
    categoria: "Cafés calientes",
    // precio: 2000,
    breve: "Delicioso chocolate amargo con leche y crema chantilly.",
    descripcion: "Una base de chocolate oscuro, profundo y sedoso con leche. La crema batida se posa en la superficie, como una nube dulce que se derrite lentamente. Cada sorbo es un viaje al corazón del invierno.",
    variantes: [
        {nombre: "Normal", medida: 200, precio: 2000},
        {nombre: "Grande", medida: 280, precio: 2200}
    ]
};

const capuccino = new Producto(prod1);
const cafe = new Producto(prod2);
const sundae = new Producto(prod3);
const chocolateCaliente = new Producto(prod4);