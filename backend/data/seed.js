/**
 * PosterKing seed script — run with: npm run seed
 * Seeds products, categories, and a default region (India / INR) into Medusa.
 */

const { MedusaApp } = require("@medusajs/framework");

const products = [
  {
    title: "DEFENDER | BUILT FOR NO ROADS",
    subtitle: "8 Panel Split Wall Set",
    handle: "defender-8-panel",
    status: "published",
    category_ids: ["cars-bikes"],
    thumbnail: "https://www.posterized.in/cdn/shop/files/NEWDWALL8SPILT_jpg.jpg?v=1769703364&width=533",
    options: [
      { title: "Size", values: ["A4", "A3", "A2"] },
      { title: "Finish", values: ["Matte", "Glossy", "Framed"] },
    ],
    variants: [
      { title: "A4 / Matte",  sku: "DEF-A4-MATTE",  price: 49900,  original_price: 99900, inventory_quantity: 100 },
      { title: "A3 / Matte",  sku: "DEF-A3-MATTE",  price: 69900,  original_price: 129900, inventory_quantity: 100 },
      { title: "A2 / Matte",  sku: "DEF-A2-MATTE",  price: 99900,  original_price: 159900, inventory_quantity: 100 },
      { title: "A4 / Glossy", sku: "DEF-A4-GLOSS",  price: 54900,  original_price: 109900, inventory_quantity: 100 },
      { title: "A3 / Glossy", sku: "DEF-A3-GLOSS",  price: 74900,  original_price: 139900, inventory_quantity: 100 },
      { title: "A4 / Framed", sku: "DEF-A4-FRAME",  price: 149900, original_price: 249900, inventory_quantity: 50 },
    ],
  },
  {
    title: "BMW M4 DOMINANCE | SUPER CAR",
    subtitle: "8 Panel Split Wall Set",
    handle: "bmw-m4-8-panel",
    status: "published",
    category_ids: ["cars-bikes"],
    thumbnail: "https://www.posterized.in/cdn/shop/files/NEWbWALL8SPILT_jpg.jpg?v=1769701721&width=533",
    options: [
      { title: "Size", values: ["A4", "A3", "A2"] },
      { title: "Finish", values: ["Matte", "Glossy", "Framed"] },
    ],
    variants: [
      { title: "A4 / Matte",  sku: "BMW-A4-MATTE", price: 49900,  original_price: 99900,  inventory_quantity: 100 },
      { title: "A3 / Matte",  sku: "BMW-A3-MATTE", price: 69900,  original_price: 129900, inventory_quantity: 100 },
      { title: "A4 / Glossy", sku: "BMW-A4-GLOSS", price: 54900,  original_price: 109900, inventory_quantity: 100 },
    ],
  },
  {
    title: "BLACK PANTHER LEGACY",
    subtitle: "3 Piece Set",
    handle: "black-panther-3-piece",
    status: "published",
    category_ids: ["marvel"],
    thumbnail: "https://www.posterized.in/cdn/shop/files/blackpanther1_22c3b291-1166-4186-8189-936711466fec.jpg?v=1777101350&width=533",
    options: [
      { title: "Size", values: ["A4", "A3", "A2"] },
      { title: "Finish", values: ["Matte", "Glossy", "Framed"] },
    ],
    variants: [
      { title: "A4 / Matte",  sku: "BP-A4-MATTE", price: 34900, original_price: 69900, inventory_quantity: 100 },
      { title: "A3 / Matte",  sku: "BP-A3-MATTE", price: 49900, original_price: 89900, inventory_quantity: 100 },
      { title: "A4 / Glossy", sku: "BP-A4-GLOSS", price: 39900, original_price: 79900, inventory_quantity: 100 },
    ],
  },
  {
    title: "RISE | GHOST OF SPARTA | KRATOS",
    subtitle: "3 Piece Set",
    handle: "kratos-rise-3-piece",
    status: "published",
    category_ids: ["gaming"],
    thumbnail: "https://www.posterized.in/cdn/shop/files/1_957f5038-b6d5-4187-a0d6-7bba94a938f4.webp?v=1772195234&width=533",
    options: [
      { title: "Size", values: ["A4", "A3", "A2"] },
      { title: "Finish", values: ["Matte", "Glossy"] },
    ],
    variants: [
      { title: "A4 / Matte",  sku: "KRA-A4-MATTE", price: 34900, original_price: 69900, inventory_quantity: 100 },
      { title: "A3 / Matte",  sku: "KRA-A3-MATTE", price: 49900, original_price: 89900, inventory_quantity: 100 },
      { title: "A4 / Glossy", sku: "KRA-A4-GLOSS", price: 39900, original_price: 79900, inventory_quantity: 100 },
    ],
  },
  {
    title: "PERSONALIZE YOUR WALL | 8 PANEL CUSTOM",
    subtitle: "Custom Wall Set",
    handle: "custom-8-panel",
    status: "published",
    category_ids: ["custom"],
    thumbnail: "https://www.posterized.in/cdn/shop/files/CustomNEW8WALLSPILT_35c3afa0-9eab-4f72-9015-f5645e9183a4.jpg?v=1775134132&width=533",
    options: [
      { title: "Size", values: ["A4", "A3", "A2"] },
      { title: "Finish", values: ["Matte", "Glossy", "Framed", "Canvas"] },
    ],
    variants: [
      { title: "A4 / Matte",   sku: "CUS-A4-MATTE",  price: 52900, original_price: 99900,  inventory_quantity: 999 },
      { title: "A3 / Matte",   sku: "CUS-A3-MATTE",  price: 72900, original_price: 129900, inventory_quantity: 999 },
      { title: "A4 / Framed",  sku: "CUS-A4-FRAME",  price: 149900, original_price: 249900, inventory_quantity: 999 },
      { title: "A4 / Canvas",  sku: "CUS-A4-CANVAS", price: 169900, original_price: 299900, inventory_quantity: 999 },
    ],
  },
];

module.exports = { products };
