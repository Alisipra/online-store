import React, { useEffect, useState } from "react";
import appContext from "./AppContext";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = ({ children }) => {
  const url = "http://localhost:2000/api";
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState({})  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);


  useEffect(() => {
    // Check for token in localStorage on app load
    const token = localStorage.getItem("admintoken");
    if (token) {
      setIsAdminAuthenticated(true);
    }
  }, []);


  // fetching all the users{customers to show on dashboard}
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${url}/user/all`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      setUsers(res.data.users); // Make sure your backend returns users
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/order/`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      
      setOrders(res.data.orders); // Make sure your backend returns users
      
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };
  
  useEffect(() => {
    if (token && isAuthenticated) {
      fetchAllUsers();
     
    }
  }, [token, isAuthenticated]);
  useEffect(()=>{
    fetchAllOrders()
  },[])
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []); // Runs only once when component mounts
  useEffect(()=>{
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: { "Content-Type": "Application/json" },
          withCredentials: true,
        });
        // console.log(api)
        setProduct(api.data.product);
        setFilterData(api.data.product);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProduct();
  },[])
  useEffect(() => {
    if (isLoading || !token) return; // ✅ Prevents running before token is set
  
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: { "Content-Type": "Application/json" },
          withCredentials: true,
        });
        // console.log(api)
        setProduct(api.data.product);
        setFilterData(api.data.product);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProduct();
    userProfile();
    userCart();
    getAddress();
  
  }, [token, reload]); // ✅ Now only runs when token is properly set
  
  

  // register user
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${url}/user/signup`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      console.error("Signup Error:", error.response?.data || error.message);
    }
  };
  

  // Logut user
  const logout = async () => {
    try {
      toast.success("Logout Successfully...!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  ///user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    setUser(api.data.user);
  };

  ///Add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  ///user Cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/getcart`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    setCart(api.data.cart);
    // setUser(api.data.user);
  };
  ////decrease qty
  const decreaseQty = async (productId, qty) => {
    try {
      const api = await axios.post(
        `${url}/cart/--decrease`, // Ensure correct API route
        { productId, qty }, // Pass required data
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true, // If using cookies/session authentication
        }
      );

      
      setReload(!reload);
    } catch (error) {
      console.error(
        "Error decreasing quantity:",
        error.response?.data || error.message
      );
    }
  };

  ////Remove product from cart
  const removeProduct = async (productId) => {
    try {
      const api = await axios.delete(
        `${url}/cart/remove/${productId}`, // Ensure correct API route
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true, // If using cookies/session authentication
        }
      );

      
      setReload(!reload);
    } catch (error) {
      console.error(
        "Error decreasing quantity:",
        error.response?.data || error.message
      );
    }
  };
  ////clear product from cart
  const clearCart = async () => {
    try {
      const api = await axios.delete(
        `${url}/cart/clearcart`, // Ensure correct API route
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true, // If using cookies/session authentication
        }
      );

      
      setReload(!reload);
    } catch (error) {
      console.error(
        "Error decreasing quantity:",
        error.response?.data || error.message
      );
    }
  };
  ///add addresss
  const addAddress = async (formData) => {
    try {
        const api = await axios.post(
            `${url}/address/add`,
            formData, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Auth: token
                },
                withCredentials: true,
            }
        );

        // Toast success message if the API response has a message
        if (api.data.message) {
            toast.success(api.data.message, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        }

        
        setReload(!reload);
        return api.data;
    } catch (error) {
        console.error("Error adding address:", error.response?.data || error.message);
        
        // Toast error message if the API response has an error
        toast.error(error.response?.data?.message || "Failed to add address!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
        });
    }
};

// ✅ Fix getAddress function
const getAddress = async () => {
  try {
    const api = await axios.get(`${url}/address/getaddress`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    if (api.data.userAddress) {
      setUserAddress(api.data.userAddress);

    
    }
  } catch (error) {
    console.error("Error fetching address:", error.response?.data || error.message);
  }
};




  

  return (
    <appContext.Provider
      value={{
        product,
        register,
        login,
        logout,
        url,
        orders,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filterData,
        setFilterData,
        userProfile,
        user,
        users,
        addToCart,
        cart,
        decreaseQty,
        removeProduct,
        clearCart,
        addAddress,
        userAddress,
        isAdminAuthenticated,
        setIsAdminAuthenticated
        
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
