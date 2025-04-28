import productsImg from "../assets/image.jpg"

const CardComponent = ({ brand, model, images, stock, price }) => {
    return (
      <article className="col">
        <div className="card shadow-sm">
          <img 
            src={images || productsImg}
            className="card-img-top"
            alt={model}
            style={{ minHeight: "380px", objectFit: "contain"}}
          />
          <div className="card-body">
            <h5 className="card-title">{brand}</h5>
            <p className="card-text">{model}</p>
            <p className="card-text">{images}</p>
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