import productsImg from "../assets/image.jpg";

const CardComponent = ({ brand, model, images, stock, price }) => {
  const firstImage = Array.isArray(images) && images.length > 0 ? images[0] : productsImg;

  const handleImageError = (e) => {
    e.target.src = productsImg;
  };

  return (
    <article className="col">
      <div className="card shadow-sm">
        <img
          src={firstImage}
          className="card-img-top"
          alt={model}
          style={{ minHeight: "380px", objectFit: "contain" }}
          onError={handleImageError} // catch broken images
        />
        <div className="card-body">
          <h5 className="card-title">{brand}</h5>
          <p className="card-text">{model}</p>
          <p className="card-text">In stock: {stock}</p>
          <p className="card-text">${price}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardComponent;
