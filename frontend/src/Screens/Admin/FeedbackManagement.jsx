import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";
import { FiStar, FiBarChart2, FiUsers, FiFilter } from "react-icons/fi";
import axios from "../../utils/AxiosWrapper";

const FeedbackManagement = () => {
  const [allFeedback, setAllFeedback] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [facultySummary, setFacultySummary] = useState(null);

  useEffect(() => {
    getFacultyHandler();
    getBranchHandler();
    getSubjectHandler();
    getAllFeedbackHandler();
  }, []);

  const getFacultyHandler = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    axios
      .get(`${baseApiURL()}/faculty`, { headers })
      .then((response) => {
        if (response.data.success) {
          setFaculties(response.data.data || []);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        console.error(error);
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
        console.error(error);
      });
  };

  const getAllFeedbackHandler = () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    let url = `${baseApiURL()}/feedback/all?`;
    if (selectedFaculty) url += `facultyId=${selectedFaculty}&`;
    if (selectedBranch) url += `branchId=${selectedBranch}&`;
    if (selectedSubject) url += `subjectId=${selectedSubject}&`;
    if (selectedSemester) url += `semester=${selectedSemester}`;

    axios
      .get(url, { headers })
      .then((response) => {
        if (response.data.success) {
          setAllFeedback(response.data.data);
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch feedback");
        setLoading(false);
      });
  };

  const getFacultySummary = (facultyId) => {
    if (!facultyId) {
      toast.error("Please select a faculty");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    let url = `${baseApiURL()}/feedback/summary/${facultyId}`;
    if (selectedSemester) url += `?semester=${selectedSemester}`;

    axios
      .get(url, { headers })
      .then((response) => {
        if (response.data.success) {
          setFacultySummary(response.data.data);
          setShowSummary(true);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch faculty summary");
      });
  };

  const applyFilters = () => {
    getAllFeedbackHandler();
  };

  const clearFilters = () => {
    setSelectedFaculty("");
    setSelectedBranch("");
    setSelectedSubject("");
    setSelectedSemester("");
    setShowSummary(false);
    setFacultySummary(null);
  };

  const getStarRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`${
              i < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            fill={i < rating ? "currentColor" : "none"}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full mb-6">
        <div>
          <Heading title="Feedback Management" />
          <p className="text-gray-600 text-sm mt-2">
            View and analyze student feedback for faculty performance. Faculty cannot view their own feedback.
          </p>
        </div>
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FiBarChart2 className="mr-2" />
          {showSummary ? "View All Feedback" : "View Summary"}
        </button>
      </div>

      {/* Filters */}
      <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <FiFilter className="mr-2" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Faculty
            </label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">All Faculties</option>
              {faculties.map((faculty) => (
                <option key={faculty._id} value={faculty._id}>
                  {faculty.firstName} {faculty.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Clear Filters
          </button>
          {selectedFaculty && (
            <button
              onClick={() => getFacultySummary(selectedFaculty)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
            >
              <FiBarChart2 className="mr-2" />
              View Faculty Summary
            </button>
          )}
        </div>
      </div>

      {/* Faculty Summary */}
      {showSummary && facultySummary && (
        <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Faculty Performance Summary</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FiUsers className="mx-auto text-3xl text-blue-600 mb-2" />
              <p className="text-gray-600 text-sm">Total Feedback</p>
              <p className="text-3xl font-bold text-blue-600">
                {facultySummary.totalFeedback}
              </p>
            </div>
          </div>

          {facultySummary.averageRatings && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Average Ratings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Teaching Quality</p>
                  {getStarRating(
                    Math.round(facultySummary.averageRatings.teachingQuality)
                  )}
                  <p className="text-2xl font-bold mt-2">
                    {facultySummary.averageRatings.teachingQuality}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Knowledge of Subject</p>
                  {getStarRating(
                    Math.round(facultySummary.averageRatings.knowledgeOfSubject)
                  )}
                  <p className="text-2xl font-bold mt-2">
                    {facultySummary.averageRatings.knowledgeOfSubject}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Communication</p>
                  {getStarRating(
                    Math.round(facultySummary.averageRatings.communication)
                  )}
                  <p className="text-2xl font-bold mt-2">
                    {facultySummary.averageRatings.communication}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Punctuality</p>
                  {getStarRating(
                    Math.round(facultySummary.averageRatings.punctuality)
                  )}
                  <p className="text-2xl font-bold mt-2">
                    {facultySummary.averageRatings.punctuality}
                  </p>
                </div>
                <div className="border rounded-lg p-4 bg-yellow-50">
                  <p className="text-sm text-gray-600 mb-2">Overall Rating</p>
                  {getStarRating(
                    Math.round(facultySummary.averageRatings.overallRating)
                  )}
                  <p className="text-2xl font-bold mt-2 text-yellow-600">
                    {facultySummary.averageRatings.overallRating}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* All Feedback List */}
      {!showSummary && (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            All Feedback ({allFeedback.length})
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : allFeedback.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No feedback found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Faculty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Overall Rating
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Semester
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Anonymous
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allFeedback.map((feedback, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        {feedback.isAnonymous
                          ? "Anonymous"
                          : `${feedback.studentId?.firstName || ""} ${
                              feedback.studentId?.lastName || ""
                            }`}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {feedback.facultyId?.firstName}{" "}
                        {feedback.facultyId?.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {feedback.subjectId?.name}
                      </td>
                      <td className="px-4 py-3">
                        {getStarRating(feedback.overallRating)}
                      </td>
                      <td className="px-4 py-3 text-sm">{feedback.semester}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {feedback.isAnonymous ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;
