import type { Stall, Coupon } from "../types";

export const COUPONS: Coupon[] = [
  {
    code: "PIDELO10",
    type: "percentage",
    value: 10,
    description: "10% de descuento en todo tu pedido",
  },
  {
    code: "ENVIOGRATIS",
    type: "free_shipping",
    value: 0,
    description: "Envío gratis sin monto mínimo",
  },
  {
    code: "NOVIEMBRE20",
    type: "fixed_discount",
    value: 20,
    description: "Bs 20 de descuento en pedidos desde Bs 80",
  },
];

export const STALLS: Stall[] = [
  {
    id: "stall-1",
    number: 1,
    slug: "saltenas-dona-josefina",
    name: "Salteñas Doña Josefina",
    category: "Salteñas",
    rating: 4.9,
    deliveryTime: 18,
    deliveryFee: 8,
    fromPrice: 7,
    emoji: "🥟",
    promo: {
      type: "percentage",
      value: 20,
      minAmount: 60,
      label: "20% de descuento en pedidos desde Bs 60",
      tag: "20% OFF",
    },
    menu: [
      {
        section: "Populares",
        dishes: [
          { id: "d1-1", name: "Salteña de pollo", description: "Masa dorada, pollo, caldo dulce y picante suave.", price: 7, section: "Populares" },
          { id: "d1-2", name: "Salteña de carne", description: "Carne de res, papa, huevo y aceituna.", price: 7, section: "Populares" },
          { id: "d1-3", name: "Salteña de pollo picante", description: "Pollo con ají amarillo bien picante.", price: 8, section: "Populares" },
        ],
      },
      {
        section: "Platos principales",
        dishes: [
          { id: "d1-4", name: "Plato paceño", description: "Chuño, mote, quesillo, aji y carne.", price: 45, section: "Platos principales" },
          { id: "d1-5", name: "Fricasé cochabambino", description: "Caldo espeso de cerdo, maíz y ají colorado.", price: 40, section: "Platos principales" },
          { id: "d1-6", name: "Sándwich de chola", description: "Pan, cerdo al horno, escabeche y ají.", price: 25, section: "Platos principales" },
        ],
      },
      {
        section: "Bebidas",
        dishes: [
          { id: "d1-7", name: "Api morado", description: "Bebida de maíz morado con canela.", price: 12, section: "Bebidas" },
          { id: "d1-8", name: "Api blanco", description: "Bebida cremosa de maíz blanco.", price: 12, section: "Bebidas" },
          { id: "d1-9", name: "Jugo de tumbo", description: "Fresco natural de tumbo.", price: 15, section: "Bebidas" },
          { id: "d1-10", name: "Coca Cola 500ml", description: "Bebida gaseosa fría.", price: 10, section: "Bebidas" },
        ],
      },
      {
        section: "Postres",
        dishes: [
          { id: "d1-11", name: "Arroz con leche", description: "Clásico postre con canela y pasas.", price: 15, section: "Postres" },
          { id: "d1-12", name: "Gelatina de frutas", description: "Porción de gelatina casera.", price: 8, section: "Postres" },
        ],
      },
      {
        section: "Extras",
        dishes: [
          { id: "d1-13", name: "Llajwa", description: "Salsa picante de tomate y locoto.", price: 3, section: "Extras" },
          { id: "d1-14", name: "Queso extra", description: "Porción de queso derretido.", price: 5, section: "Extras" },
        ],
      },
    ],
  },
  {
    id: "stall-2",
    number: 2,
    slug: "parrilla-el-gauchito",
    name: "Parrilla El Gauchito",
    category: "Parrilla",
    rating: 4.7,
    deliveryTime: 28,
    deliveryFee: 12,
    fromPrice: 35,
    emoji: "🥩",
    promo: {
      type: "free_shipping",
      value: 0,
      minAmount: 100,
      label: "Envío gratis en pedidos desde Bs 100",
      tag: "ENVÍO GRATIS",
    },
    menu: [
      {
        section: "Populares",
        dishes: [
          { id: "d2-1", name: "Silpancho cochabambino", description: "Carne empanizada, arroz, papa, huevo y ensalada.", price: 35, section: "Populares" },
          { id: "d2-2", name: "Pique macho", description: "Carne, salchicha, papas, huevo y tomate.", price: 55, section: "Populares" },
          { id: "d2-3", name: "Churrasco a la parrilla", description: "Tira de res a la brasa con guarnición.", price: 50, section: "Populares" },
        ],
      },
      {
        section: "Platos principales",
        dishes: [
          { id: "d2-4", name: "Pique macho grande", description: "Doble porción para compartir.", price: 65, section: "Platos principales" },
          { id: "d2-5", name: "Costilla de res a la parrilla", description: "Costillar asado lentamente.", price: 60, section: "Platos principales" },
          { id: "d2-6", name: "Pollo a la parrilla", description: "1/4 de pollo con guarnición.", price: 45, section: "Platos principales" },
          { id: "d2-7", name: "Picana", description: "Sopa tradicional de carnes y verduras.", price: 55, section: "Platos principales" },
        ],
      },
      {
        section: "Bebidas",
        dishes: [
          { id: "d2-8", name: "Cerveza Taquiña", description: "Cerveza paceña 350ml.", price: 18, section: "Bebidas" },
          { id: "d2-9", name: "Cerveza Paceña", description: "Cerveza paceña 350ml.", price: 18, section: "Bebidas" },
          { id: "d2-10", name: "Chicha morada", description: "Bebida de maíz morado dulce.", price: 12, section: "Bebidas" },
          { id: "d2-11", name: "Limonada con hielo", description: "Limón batido con azúcar y hielo.", price: 12, section: "Bebidas" },
        ],
      },
      {
        section: "Postres",
        dishes: [
          { id: "d2-12", name: "Helado de canela", description: "Dos bolas de helado artesanal.", price: 15, section: "Postres" },
          { id: "d2-13", name: "Flan casero", description: "Flan de vainilla con caramelo.", price: 18, section: "Postres" },
        ],
      },
      {
        section: "Extras",
        dishes: [
          { id: "d2-14", name: "Porción extra de papas", description: "Papas fritas doradas.", price: 10, section: "Extras" },
          { id: "d2-15", name: "Llajwa", description: "Salsa picante de la casa.", price: 3, section: "Extras" },
          { id: "d2-16", name: "Huevo frito", description: "Un huevo frito extra.", price: 6, section: "Extras" },
        ],
      },
    ],
  },
  {
    id: "stall-3",
    number: 3,
    slug: "pizza-bella-napoli",
    name: "Pizza Bella Napoli",
    category: "Pizza",
    rating: 4.6,
    deliveryTime: 32,
    deliveryFee: 10,
    fromPrice: 55,
    emoji: "🍕",
    promo: {
      type: "percentage",
      value: 15,
      minAmount: 80,
      label: "15% de descuento en pedidos desde Bs 80",
      tag: "15% OFF",
    },
    menu: [
      {
        section: "Populares",
        dishes: [
          { id: "d3-1", name: "Pizza margarita", description: "Salsa de tomate, mozzarella y albahaca.", price: 55, section: "Populares" },
          { id: "d3-2", name: "Pizza pepperoni", description: "Pepperoni y queso mozzarella fundido.", price: 65, section: "Populares" },
          { id: "d3-3", name: "Pizza napolitana", description: "Tomate, anchoas, orégano y queso.", price: 60, section: "Populares" },
        ],
      },
      {
        section: "Platos principales",
        dishes: [
          { id: "d3-4", name: "Pizza cuatro quesos", description: "Mozzarella, parmesano, azul y provolone.", price: 70, section: "Platos principales" },
          { id: "d3-5", name: "Pizza hawaiana", description: "Jamón, piña y mozzarella.", price: 68, section: "Platos principales" },
          { id: "d3-6", name: "Pizza de lomo", description: "Lomo de res, cebolla, tomate y queso.", price: 75, section: "Platos principales" },
          { id: "d3-7", name: "Pizza vegetariana", description: "Pimiento, champiñones, aceituna y choclo.", price: 62, section: "Platos principales" },
          { id: "d3-8", name: "Calzone relleno", description: "Masa doblada con jamón y queso.", price: 60, section: "Platos principales" },
        ],
      },
      {
        section: "Bebidas",
        dishes: [
          { id: "d3-9", name: "Coca Cola 1.5L", description: "Botella familiar fría.", price: 20, section: "Bebidas" },
          { id: "d3-10", name: "Limonada frappé", description: "Limón batido con menta y hielo.", price: 15, section: "Bebidas" },
          { id: "d3-11", name: "Vino tinto", description: "Copa de vino tinto de la casa.", price: 35, section: "Bebidas" },
        ],
      },
      {
        section: "Postres",
        dishes: [
          { id: "d3-12", name: "Tiramisú", description: "Postre italiano con café y mascarpone.", price: 25, section: "Postres" },
          { id: "d3-13", name: "Brownie con helado", description: "Brownie de chocolate y helado de vainilla.", price: 22, section: "Postres" },
        ],
      },
      {
        section: "Extras",
        dishes: [
          { id: "d3-14", name: "Queso extra", description: "Capa extra de mozzarella.", price: 10, section: "Extras" },
          { id: "d3-15", name: "Orilla rellena de queso", description: "Borde relleno de queso.", price: 12, section: "Extras" },
          { id: "d3-16", name: "Ajos al horno", description: "Porción de pan de ajo.", price: 5, section: "Extras" },
        ],
      },
    ],
  },
  {
    id: "stall-4",
    number: 4,
    slug: "burger-house-cbba",
    name: "Burger House Cochabamba",
    category: "Hamburguesas",
    rating: 4.8,
    deliveryTime: 25,
    deliveryFee: 9,
    fromPrice: 35,
    emoji: "🍔",
    promo: {
      type: "fixed_discount",
      value: 10,
      minAmount: 70,
      label: "Bs 10 de descuento en pedidos desde Bs 70",
      tag: "Bs 10 OFF",
    },
    menu: [
      {
        section: "Populares",
        dishes: [
          { id: "d4-1", name: "Cheeseburger clásica", description: "Carne, queso cheddar, lechuga y tomate.", price: 35, section: "Populares" },
          { id: "d4-2", name: "Doble carne", description: "Doble hamburguesa con tocino y queso.", price: 45, section: "Populares" },
          { id: "d4-3", name: "Hamburguesa bacon", description: "Carne, tocino crujiente y salsa BBQ.", price: 42, section: "Populares" },
        ],
      },
      {
        section: "Platos principales",
        dishes: [
          { id: "d4-4", name: "Smash burger", description: "Carne aplastada con queso americano.", price: 40, section: "Platos principales" },
          { id: "d4-5", name: "Hamburguesa BBQ especial", description: "Carne, cebolla caramelizada y BBQ.", price: 45, section: "Platos principales" },
          { id: "d4-6", name: "Hamburguesa de pollo", description: "Pechuga apanada con mayonesa.", price: 38, section: "Platos principales" },
          { id: "d4-7", name: "Hamburguesa veggie", description: "Medallón de lentejas y verduras.", price: 38, section: "Platos principales" },
          { id: "d4-8", name: "Combo burger + papas + bebida", description: "Hamburguesa, papas y gaseosa.", price: 60, section: "Platos principales" },
        ],
      },
      {
        section: "Bebidas",
        dishes: [
          { id: "d4-9", name: "Coca Cola 500ml", description: "Gaseosa fría.", price: 10, section: "Bebidas" },
          { id: "d4-10", name: "Sprite 500ml", description: "Gaseosa de limón fría.", price: 10, section: "Bebidas" },
          { id: "d4-11", name: "Limonada de frutas", description: "Limón con frutas de temporada.", price: 12, section: "Bebidas" },
          { id: "d4-12", name: "Milkshake de chocolate", description: "Batido cremoso de chocolate.", price: 22, section: "Bebidas" },
        ],
      },
      {
        section: "Postres",
        dishes: [
          { id: "d4-13", name: "Helado de vainilla", description: "Dos bolas de helado.", price: 15, section: "Postres" },
          { id: "d4-14", name: "Sundae de chocolate", description: "Helado, chocolate y crema.", price: 18, section: "Postres" },
        ],
      },
      {
        section: "Extras",
        dishes: [
          { id: "d4-15", name: "Papas fritas", description: "Porción grande de papas crujientes.", price: 15, section: "Extras" },
          { id: "d4-16", name: "Aros de cebolla", description: "Crujientes aros de cebolla.", price: 18, section: "Extras" },
          { id: "d4-17", name: "Tocino extra", description: "Dos tiras de tocino.", price: 8, section: "Extras" },
          { id: "d4-18", name: "Queso extra", description: "Lámina de queso extra.", price: 7, section: "Extras" },
        ],
      },
    ],
  },
  {
    id: "stall-5",
    number: 5,
    slug: "sushi-garden",
    name: "Sushi Garden",
    category: "Sushi",
    rating: 4.7,
    deliveryTime: 35,
    deliveryFee: 15,
    fromPrice: 45,
    emoji: "🍣",
    promo: {
      type: "percentage",
      value: 25,
      minAmount: 120,
      label: "25% de descuento en pedidos desde Bs 120",
      tag: "25% OFF",
    },
    menu: [
      {
        section: "Populares",
        dishes: [
          { id: "d5-1", name: "Roll philadelphia", description: "Salmón, queso crema y pepino.", price: 55, section: "Populares" },
          { id: "d5-2", name: "Roll california", description: "Kanikama, palta y ajonjolí.", price: 48, section: "Populares" },
          { id: "d5-3", name: "Roll tempura", description: "Roll frito relleno de queso y langostino.", price: 60, section: "Populares" },
        ],
      },
      {
        section: "Platos principales",
        dishes: [
          { id: "d5-4", name: "Combo 24 piezas", description: "Variedad de rolls y niguiris para 2 personas.", price: 120, section: "Platos principales" },
          { id: "d5-5", name: "Combo 16 piezas", description: "Selección de rolls variados.", price: 85, section: "Platos principales" },
          { id: "d5-6", name: "Roll dragón", description: "Langostino tempura, palta y salsa unagi.", price: 70, section: "Platos principales" },
          { id: "d5-7", name: "Roll acevichado", description: "Roll con salsa acevichada picante.", price: 65, section: "Platos principales" },
          { id: "d5-8", name: "Niguiri de salmón", description: "Dos piezas de arroz con salmón fresco.", price: 45, section: "Platos principales" },
          { id: "d5-9", name: "Gyozas (6u)", description: "Empanaditas japonesas al vapor.", price: 50, section: "Platos principales" },
        ],
      },
      {
        section: "Bebidas",
        dishes: [
          { id: "d5-10", name: "Té verde helado", description: "Té verde con hielo y limón.", price: 12, section: "Bebidas" },
          { id: "d5-11", name: "Sake caliente", description: "Copa de sake tradicional.", price: 40, section: "Bebidas" },
          { id: "d5-12", name: "Limonada de jengibre", description: "Refresco con jengibre y menta.", price: 15, section: "Bebidas" },
        ],
      },
      {
        section: "Postres",
        dishes: [
          { id: "d5-13", name: "Mochi de frutilla", description: "Pastelito de arroz con helado.", price: 18, section: "Postres" },
          { id: "d5-14", name: "Helado frito", description: "Helado rebozado y frito.", price: 22, section: "Postres" },
        ],
      },
      {
        section: "Extras",
        dishes: [
          { id: "d5-15", name: "Salsa de soya extra", description: "Porción adicional.", price: 3, section: "Extras" },
          { id: "d5-16", name: "Wasabi extra", description: "Wasabi picante extra.", price: 4, section: "Extras" },
          { id: "d5-17", name: "Gari (jengibre) extra", description: "Jengibre encurtido extra.", price: 5, section: "Extras" },
        ],
      },
    ],
  },
  {
    id: "stall-6",
    number: 6,
    slug: "dulce-tentacion",
    name: "Dulce Tentación",
    category: "Postres",
    rating: 4.9,
    deliveryTime: 20,
    deliveryFee: 7,
    fromPrice: 15,
    emoji: "🍰",
    promo: {
      type: "free_shipping",
      value: 0,
      minAmount: 50,
      label: "Envío gratis en pedidos desde Bs 50",
      tag: "ENVÍO GRATIS",
    },
    menu: [
      {
        section: "Populares",
        dishes: [
          { id: "d6-1", name: "Tres leches", description: "Bizcocho bañado en tres leches con crema.", price: 20, section: "Populares" },
          { id: "d6-2", name: "Chocolate volcánico", description: "Postre de chocolate con centro líquido.", price: 25, section: "Populares" },
          { id: "d6-3", name: "Cheesecake de frutilla", description: "Tarta de queso con coulis de frutilla.", price: 22, section: "Populares" },
        ],
      },
      {
        section: "Platos principales",
        dishes: [
          { id: "d6-4", name: "Torta de chocolate", description: "Porción de torta húmeda de chocolate.", price: 25, section: "Platos principales" },
          { id: "d6-5", name: "Flan casero", description: "Flan con caramelo y nata.", price: 18, section: "Platos principales" },
          { id: "d6-6", name: "Tiramisú", description: "Capas de café y queso mascarpone.", price: 24, section: "Platos principales" },
          { id: "d6-7", name: "Mousse de maracuyá", description: "Mousse cremosa de maracuyá.", price: 20, section: "Platos principales" },
          { id: "d6-8", name: "Postre del día", description: "Especialidad rotativa de la casa.", price: 18, section: "Platos principales" },
        ],
      },
      {
        section: "Bebidas",
        dishes: [
          { id: "d6-9", name: "Café latte", description: "Café espresso con leche vaporizada.", price: 15, section: "Bebidas" },
          { id: "d6-10", name: "Capuchino", description: "Café con espuma de leche.", price: 16, section: "Bebidas" },
          { id: "d6-11", name: "Chocolate caliente", description: "Chocolate cremoso con canela.", price: 14, section: "Bebidas" },
          { id: "d6-12", name: "Té de frutas", description: "Infusión caliente de frutas.", price: 10, section: "Bebidas" },
        ],
      },
      {
        section: "Postres",
        dishes: [
          { id: "d6-13", name: "Gelatina multicapa", description: "Gelatina de varios colores.", price: 8, section: "Postres" },
          { id: "d6-14", name: "Helado 2 bolas", description: "Elige dos sabores.", price: 16, section: "Postres" },
        ],
      },
      {
        section: "Extras",
        dishes: [
          { id: "d6-15", name: "Crema extra", description: "Porción de crema chantilly.", price: 5, section: "Extras" },
          { id: "d6-16", name: "Frutas extra", description: "Frutas frescas de temporada.", price: 7, section: "Extras" },
        ],
      },
    ],
  },
  {
    id: "stall-7",
    number: 7,
    slug: "pollo-dorado",
    name: "Pollo Dorado",
    category: "Parrilla",
    rating: 4.5,
    deliveryTime: 22,
    deliveryFee: 9,
    fromPrice: 30,
    emoji: "🍗",
    promo: {
      type: "fixed_discount",
      value: 15,
      minAmount: 90,
      label: "Bs 15 de descuento en pedidos desde Bs 90",
      tag: "Bs 15 OFF",
    },
    menu: [
      {
        section: "Populares",
        dishes: [
          { id: "d7-1", name: "1/4 pollo + papas", description: "Cuarto de pollo a la brasa con papas.", price: 30, section: "Populares" },
          { id: "d7-2", name: "1/2 pollo + papas", description: "Medio pollo a la brasa con papas.", price: 50, section: "Populares" },
          { id: "d7-3", name: "Pollo broaster", description: "Pollo apanado crujiente con papas.", price: 35, section: "Populares" },
        ],
      },
      {
        section: "Platos principales",
        dishes: [
          { id: "d7-4", name: "Pollo entero + papas + ensalada", description: "Un pollo entero con guarniciones.", price: 95, section: "Platos principales" },
          { id: "d7-5", name: "Alitas BBQ (12u)", description: "Alitas bañadas en salsa BBQ.", price: 40, section: "Platos principales" },
          { id: "d7-6", name: "Mozzarela sticks (6u)", description: "Palitos de mozzarella apanados.", price: 35, section: "Platos principales" },
          { id: "d7-7", name: "Nuggets de pollo (10u)", description: "Nuggets crujientes.", price: 30, section: "Platos principales" },
        ],
      },
      {
        section: "Bebidas",
        dishes: [
          { id: "d7-8", name: "Coca Cola 1L", description: "Botella de un litro.", price: 15, section: "Bebidas" },
          { id: "d7-9", name: "Fanta 1L", description: "Botella de un litro.", price: 12, section: "Bebidas" },
          { id: "d7-10", name: "Limonada con hierbabuena", description: "Refresco natural.", price: 12, section: "Bebidas" },
        ],
      },
      {
        section: "Postres",
        dishes: [
          { id: "d7-11", name: "Helado de vainilla", description: "Dos bolas de helado.", price: 12, section: "Postres" },
          { id: "d7-12", name: "Brownie", description: "Porción de brownie de chocolate.", price: 18, section: "Postres" },
        ],
      },
      {
        section: "Extras",
        dishes: [
          { id: "d7-13", name: "Papas extra", description: "Porción extra de papas.", price: 12, section: "Extras" },
          { id: "d7-14", name: "Ensalada", description: "Ensalada fresca de la casa.", price: 10, section: "Extras" },
          { id: "d7-15", name: "Llajwa", description: "Salsa picante boliviana.", price: 3, section: "Extras" },
        ],
      },
    ],
  },
];

export const CATEGORIES: string[] = [
  "Todos",
  "Salteñas",
  "Parrilla",
  "Pizza",
  "Hamburguesas",
  "Sushi",
  "Postres",
];

export const CATEGORIES_EMOJI: Record<string, string> = {
  Todos: "🍽️",
  Salteñas: "🥟",
  Parrilla: "🥩",
  Pizza: "🍕",
  Hamburguesas: "🍔",
  Sushi: "🍣",
  Postres: "🍰",
};

export const COCHABAMBA_CENTER: [number, number] = [-17.3935, -66.157];
