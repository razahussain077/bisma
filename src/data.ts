export const categories = [
  "Women",
  "Men",
  "Baby",
  "Kids",
  "H&M HOME",
  "Beauty",
  "Sport",
  "Sale",
  "Sustainability"
];

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Oversized Fit Printed T-shirt",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    category: "Men",
    isNew: true
  },
  {
    id: 2,
    name: "Wide High Jeans",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    category: "Women"
  },
  {
    id: 3,
    name: "Rib-knit Dress",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    category: "Women",
    isNew: true
  },
  {
    id: 4,
    name: "Regular Fit Linen-blend Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e32f6b717?w=600&q=80",
    category: "Men"
  },
  {
    id: 5,
    name: "2-piece Cotton Set",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1519238263530-99abad67b86e?w=600&q=80",
    category: "Kids"
  },
  {
    id: 6,
    name: "Washed Linen Duvet Cover Set",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1522771731478-44eb10e5c835?w=600&q=80",
    category: "H&M HOME"
  },
  {
    id: 7,
    name: "DryMove™ Sports Top",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80",
    category: "Sport"
  },
  {
    id: 8,
    name: "Matte Lipstick",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
    category: "Beauty"
  },
  {
    id: 9,
    name: "Chunky Loafers",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
    category: "Women"
  },
  {
    id: 10,
    name: "Relaxed Fit Hoodie",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    category: "Men"
  },
  {
    id: 11,
    name: "Patterned Cotton Dress",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    category: "Kids"
  },
  {
    id: 12,
    name: "Ceramic Vase",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80",
    category: "H&M HOME"
  }
];
