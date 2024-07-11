import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getAdminProduct()),
        dispatch(getAllOrders()),
        dispatch(getAllUsers())
      ]);
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  let outOfStock = 0;
  let totalAmount = 0;

  products?.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

  orders?.forEach((item) => {
    totalAmount += item.totalPrice;
  });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "tomato",
        borderColor: "rgb(197, 72, 49)",
        data: [0, totalAmount],
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, (products?.length || 0) - outOfStock],
      },
    ],
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products?.length || 0}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders?.length || 0}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users?.length || 0}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} options={lineOptions} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;