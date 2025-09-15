import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Your name is required.";
    if (!formData.phone.trim())
      newErrors.phone = "A valid phone number is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // ---- WhatsApp Prefilled Message Logic ----
      const message = `Hello! New contact inquiry:\n\nName: ${
        formData.name
      }\nPhone: ${formData.phone}\nEmail: ${
        formData.email || "N/A"
      }\nMessage: ${formData.message || "N/A"}`;
      const whatsappUrl = `https://wa.me/919354009052?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");

      // ---- Optional: also send to backend if you want ----
      await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setErrors({});
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    }
  };

  return (
    <section
      id="contact"
      className="py-10 lg:py-16"
      style={{
        background: "linear-gradient(90deg, #f0f4f8 0%, #ffffff 100%)",
      }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
            Get in Touch
          </h2>
          <p className="text-md text-gray-600 max-w-xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6 border border-gray-100"
        >
          {/* Name and Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., (123) 456-7890"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="What can we help you with?"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center w-full px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-semibold text-md hover:bg-[#1DA851] transition transform hover:scale-105 shadow-md"
          >
            Send via WhatsApp
          </button>

          {submitted && (
            <div className="flex items-center justify-center p-3 rounded-lg bg-green-50 text-green-700 mt-4 shadow-sm text-sm">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="#25D366" // WhatsApp green
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">
                Thank you! Your message has been sent via WhatsApp.
              </span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
