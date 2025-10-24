import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";
import { FiCalendar, FiCheckCircle, FiXCircle } from "react-icons/fi";
import axios from "../../utils/AxiosWrapper";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [subjectWiseStats, setSubjectWiseStats] = useState([]);
  const [overallStats, setOverallStats] = useState({});
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttendanceHandler();
  }, [selectedSubject]);

  const getAttendanceHandler = () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    let url = `${baseApiURL()}/attendance/my-attendance`;
    if (selectedSubject) {
      url += `?subjectId=${selectedSubject}`;
    }

    axios
      .get(url, { headers })
      .then((response) => {
        if (response.data.success) {
          setAttendance(response.data.data.attendance);
          setSubjectWiseStats(response.data.data.subjectWiseStats || []);
          setOverallStats(response.data.data.overallStatistics || {});
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch attendance");
        setLoading(false);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title="My Attendance" />

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Overall Statistics */}
          <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Overall Attendance</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Total Classes</p>
                <p className="text-2xl font-bold">{overallStats.total || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Present</p>
                <p className="text-2xl font-bold text-green-600">
                  {overallStats.present || 0}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Absent</p>
                <p className="text-2xl font-bold text-red-600">
                  {overallStats.absent || 0}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Late</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {overallStats.late || 0}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Percentage</p>
                <p
                  className={`text-2xl font-bold ${getPercentageColor(
                    parseFloat(overallStats.percentage || 0)
                  )}`}
                >
                  {overallStats.percentage || 0}%
                </p>
              </div>
            </div>
          </div>

          {/* Subject-wise Statistics */}
          {subjectWiseStats.length > 0 && (
            <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Subject-wise Attendance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectWiseStats.map((subject, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {subject.subjectName}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        Total: <span className="font-medium">{subject.total}</span>
                      </p>
                      <p>
                        Present:{" "}
                        <span className="font-medium text-green-600">
                          {subject.present}
                        </span>
                      </p>
                      <p>
                        Absent:{" "}
                        <span className="font-medium text-red-600">
                          {subject.absent}
                        </span>
                      </p>
                      <p
                        className={`font-bold ${getPercentageColor(
                          parseFloat(subject.percentage)
                        )}`}
                      >
                        {subject.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendance Records */}
          <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>

            {attendance.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <FiCalendar className="mx-auto text-5xl mb-4" />
                <p>No attendance records found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Faculty
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendance.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          {new Date(record.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {record.subjectId?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {record.facultyId
                            ? `${record.facultyId.firstName} ${record.facultyId.lastName}`
                            : "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              record.status
                            )}`}
                          >
                            {record.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {record.remarks || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Attendance;
