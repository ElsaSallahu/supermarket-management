function CustomerOffers() {
  const offers = [
    {
      id: 1,
      product: "Coca Cola",
      discount: "20%",
      description: "Limited time offer"
    },
    {
      id: 2,
      product: "Banania",
      discount: "15%",
      description: "Fresh fruits discount"
    },
    {
      id: 3,
      product: "Molla",
      discount: "10%",
      description: "Seasonal promotion"
    }
  ];

  return (
    <div style={{
      padding: "40px",
      background: "#f8fafc",
      minHeight: "100vh"
    }}>
      <h1 style={{
        fontSize: "32px",
        color: "#0f172a",
        marginBottom: "8px"
      }}>
        Special Offers
      </h1>

      <p style={{
        color: "#64748b",
        marginBottom: "30px"
      }}>
        Discover the latest supermarket promotions.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "22px"
        }}
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(15,23,42,0.08)"
            }}
          
          >
           
            <div
              style={{
                background: "#dcfce7",
                color: "#16a34a",
                padding: "8px 14px",
                borderRadius: "12px",
                display: "inline-block",
                fontWeight: "bold",
                marginBottom: "15px"
              }}
            >
             
              -{offer.discount}
            </div>

            <h3>{offer.product}</h3>

            <p style={{ color: "#64748b" }}>
              {offer.description}
            </p>
            <button
  style={{
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  View Products
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerOffers;