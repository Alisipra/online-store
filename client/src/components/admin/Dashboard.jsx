import React, { useContext,useEffect } from "react";
import appContext from "../../context/AppContext";

export default function Dashboard() {
  const { product, users, orders } = useContext(appContext);
useEffect(() => {
  console.log("our datas",orders)
  
}, [])

  function calculateRevenue() {
    if (!orders) return 0;
    return orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row g-4 mt-3">
        <SummaryCard title="Total Products" color="primary" value={product?.length || 0} />
        <SummaryCard title="Total Orders" color="success" value={orders?.length || 0} />
        <SummaryCard title="Total Users" color="warning" value={users?.length || 0} />
        <SummaryCard title="Revenue" color="danger" value={`Rs. ${calculateRevenue()}`} />
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className={`card text-white bg-${color} h-100`}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text display-6">{value}</p>
        </div>
      </div>
    </div>
  );
}
