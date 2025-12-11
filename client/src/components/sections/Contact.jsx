import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axiosInstance";
import SectionTitle from "../common/SectionTitle";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.post("/contact", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="px-6 md:px-16 py-20 bg-lightBg">
      <div className="max-w-2xl mx-auto">
        <SectionTitle>Get In Touch</SectionTitle>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {success && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-green-100 text-green-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✓ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}

          {error && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-red-100 text-red-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✗ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-darkText mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-lightBorder focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-darkText mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-lightBorder focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-darkText mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-lightBorder focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="What is this about?"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-darkText mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-lightBorder focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                placeholder="Your message..."
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-lightBorder">
            <p className="text-sm text-secondaryText mb-4">
              Or reach me directly at:
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:your@email.com" className="text-blue-600 hover:underline">
                📧 muppidisrishanth123@gmail.com
              </a>
              <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                📱 +91 7801003403
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
