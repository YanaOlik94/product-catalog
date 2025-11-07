import { ProductDetailPage } from '../../components/product-detail/ProductDetailPage';


export function generateStaticParams(): Promise<{ id: string }[]> {
  return fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((products: { id: number }[]) =>
      products.map((p) => ({
        id: p.id.toString(),
      }))
    );
}

// @ts-expect-error — Next 15 bug: wrong inferred type for params
export default function Page({ params }: PageProps) {
    const numericId = Number(params.id);
    return  <ProductDetailPage productId={numericId} />;
};
