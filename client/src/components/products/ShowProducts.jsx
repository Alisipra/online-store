import React, { useContext } from "react";
import appContext from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function ShowProducts() {
  const { addToCart,filterData } = useContext(appContext);
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center">
    <div className="row container d-flex justify-content-center align-items-center">
      {filterData?.map((item) => {
        return (
          <div key={item._id} className="my-3 col-md-4 d-flex justify-content-center align-items-center">
            <div className="card text-center shadow-lg rounded-4" style={{ width: "20rem" }}>
              <Link to={`/product/${item._id}`} className="d-flex justify-content-center align-items-center p-3">
              <img src={item.imgSrc} className="card-img-top" alt="..." style={{width:"230px",height:"230px",borderRadius:"20px"}} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <div className="btn ">
                <button href="#" className="btn btn-warning mx-2">
                  {item.price}/Rs
                </button>
                <button href="#" className="btn btn-primary" onClick={()=>addToCart(item._id, item.title, item.price, 1, item.imgSrc)}>
                  Add Cart
                </button>
                </div>
                
              </div>
            </div>
          </div>
        );
      })}
      </div>
      </div>
    </>
  );
}
