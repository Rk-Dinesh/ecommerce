import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { API } from "../../../../host";

const GroupChart1 = () => {

  const [adminCount, setAdminCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [parentCount, setParentCount] = useState(0);

  const fetchData = async () => {
    try {
      const AdminResponse = await axios.get(`${API}/getadmin1`);
      if (AdminResponse.status === 200) {
        setAdminCount(AdminResponse.data.length);
      }

      const TeacherResponse = await axios.get(`${API}/teacherget`);
      if (TeacherResponse.status === 200) {
        setTeacherCount(TeacherResponse.data.length);
      }
      const StudentResponse = await axios.get(`${API}/studentget`);
      if (StudentResponse.status === 200) {
        setStudentCount(StudentResponse.data.length);
      }
      const ParentResponse = await axios.get(`${API}/parentget`);
      if (ParentResponse.status === 200) {
        setParentCount(ParentResponse.data.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
     <div className={`py-[18px] px-4 rounded-[6px] bg-[#6AB29B] dark:bg-slate-900 `}>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex-1">
            <div className="text-slate-800 dark:text-slate-900 text-sm mb-1 font-medium">
              Total Admins
            </div>
            <div className="text-slate-900 dark:text-white text-lg font-medium">
              {adminCount} 
            </div>
          </div>
        </div>
      </div>
      <div className={`py-[18px] px-4 rounded-[6px] bg-[#6AB29B] dark:bg-slate-900 `}>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex-1">
            <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
              Total Teachers
            </div>
            <div className="text-slate-900 dark:text-white text-lg font-medium">
              {teacherCount} 
            </div>
          </div>
        </div>
      </div>
      <div className={`py-[18px] px-4 rounded-[6px] bg-[#6AB29B] dark:bg-slate-900 `}>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex-1">
            <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
              Total Students
            </div>
            <div className="text-slate-900 dark:text-white text-lg font-medium">
              {studentCount} 
            </div>
          </div>
        </div>
      </div>
      <div className={`py-[18px] px-4 rounded-[6px] bg-[#6AB29B] dark:bg-slate-900 `}>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex-1">
            <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
              Total Parents
            </div>
            <div className="text-slate-900 dark:text-white text-lg font-medium">
              {parentCount} 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChart1;