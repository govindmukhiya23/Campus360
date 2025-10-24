import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";
import { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import axios from "../../utils/AxiosWrapper";

const FeedbackFormManagement = () => {
  const [forms, setForms] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    facultyId: "",
    subjectId: "",
    branchId: "",
    semester: "",
    startDate: "",
    endDate: "",
    allowAnonymous: true,
  });

  useEffect(() => {
    getFacultyHandler();
    getBranchHandler();
    getSubjectHandler();
    getAllFormsHandler();
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

  const getAllFormsHandler = () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    axios
      .get(`${baseApiURL()}/feedback-form/all`, { headers })
      .then((response) => {
        if (response.data.success) {
          setForms(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch feedback forms");
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.facultyId || !formData.subjectId || 
        !formData.branchId || !formData.semester || !formData.startDate || !formData.endDate) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    axios
      .post(`${baseApiURL()}/feedback-form/create`, formData, { headers })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setShowCreateForm(false);
          setFormData({
            title: "",
            description: "",
            facultyId: "",
            subjectId: "",
            branchId: "",
            semester: "",
            startDate: "",
            endDate: "",
            allowAnonymous: true,
          });
          getAllFormsHandler();
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to create feedback form");
        setLoading(false);
      });
  };

  const toggleFormStatus = (formId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    axios
      .patch(`${baseApiURL()}/feedback-form/${formId}/toggle`, {}, { headers })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          getAllFormsHandler();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update form status");
      });
  };

  const deleteForm = (formId) => {
    if (!window.confirm("Are you sure you want to delete this feedback form?")) {
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    axios
      .delete(`${baseApiURL()}/feedback-form/${formId}`, { headers })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          getAllFormsHandler();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete form");
      });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full mb-6">
        <div>
          <Heading title="Feedback Form Management" />
          <p className="text-gray-600 text-sm mt-2">
            Create and manage feedback forms for students to fill out
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <FiPlus /> Create New Form
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="w-full bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Create Feedback Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="e.g., Mid-Semester Faculty Feedback"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Optional description"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch *
                </label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
                  Semester *
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
                  Subject *
                </label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faculty *
              </label>
              <select
                value={formData.facultyId}
                onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Select Faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.firstName} {faculty.lastName} ({faculty.employeeId})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.allowAnonymous}
                onChange={(e) => setFormData({ ...formData, allowAnonymous: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-sm text-gray-700">Allow Anonymous Feedback</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                {loading ? "Creating..." : "Create Form"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Forms List */}
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Faculty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Branch / Sem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : forms.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No feedback forms created yet
                  </td>
                </tr>
              ) : (
                forms.map((form) => (
                  <tr key={form._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{form.title}</div>
                      {form.description && (
                        <div className="text-sm text-gray-500">{form.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {form.facultyId?.firstName} {form.facultyId?.lastName}
                      <div className="text-xs text-gray-500">{form.facultyId?.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {form.subjectId?.name}
                      <div className="text-xs text-gray-500">{form.subjectId?.code}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {form.branchId?.name}
                      <div className="text-xs text-gray-500">Semester {form.semester}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(form.startDate)} - {formatDate(form.endDate)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          form.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {form.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium flex gap-2">
                      <button
                        onClick={() => toggleFormStatus(form._id)}
                        className="text-blue-600 hover:text-blue-900"
                        title={form.isActive ? "Deactivate" : "Activate"}
                      >
                        {form.isActive ? <FiToggleRight size={20} /> : <FiToggleLeft size={20} />}
                      </button>
                      <button
                        onClick={() => deleteForm(form._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFormManagement;
