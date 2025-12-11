import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosInstance";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const tabs = [
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "messages", label: "Messages" }
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [proj, skl, exp, edu, msg] = await Promise.all([
        api.get("/projects"),
        api.get("/skills"),
        api.get("/experience"),
        api.get("/education"),
        api.get("/contact")
      ]);
      setProjects(proj.data);
      setSkills(skl.data);
      setExperiences(exp.data);
      setEducation(edu.data);
      setMessages(msg.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (type) => {
    setEditingId(null);
    setShowForm(true);
    setFormData(getEmptyForm(type));
  };

  const handleEdit = (type, item) => {
    setEditingId(item._id);
    setShowForm(true);
    setFormData(item);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/${type}/${id}`);
      fetchAllData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/${activeTab}/${editingId}`, formData);
      } else {
        await api.post(`/${activeTab}`, formData);
      }
      setShowForm(false);
      fetchAllData();
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const getEmptyForm = (type) => {
    const forms = {
      projects: {
        title: "",
        description: "",
        techStack: [],
        githubUrl: "",
        liveUrl: "",
        imageUrl: "",
        featured: false
      },
      skills: {
        name: "",
        category: "",
        proficiency: "intermediate"
      },
      experience: {
        jobTitle: "",
        company: "",
        duration: "",
        description: ""
      },
      education: {
        degree: "",
        institution: "",
        field: "",
        description: ""
      }
    };
    return forms[type] || {};
  };

  return (
    <div className="min-h-screen px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-darkText">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-lightBorder overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-secondaryText hover:text-darkText"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {!loading && activeTab !== "messages" && (
            <button
              onClick={() => handleAdd(activeTab)}
              className="mb-6 px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              + Add New
            </button>
          )}

          {/* Form */}
          {showForm && activeTab !== "messages" && (
            <motion.div
              className="mb-8 p-6 rounded-xl bg-white border-2 border-blue-200 shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold mb-4 text-darkText">
                {editingId ? "Edit" : "Add New"} {activeTab}
              </h3>
              
              <AdminForm
                type={activeTab}
                data={formData}
                onChange={setFormData}
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 rounded-lg bg-gray-300 text-darkText font-medium hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Items List */}
          <div className="space-y-4">
            {activeTab === "projects" &&
              projects.map((item) => (
                <AdminItem
                  key={item._id}
                  item={item}
                  type="projects"
                  onEdit={() => handleEdit("projects", item)}
                  onDelete={() => handleDelete("projects", item._id)}
                >
                  {item.title}
                </AdminItem>
              ))}

            {activeTab === "skills" &&
              skills.map((item) => (
                <AdminItem
                  key={item._id}
                  item={item}
                  type="skills"
                  onEdit={() => handleEdit("skills", item)}
                  onDelete={() => handleDelete("skills", item._id)}
                >
                  {item.name} - {item.category}
                </AdminItem>
              ))}

            {activeTab === "experience" &&
              experiences.map((item) => (
                <AdminItem
                  key={item._id}
                  item={item}
                  type="experience"
                  onEdit={() => handleEdit("experience", item)}
                  onDelete={() => handleDelete("experience", item._id)}
                >
                  {item.jobTitle} at {item.company}
                </AdminItem>
              ))}

            {activeTab === "education" &&
              education.map((item) => (
                <AdminItem
                  key={item._id}
                  item={item}
                  type="education"
                  onEdit={() => handleEdit("education", item)}
                  onDelete={() => handleDelete("education", item._id)}
                >
                  {item.degree} from {item.institution}
                </AdminItem>
              ))}

            {activeTab === "messages" &&
              messages.map((item) => (
                <AdminItem
                  key={item._id}
                  item={item}
                  type="messages"
                  onDelete={() => handleDelete("contact", item._id)}
                >
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-secondaryText">{item.email}</p>
                    <p className="text-sm mt-1">{item.message}</p>
                  </div>
                </AdminItem>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper Components
const AdminItem = ({ item, type, onEdit, onDelete, children }) => {
  return (
    <motion.div
      className="p-4 rounded-lg bg-white border border-lightBorder shadow-sm hover:shadow-md transition flex justify-between items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div>{children}</div>
      <div className="flex gap-2">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 transition"
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

const AdminForm = ({ type, data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const commonFields = (
    <>
      <FormField
        label="Order"
        type="number"
        value={data.order || 0}
        onChange={(val) => handleChange("order", val)}
      />
    </>
  );

  return (
    <div className="space-y-4">
      {type === "projects" && (
        <>
          <FormField
            label="Title"
            value={data.title || ""}
            onChange={(val) => handleChange("title", val)}
            required
          />
          <FormField
            label="Description"
            type="textarea"
            value={data.description || ""}
            onChange={(val) => handleChange("description", val)}
          />
          <FormField
            label="Tech Stack (comma-separated)"
            value={Array.isArray(data.techStack) ? data.techStack.join(", ") : ""}
            onChange={(val) =>
              handleChange(
                "techStack",
                val.split(",").map((t) => t.trim())
              )
            }
          />
          <FormField
            label="GitHub URL"
            value={data.githubUrl || ""}
            onChange={(val) => handleChange("githubUrl", val)}
          />
          <FormField
            label="Live URL"
            value={data.liveUrl || ""}
            onChange={(val) => handleChange("liveUrl", val)}
          />
          <FormField
            label="Image URL"
            value={data.imageUrl || ""}
            onChange={(val) => handleChange("imageUrl", val)}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={data.featured || false}
              onChange={(e) => handleChange("featured", e.target.checked)}
              className="mr-2"
            />
            <label>Featured</label>
          </div>
          {commonFields}
        </>
      )}

      {type === "skills" && (
        <>
          <FormField
            label="Name"
            value={data.name || ""}
            onChange={(val) => handleChange("name", val)}
            required
          />
          <FormField
            label="Category"
            value={data.category || ""}
            onChange={(val) => handleChange("category", val)}
          />
          <FormField
            label="Proficiency"
            type="select"
            value={data.proficiency || "intermediate"}
            onChange={(val) => handleChange("proficiency", val)}
            options={["beginner", "intermediate", "advanced", "expert"]}
          />
          {commonFields}
        </>
      )}

      {type === "experience" && (
        <>
          <FormField
            label="Job Title"
            value={data.jobTitle || ""}
            onChange={(val) => handleChange("jobTitle", val)}
            required
          />
          <FormField
            label="Company"
            value={data.company || ""}
            onChange={(val) => handleChange("company", val)}
            required
          />
          <FormField
            label="Duration"
            value={data.duration || ""}
            onChange={(val) => handleChange("duration", val)}
          />
          <FormField
            label="Description"
            type="textarea"
            value={data.description || ""}
            onChange={(val) => handleChange("description", val)}
          />
          {commonFields}
        </>
      )}

      {type === "education" && (
        <>
          <FormField
            label="Degree"
            value={data.degree || ""}
            onChange={(val) => handleChange("degree", val)}
            required
          />
          <FormField
            label="Institution"
            value={data.institution || ""}
            onChange={(val) => handleChange("institution", val)}
            required
          />
          <FormField
            label="Field"
            value={data.field || ""}
            onChange={(val) => handleChange("field", val)}
          />
          <FormField
            label="Description"
            type="textarea"
            value={data.description || ""}
            onChange={(val) => handleChange("description", val)}
          />
          {commonFields}
        </>
      )}
    </div>
  );
};

const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  options = []
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-darkText mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-lightBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-lightBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-lightBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default AdminDashboard;
