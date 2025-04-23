export default function Features() {
    const items = [
      { title: "Premium Fabrics", desc: "Soft, breathable & eco‑friendly materials." },
      { title: "Free Shipping", desc: "On all orders over $50." },
      { title: "Easy Returns", desc: "30‑day money‑back guarantee." },
    ];
  
    return (
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Shop With Us?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((f) => (
            <div key={f.title} className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  