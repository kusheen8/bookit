import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assests';
import RelatedTeachers from '../components/RelatedTeachers';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
  const { teacherid } = useParams();
  const { teachers, backendUrl, token, getTeachersData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [teacherInfo, setTeacherInfo] = useState(null);
  const [teacherSlots, setTeacherSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // Fetch Teacher Details
  useEffect(() => {
    if (teachers && teachers.length > 0) {
      const teacher = teachers.find((t) => t._id === teacherid);
      setTeacherInfo(teacher);
    }
  }, [teachers, teacherid]);

  // Generate Available Slots
  useEffect(() => {
    if (!teacherInfo) return;

    const getAvailableSlots = () => {
      const today = new Date();
      const allSlots = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        if (i === 0) {
          const now = new Date();
          currentDate.setHours(now.getHours() >= 10 ? now.getHours() + 1 : 10);
          currentDate.setMinutes(now.getMinutes() >= 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDateKey = `${day}_${month}_${year}`;

        const timeSlots = [];

        while (currentDate < endTime) {
          const formattedTime = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          const isBooked =
            teacherInfo?.slots_booked?.[slotDateKey]?.includes(formattedTime);

          if (!isBooked) {
            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime,
            });
          }

          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        if (timeSlots.length > 0) {
          allSlots.push(timeSlots);
        }
      }

      setTeacherSlots(allSlots);
    };

    getAvailableSlots();
  }, [teacherInfo]);

  // Book Appointment Handler
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    try {
      const slotDay = teacherSlots[slotIndex]?.[0]?.datetime;

      if (!slotDay || !slotTime) {
        return toast.warn('Select a valid slot and time');
      }

      const day = slotDay.getDate();
      const month = slotDay.getMonth() + 1;
      const year = slotDay.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      console.log('Booking Slot Date:', slotDate, 'Slot Time:', slotTime);

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          teacherId: teacherid,
          slotDate,
          slotTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getTeachersData();
        navigate('/my-appointment');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (!teacherInfo) {
    return <p className="text-center text-red-600">Teacher information not found.</p>;
  }

  return (
    <div>
      {/* Teacher Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={teacherInfo.image}
            alt={teacherInfo.name}
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {teacherInfo.name}
            <img className="w-5" src={assets.verified} alt="Verified Badge" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {teacherInfo.degree} - {teacherInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {teacherInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img className="h-4" src={assets.info} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{teacherInfo.about}</p>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {teacherSlots.map((item, index) => (
            <div
              onClick={() => {
                setSlotIndex(index);
                setSlotTime(''); // reset time on day change
              }}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
              }`}
              key={index}
            >
              <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {teacherSlots[slotIndex]?.map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? 'bg-primary text-white'
                  : 'text-gray-400 border border-gray-300'
              }`}
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an Appointment
        </button>
      </div>

      {/* Related Teachers */}
      <RelatedTeachers teacherid={teacherid} speciality={teacherInfo.speciality} />
    </div>
  );
};

export default Appointment;
