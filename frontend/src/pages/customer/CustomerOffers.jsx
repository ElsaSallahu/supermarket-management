import { Link } from "react-router-dom";

function CustomerOffers() {
  const offers = [
    {
      id: 1,
      product: "Coca Cola",
      discount: "20%",
      oldPrice: "1.20€",
      newPrice: "0.96€",
      description: "Limited time discount on refreshing drinks.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600",
    },
    {
      id: 2,
      product: "Chocolate",
      discount: "15%",
      oldPrice: "1.80€",
      newPrice: "1.53€",
      description: "Special offer for sweets and snacks.",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600",
    },
    {
      id: 3,
      product: "Orange Juice",
      discount: "10%",
      oldPrice: "1.60€",
      newPrice: "1.44€",
      description: "Fresh drink promotion for customers.",
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600",
    },
    {
      id: 4,
      product: "Bread",
      discount: "25%",
      oldPrice: "0.60€",
      newPrice: "0.45€",
      description: "Daily bakery discount.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    },
  ];

  return (
    <div style={page}>
      <div style={header}>
        <div>
          <h1 style={title}>Special Offers</h1>
          <p style={subtitle}>
            Discover the latest supermarket promotions and discounts.
          </p>
        </div>

        <div style={summaryBox}>
          <h3>{offers.length}</h3>
          <p>Active Offers</p>
        </div>
      </div>

      <div style={banner}>
        <div>
          <h2>Save more today!</h2>
          <p>Check our selected products with special prices.</p>
        </div>
        <Link to="/customer/products" style={bannerBtn}>
          Shop Products
        </Link>
      </div>

      <div style={grid}>
        {offers.map((offer) => (
          <div key={offer.id} style={card}>
            <div style={imageWrapper}>
              <img src={offer.image} alt={offer.product} style={image} />

              <span style={discountBadge}>-{offer.discount}</span>
            </div>

            <div style={content}>
              <h3 style={productName}>{offer.product}</h3>

              <p style={description}>{offer.description}</p>

              <div style={priceRow}>
                <span style={oldPrice}>{offer.oldPrice}</span>
                <span style={newPrice}>{offer.newPrice}</span>
              </div>

              <Link to="/customer/products" style={button}>
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const page = {
  background: "#f8fafc",
  minHeight: "100vh",
  padding: "30px",
};

const header = {
  background: "white",
  padding: "28px",
  borderRadius: "22px",
  marginBottom: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const title = {
  fontSize: "34px",
  color: "#0f172a",
  margin: 0,
};

const subtitle = {
  color: "#64748b",
  fontSize: "16px",
};

const summaryBox = {
  background: "#dcfce7",
  color: "#166534",
  padding: "18px 25px",
  borderRadius: "18px",
  textAlign: "center",
  fontWeight: "700",
};

const banner = {
  background: "linear-gradient(135deg, #16a34a, #22c55e)",
  color: "white",
  padding: "30px",
  borderRadius: "22px",
  marginBottom: "28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 10px 25px rgba(15,23,42,0.10)",
};

const bannerBtn = {
  background: "white",
  color: "#16a34a",
  padding: "12px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "22px",
};

const card = {
  background: "white",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
};

const imageWrapper = {
  height: "180px",
  position: "relative",
  overflow: "hidden",
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const discountBadge = {
  position: "absolute",
  top: "12px",
  right: "12px",
  background: "#ef4444",
  color: "white",
  padding: "8px 13px",
  borderRadius: "12px",
  fontWeight: "800",
};

const content = {
  padding: "20px",
};

const productName = {
  color: "#0f172a",
  fontSize: "21px",
};

const description = {
  color: "#64748b",
  lineHeight: "1.6",
};

const priceRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "15px 0",
};

const oldPrice = {
  color: "#94a3b8",
  textDecoration: "line-through",
};

const newPrice = {
  color: "#16a34a",
  fontWeight: "800",
  fontSize: "22px",
};

const button = {
  display: "block",
  textAlign: "center",
  background: "#16a34a",
  color: "white",
  padding: "12px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
};

export default CustomerOffers;