import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import appContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { token, url,setIsAdminAuthenticated } = useContext(appContext);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  let navigate=useNavigate();

  const handleSaveSettings = async () => {
    try {
      const formData = new FormData();
      if (logo) formData.append("logo", logo);

      const res = await axios.post(`${url}/admin/save-settings`, formData, {
        headers: {
          Auth: token,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Settings saved successfully!");
    } catch (err) {
      toast.error("Failed to save settings");
    }
  };
const handleLogout =async()=>{
  localStorage.removeItem("admintoken")
  setIsAdminAuthenticated(false);  
  navigate("/", { replace: true }); // Ensure it replaces current history entry
  window.location.reload();
}
  const handleChangePassword = async () => {
    try {
      const res = await axios.post(
        `${url}/admin/change-password`,
        { password: newPassword },
        {
          headers: {
            Auth: token,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Password changed!");
      setShowPasswordModal(false);
    } catch (err) {
      toast.error("Password change failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Settings</h3>
      <div className="my-3">
        <button className="btn btn-outline-primary me-2" onClick={() => setShowPasswordModal(true)}>
          Change Password
        </button>
        <button className="btn btn-outline-secondary" onClick={() => setShowLogoModal(true)}>
          Upload Logo
        </button>
      </div>

      <button className="btn btn-success m-2 mt-3" onClick={handleSaveSettings}>
        Save Settings
      </button>

      <button className="btn btn-danger m-2 mt-3" onClick={handleLogout}>
        Logout
      </button>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowPasswordModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleChangePassword}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logo Upload Modal */}
      {showLogoModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Logo</h5>
                <button type="button" className="btn-close" onClick={() => setShowLogoModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setLogo(file);
                    setLogoPreview(URL.createObjectURL(file));
                  }}
                />
                {logoPreview && <img src={logoPreview} alt="Preview" className="mt-3" width={100} />}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowLogoModal(false)}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
