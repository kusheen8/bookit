import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  // Defensive default for address
  const address = userData?.address || {};

  if (!userData) {
    return <div className="text-center mt-10 text-gray-600">Loading your profile...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name || '');
      formData.append('phone', userData.phone || '');
      formData.append('dob', userData.dob || '');
      formData.append('gender', userData.gender || '');
      formData.append("address", JSON.stringify({
        line1: address.line1,
        line2: address.line2
      }))
      if (userData.imageFile) {
        formData.append('image', userData.imageFile); // 👈 ensure this is a File object
      }

      const res = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        toast.success('Profile updated!');
        await loadUserProfileData(); // ✅ use res.data.user as returned from controller
        setIsEdit(false);
      } else {
        toast.error('Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    }
  };


  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <label htmlFor="image-upload" className="cursor-pointer">
        <img className="w-36 rounded" src={userData.image} alt="Profile" />


      </label>
      {isEdit && (
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact Info */}
      <div>
        <p className="text-natural-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-natural-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-50"
                type="text"
                placeholder="Line 1"
                value={address.line1 || ''}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...(prev.address || {}),
                      line1: e.target.value,
                    },
                  }))
                }
              />
              <input
                className="bg-gray-50"
                type="text"
                placeholder="Line 2"
                value={address.line2 || ''}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: {
                      ...(prev.address || {}),
                      line2: e.target.value,
                    },
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {address.line1 || '-'}
              <br />
              {address.line2 || ''}

            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-natural-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={handleSave}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
export default MyProfile;
