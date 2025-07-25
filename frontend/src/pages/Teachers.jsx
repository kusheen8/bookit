import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Teachers = () => {
  const { speciality } = useParams();
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { teachers } = useContext(AppContext);

  // Filter logic
  const applyFilter = () => {
    if (speciality) {
      setFilteredTeachers(
        teachers.filter(
          (teacher) =>
            teacher.speciality?.toLowerCase().trim() === speciality.toLowerCase().trim()
        )
      );
    } else {
      setFilteredTeachers(teachers);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [teachers, speciality]);

  const specialities = ['maths', 'java', 'dms', 'evs', 'biology', 'dadc'];

  return (
    <div className="px-4">
      <p className="text-gray-600 text-sm mt-2">
        Browse through our specialized teachers.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filter toggle (mobile) */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Filter list */}
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          {specialities.map((sp) => (
            <p
              key={sp}
              onClick={() =>
                speciality?.toLowerCase() === sp
                  ? navigate('/teachers')
                  : navigate(`/teachers/${sp}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality?.toLowerCase() === sp
                  ? 'bg-yellow-100 text-black'
                  : ''
              }`}
            >
              {sp.toUpperCase()}
            </p>
          ))}
        </div>

        {/* Teachers Grid */}
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
          {filteredTeachers.length === 0 ? (
            <p className="text-gray-500 col-span-full">
              No teachers found for "{speciality}"
            </p>
          ) : (
            filteredTeachers.map((teacher) => (
              <div
                key={teacher._id}
                onClick={() =>
                  navigate(
                    speciality
                      ? `/teachers/${speciality.toLowerCase()}/appointment/${teacher._id}`
                      : `/appointment/${teacher._id}`
                  )
                }
                className="border border-orange-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
              >
                <img
                  className="bg-orange-50 w-full h-72 object-cover" // Large image
                  src={teacher.image}
                  alt={teacher.name}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{teacher.name}</p>
                  <p className="text-gray-600 text-sm">{teacher.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
