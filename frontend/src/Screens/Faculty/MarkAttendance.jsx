import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";
import { FiCheck, FiX, FiClock, FiSave } from "react-icons/fi";
import axios from "../../utils/AxiosWrapper";

const MarkAttendance = () => {
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getBranchHandler();
    getSubjectHandler();
  }, []);

  useEffect(() => {
    if (selectedBranch && selectedSemester) {
      getStudentsHandler();
    }
  }, [selectedBranch, selectedSemester]);

  const getBranchHandler = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    axios
      .get(`${baseApiURL()}/branch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranches(response.data.data || []);
        }
      })
      .catch((error) => {
        console.error("Branch error:", error.response?.data || error);
        toast.error(error.response?.data?.message || "Failed to fetch branches");
      });
  };

  const getSubjectHandler = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    axios
      .get(`${baseApiURL()}/subject`, { headers })
      .then((response) => {
        if (response.data.success) {
          setSubjects(response.data.data || []);
        }
      })
      .catch((error) => {
        console.error("Subject error:", error.response?.data || error);
        toast.error(error.response?.data?.message || "Failed to fetch subjects");
      });
  };

  const getStudentsHandler = () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    axios
      .get(
        `${baseApiURL()}/student?branchId=${selectedBranch}&semester=${selectedSemester}`,
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          const studentList = response.data.data || [];
          // Initialize attendance data
          const initialAttendance = studentList.map((student) => ({
            studentId: student._id,
            studentName: `${student.firstName} ${student.middleName || ""} ${
              student.lastName
            }`,
            enrollmentNo: student.enrollmentNo,
            status: "present",
            remarks: "",
          }));
          setStudents(studentList);
          setAttendanceData(initialAttendance);
        } else {
          toast.error(response.data.message || "No students found");
          setStudents([]);
          setAttendanceData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch students");
        setLoading(false);
      });
  };

  const updateAttendanceStatus = (index, status) => {
    const updated = [...attendanceData];
    updated[index].status = status;
    setAttendanceData(updated);
  };

  const updateRemarks = (index, remarks) => {
    const updated = [...attendanceData];
    updated[index].remarks = remarks;
    setAttendanceData(updated);
  };

  const markAllPresent = () => {
    const updated = attendanceData.map((item) => ({
      ...item,
      status: "present",
    }));
    setAttendanceData(updated);
    toast.success("Marked all students as present");
  };

  const handleSubmit = () => {
    if (!selectedBranch || !selectedSubject || !selectedSemester || !selectedDate) {
      toast.error("Please fill all required fields");
      return;
    }

    if (attendanceData.length === 0) {
      toast.error("No students to mark attendance");
      return;
    }

    setSaving(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    const formattedData = attendanceData.map((item) => ({
      studentId: item.studentId,
      subjectId: selectedSubject,
      branchId: selectedBranch,
      semester: parseInt(selectedSemester),
      date: selectedDate,
      status: item.status,
      remarks: item.remarks,
    }));

    axios
      .post(
        `${baseApiURL()}/attendance/mark`,
        { attendanceData: formattedData },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          // Reset form
          setAttendanceData([]);
          setStudents([]);
          setSelectedBranch("");
          setSelectedSubject("");
          setSelectedSemester("");
        } else {
          toast.error(response.data.message);
        }
        setSaving(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to mark attendance");
        setSaving(false);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-500 hover:bg-green-600";
      case "absent":
        return "bg-red-500 hover:bg-red-600";
      case "late":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "excused":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <FiCheck className="inline" />;
      case "absent":
        return <FiX className="inline" />;
      case "late":
        return <FiClock className="inline" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title="Mark Attendance" />

      {/* Selection Form */}
      <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {students.length > 0 && (
          <button
            onClick={markAllPresent}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            <FiCheck className="inline mr-2" />
            Mark All Present
          </button>
        )}
      </div>

      {/* Students List */}
      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : students.length > 0 ? (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Students ({students.length})
            </h2>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center"
            >
              <FiSave className="mr-2" />
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Enrollment No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student Name
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
                {attendanceData.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {student.enrollmentNo}
                    </td>
                    <td className="px-4 py-3 text-sm">{student.studentName}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateAttendanceStatus(index, "present")}
                          className={`px-3 py-1 rounded text-white text-xs ${
                            student.status === "present"
                              ? getStatusColor("present")
                              : "bg-gray-300"
                          }`}
                        >
                          <FiCheck className="inline" /> Present
                        </button>
                        <button
                          onClick={() => updateAttendanceStatus(index, "absent")}
                          className={`px-3 py-1 rounded text-white text-xs ${
                            student.status === "absent"
                              ? getStatusColor("absent")
                              : "bg-gray-300"
                          }`}
                        >
                          <FiX className="inline" /> Absent
                        </button>
                        <button
                          onClick={() => updateAttendanceStatus(index, "late")}
                          className={`px-3 py-1 rounded text-white text-xs ${
                            student.status === "late"
                              ? getStatusColor("late")
                              : "bg-gray-300"
                          }`}
                        >
                          <FiClock className="inline" /> Late
                        </button>
                        <button
                          onClick={() => updateAttendanceStatus(index, "excused")}
                          className={`px-3 py-1 rounded text-white text-xs ${
                            student.status === "excused"
                              ? getStatusColor("excused")
                              : "bg-gray-300"
                          }`}
                        >
                          Excused
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={student.remarks}
                        onChange={(e) => updateRemarks(index, e.target.value)}
                        placeholder="Add remarks..."
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        selectedBranch &&
        selectedSemester && (
          <div className="w-full bg-white rounded-lg shadow-md p-10 text-center text-gray-500">
            <p>No students found for the selected criteria</p>
          </div>
        )
      )}
    </div>
  );
};

export default MarkAttendance;
