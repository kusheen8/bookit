import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddTeacher = () => {
  const [teacherImg, setTeacherImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [degree, setDegree] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!teacherImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData()

      formData.append('image', teacherImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);

      //console log formdata
      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`)
      })

      const { data } = await axios.post(
        backendUrl + '/api/admin/add-teacher',
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message)
        setTeacherImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setExperience('')
        setDegree('')
        setAbout('')
      } else {
        toast.error(data.message || 'Failed to add teacher');
      }
    } catch (error) {
      console.error('Add Teacher Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Teacher</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="teacher-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={teacherImg ? URL.createObjectURL(teacherImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e) => setTeacherImg(e.target.files[0])} type="file" id="teacher-img" hidden />
          <p>
            Upload Teacher <br /> photo
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Teacher name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Teacher Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Teacher Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
                id="teacher-experience"
              >
                <option value="">Select</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
                <option value="11 Year">11 Year</option>
                <option value="12 Year">12 Year</option>
                <option value="13 Year">13 Year</option>
                <option value="14 Year">14 Year</option>
                <option value="15 Year">15 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
                id="teacher-speciality"
              >
                <option value="">Select</option>
                <option value="MATHS">Maths</option>
                <option value="JAVA">Java</option>
                <option value="DMS">DMS</option>
                <option value="EVS">EVS</option>
                <option value="BIOLOGY">Biology</option>
                <option value="DADC">DADC</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Teacher</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about Teacher"
            rows={5}
            required
          />
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
          Add Teacher
        </button>
      </div>
    </form>
  );
};

export default AddTeacher;
