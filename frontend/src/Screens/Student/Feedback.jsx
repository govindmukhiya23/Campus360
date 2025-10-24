import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";
import { FiStar, FiMessageSquare } from "react-icons/fi";
import axios from "../../utils/AxiosWrapper";

const Feedback = () => {
  const [myFeedback, setMyFeedback] = useState([]);
  const [availableForms, setAvailableForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [feedbackData, setFeedbackData] = useState({
    teachingQuality: 0,
    knowledgeOfSubject: 0,
    communication: 0,
    punctuality: 0,
    overallRating: 0,
    strengths: "",
    improvements: "",
    additionalComments: "",
    isAnonymous: false,
  });

  useEffect(() => {
    getUserDetails();
    getMyFeedback();
    getAvailableForms();
  }, []);

  const getUserDetails = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    axios
      .get(`${baseApiURL()}/student/my-details`, { headers })
      .then((response) => {
        if (response.data.success) {
          const userData = response.data.data;
          setBranch(typeof userData.branchId === 'object' ? userData.branchId._id : userData.branchId);
          setSemester(userData.semester);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMyFeedback = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    axios
      .get(`${baseApiURL()}/feedback/my-feedback`, { headers })
      .then((response) => {
        if (response.data.success) {
          setMyFeedback(response.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAvailableForms = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    axios
      .get(`${baseApiURL()}/feedback-form/available`, { headers })
      .then((response) => {
        if (response.data.success) {
          setAvailableForms(response.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRatingChange = (field, value) => {
    setFeedbackData({ ...feedbackData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !feedbackData.teachingQuality ||
      !feedbackData.knowledgeOfSubject ||
      !feedbackData.communication ||
      !feedbackData.punctuality ||
      !feedbackData.overallRating
    ) {
      toast.error("Please fill all rating fields");
      return;
    }

    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };

    const data = {
      ...feedbackData,
      feedbackFormId: selectedForm?._id,
      facultyId: selectedForm?.facultyId?._id,
      subjectId: selectedForm?.subjectId?._id,
      branchId: branch,
      semester: parseInt(semester),
    };

    axios
      .post(`${baseApiURL()}/feedback/submit`, data, { headers })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setShowForm(false);
          setSelectedForm(null);
          setFeedbackData({
            teachingQuality: 0,
            knowledgeOfSubject: 0,
            communication: 0,
            punctuality: 0,
            overallRating: 0,
            strengths: "",
            improvements: "",
            additionalComments: "",
            isAnonymous: false,
          });
          getMyFeedback();
          getAvailableForms();
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to submit feedback");
        setLoading(false);
      });
  };

  const StarRating = ({ value, onChange, label }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className={`text-3xl ${
                star <= value ? "text-yellow-500" : "text-gray-300"
              } hover:text-yellow-400 transition-colors`}
            >
              <FiStar fill={star <= value ? "currentColor" : "none"} />
            </button>
          ))}
          <span className="ml-2 text-gray-600">{value}/5</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full mb-6">
        <Heading title="Faculty Feedback" />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          {showForm ? "View My Feedback" : "Available Forms"}
        </button>
      </div>

      {!showForm ? (
        /* Available Feedback Forms */
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableForms.length === 0 ? (
            <div className="col-span-2 bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">No feedback forms available at the moment</p>
            </div>
          ) : (
            availableForms.map((form) => (
              <div
                key={form._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {form.title}
                </h3>
                {form.description && (
                  <p className="text-sm text-gray-600 mb-4">{form.description}</p>
                )}
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <p>
                    <span className="font-medium">Faculty:</span> {form.facultyId.firstName}{" "}
                    {form.facultyId.lastName}
                  </p>
                  <p>
                    <span className="font-medium">Subject:</span> {form.subjectId.name} (
                    {form.subjectId.code})
                  </p>
                  <p>
                    <span className="font-medium">Deadline:</span>{" "}
                    {new Date(form.endDate).toLocaleDateString()}
                  </p>
                </div>
                {form.hasSubmitted ? (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center font-medium">
                    ✓ Submitted
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedForm(form);
                      setShowForm(true);
                    }}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Fill Feedback
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      ) : selectedForm ? (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{selectedForm.title}</h2>
            <p className="text-gray-600 mt-2">
              Faculty: {selectedForm.facultyId.firstName} {selectedForm.facultyId.lastName} |
              Subject: {selectedForm.subjectId.name}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Fields */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Rate the Faculty</h3>
              <StarRating
                label="Teaching Quality"
                value={feedbackData.teachingQuality}
                onChange={(val) => handleRatingChange("teachingQuality", val)}
              />
              <StarRating
                label="Knowledge of Subject"
                value={feedbackData.knowledgeOfSubject}
                onChange={(val) => handleRatingChange("knowledgeOfSubject", val)}
              />
              <StarRating
                label="Communication Skills"
                value={feedbackData.communication}
                onChange={(val) => handleRatingChange("communication", val)}
              />
              <StarRating
                label="Punctuality"
                value={feedbackData.punctuality}
                onChange={(val) => handleRatingChange("punctuality", val)}
              />
              <StarRating
                label="Overall Rating"
                value={feedbackData.overallRating}
                onChange={(val) => handleRatingChange("overallRating", val)}
              />
            </div>

            {/* Text Feedback */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Additional Feedback</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Strengths
                </label>
                <textarea
                  value={feedbackData.strengths}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, strengths: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  placeholder="What did you like about the faculty's teaching?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas for Improvement
                </label>
                <textarea
                  value={feedbackData.improvements}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, improvements: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  placeholder="What could be improved?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  value={feedbackData.additionalComments}
                  onChange={(e) =>
                    setFeedbackData({
                      ...feedbackData,
                      additionalComments: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  placeholder="Any other comments?"
                />
              </div>
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={feedbackData.isAnonymous}
                onChange={(e) =>
                  setFeedbackData({ ...feedbackData, isAnonymous: e.target.checked })
                }
                className="mr-2"
              />
              <label className="text-sm text-gray-700">Submit as Anonymous</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-semibold"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">My Submitted Feedback</h2>
          {myFeedback.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <FiMessageSquare className="mx-auto text-5xl mb-4" />
              <p>No feedback submitted yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myFeedback.map((feedback, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {feedback.facultyId?.firstName} {feedback.facultyId?.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {feedback.subjectId?.name}
                  </p>
                  <p className="text-sm font-semibold">
                    Overall Rating: {feedback.overallRating}/5 ⭐
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Submitted: {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feedback;
