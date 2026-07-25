// src/components/Contact/Contact.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import "./Contact.css";
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Fix: Use correct environment variable names for Vite
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID;

  // console.log({
  //   serviceId,
  //   templateId,
  //   autoReplyTemplateId,
  // });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    let error = "";

    switch (id) {
      case "name":
        error = validateName(value);
        break;

      case "email":
        error = validateEmail(value);
        break;

      case "subject":
        error = validateSubject(value);
        break;

      case "message":
        error = validateMessage(value);
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const validateName = (name) => {
    const value = name.trim();

    if (!value) return "Name is required.";

    if (value.length < 3) return "Name must be at least 3 characters.";

    if (value.length > 50) return "Name cannot exceed 50 characters.";

    // Allows:
    // John
    // John Doe
    // Mary-Jane
    // O'Connor
    // Dr. John
    if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(value))
      return "Name can only contain letters, spaces, apostrophes, hyphens and periods.";

    return "";
  };

  const validateEmail = (email) => {
    const value = email.trim();

    if (!value) return "Email is required.";

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(value)) return "Please enter a valid email address.";

    return "";
  };

  const validateSubject = (subject) => {
    const value = subject.trim();

    if (!value) return "Subject is required.";

    if (value.length < 5) return "Subject must be at least 5 characters.";

    if (value.length > 100) return "Subject cannot exceed 100 characters.";

    return "";
  };

  const validateMessage = (message) => {
    const value = message.trim();

    if (!value) return "Message is required.";

    if (value.length < 20) return "Message must be at least 20 characters.";

    if (value.length > 1000) return "Message cannot exceed 1000 characters.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      subject: validateSubject(formData.subject),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setLoading(true);

    try {
      emailjs.init(publicKey);

      const ownerMail = await emailjs.send(serviceId, templateId, {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        to_name: "Nandha Kumar",
        reply_to: formData.email.trim(),
      });

      console.log("Owner mail:", ownerMail);

      const autoMail = await emailjs.send(serviceId, autoReplyTemplateId, {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
      });

      console.log("Auto reply:", autoMail);

      toast.success("Thanks! Your message has been sent successfully.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS Error:", err);

      toast.error(
        "Something went wrong. Please try again or email me directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div className="section-label">Let's Connect</div>
        <h2 className="contact-title">Interested in working together?</h2>
        <p className="contact-sub">
          I'm currently open to React, Frontend and Full Stack opportunities.
          Whether you're hiring, collaborating, or just want to talk about a
          project, I'd love to hear from you.
        </p>

        <div className="contact-form" data-anim="up" data-delay="300">
          <div className="contact-card">
            <div className="contact-card-inner">
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? "input-error" : ""}`}
                    />
                    {errors.name && (
                      <p className="field-error">{errors.name}</p>
                    )}
                  </div>
                  <div className="form-group">
                    {" "}
                    <label className="form-label">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? "input-error" : ""}`}
                    />
                    {errors.email && (
                      <p className="field-error">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Subject <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Opportunity at Your Company"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? "input-error" : ""}`}
                  />
                  {errors.subject && (
                    <p className="field-error">{errors.subject}</p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    placeholder="Hi Nandha, I'd love to discuss an opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-input ${errors.message ? "input-error" : ""}`}
                  ></textarea>
                  {errors.message && (
                    <p className="field-error">{errors.message}</p>
                  )}
                  <div className="flex justify-end text-xs text-gray-500">
                    {formData.message.length}/1000
                  </div>
                </div>
                <button
                  type="submit"
                  className="form-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="btn-spinner">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i}></div>
                        ))}
                      </div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Let's Talk</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="contact-links" data-anim="up" data-delay="400">
          <a
            href="mailto:nandhakumarchinnasami@gmail.com"
            className="contact-link"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>
          <a
            href="https://linkedin.com/in/nandhakumar-chinnasami"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/nandhakumar-official"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          {/* Fix: Use direct path for resume (public folder) */}
          {/* <a
            href="/resume/NandhaKumar_FullStackDeveloper.docx"
            download
            className="contact-link"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
            Resume
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
