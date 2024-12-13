import ProductCatalog from "./_product-catalog";
import ProductCarousel from "./_product-carousel";

export default function ProductPage() {
  return (
    <section className="portal-page-container">
      <ProductCarousel />
      <ProductCatalog />
    </section>
  );
}
