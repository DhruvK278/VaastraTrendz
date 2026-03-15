import ProductDetails from './ProductDetails';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  image: string;
  details: string[];
}

export default function ProductDetailsWrapper({ product }: { product: Product }) {
  return <ProductDetails product={product} />;
}