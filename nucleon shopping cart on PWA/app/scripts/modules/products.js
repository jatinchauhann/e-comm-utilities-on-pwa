
import Product from 'product';

//   constructor (sku, title, price, image, description='') {

// Normally you would get these from a server
export const products = [
  new Product('BarrelChair', 'Barrel Chair', 100.00, 'BarrelChair.jpg',
    'A beautiful chair made of upcycled barrel staves'),
  new Product('C10', 'C10 Chair', 100.00, 'C10.jpg',
    'A colorful chair with modern style and flair'),
  new Product('Cl2', 'CL2 Chair', 100.00, 'Cl2.jpg',
    'A comfortable extended chair made for lounging'),
  new Product('CP03_blue', 'CP03 Chair', 100.00, 'CP03_blue.jpg',
    'A wide cushion you can stack or move around the floor'),
  new Product('CPC_RECYCLED', 'CPC Upcycled', 100.00, 'CPC_RECYCLED.jpg',
    'A simple chair with a seat of recycled plastic'),
  new Product('CPFS', 'CPFS', 100.00, 'CPFS.jpg',
    'A footstool mader to complement the CPFS chair'),
  new Product('CPO2_red', 'CPO2', 100.00, 'CPO2_red.jpg',
    'A narrow cushion, smaller than CP03, and quite comfortable'),
  new Product('CPT', 'CPT Table', 100.00, 'CPT.jpg',
    'A perfect table for outdoors, has a hole for an umbrella'),
  new Product('CS1', 'CS1 Sofa', 100.00, 'CS1.jpg',
    'A soft, stylish, and colorful sofa. Perfect for your home')
];

export function findProduct(sku, searchRange = products) {
  return searchRange.find(product => product.sku === sku);
}
