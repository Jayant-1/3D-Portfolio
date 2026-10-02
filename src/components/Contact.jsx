import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

import { SectionWrapper } from "../hoc";
import useMagnetic from "../reactbits/hooks/useMagnetic";
import useSoundCue from "../reactbits/hooks/useSoundCue";
import { styles } from "../styles";
import { slideIn, textVariant } from "../utils/motion";
import { EarthCanvas } from "./canvas";
import Toast from "./ui/toast";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const { play } = useSoundCue("notification");
  const { ref: submitButtonRef, style: magneticStyle } = useMagnetic({
    radius: 90,
    strength: 0.35,
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      play("notification");
      setToast({
        open: true,
        message: "Please fill in all fields before submitting.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Graceful fallback to mailto draft if EmailJS env is not supplied
      setLoading(false);
      window.location.href = `mailto:jayantpotdar2006@gmail.com?subject=Contact%20from%20${encodeURIComponent(
        form.name
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;
      setToast({
        open: true,
        message: "Email client opened with your prepared message.",
        type: "success",
      });
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          user_name: form.name,
          my_name: "Jayant Potdar",
          user_email: form.email,
          my_email: "jayantpotdar2006@gmail.com",
          user_message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          play("success");
          setToast({
            open: true,
            message: "Thank you! I will get back to you as soon as possible.",
            type: "success",
          });
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Error:", error);
          play("error");
          // Fallback to mailto so the message is never lost
          window.location.href = `mailto:jayantpotdar2006@gmail.com?subject=Contact%20from%20${encodeURIComponent(
            form.name
          )}&body=${encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
          )}`;
          setToast({
            open: true,
            message: "Direct message window opened via your email client.",
            type: "success",
          });
        }
      );
  };

  return (
    <>
      {toast.open && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}

      <div>
        <motion.div variants={textVariant()} className="mb-4">
          <p className={styles.sectionSubText}>Get in touch</p>
          <h2 className={styles.sectionHeadText}>Let's Work Together.</h2>
        </motion.div>

        <div className="mt-8 xl:mt-12 flex xl:flex-row flex-col-reverse gap-8 lg:gap-12 overflow-hidden text-white items-center">
          {/* Contact Form Card */}
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-1 w-full xl:max-w-[42rem] bg-[#111522]/95 border border-white/10 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl backdrop-blur-md"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Contact Me
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#8ec5ff]/90 leading-relaxed">
              Have a project in mind, an internship opportunity, or a technical inquiry? Send a note below or reach out directly.
            </p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-5 sm:gap-6"
              id="contact-form"
            >
              <label className="flex flex-col">
                <span className="font-semibold text-sm text-[#8ec5ff] mb-2">
                  Full Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="bg-[#07080d] py-3.5 px-4 sm:px-5 placeholder:text-[#fafafa60] rounded-xl outline-none border border-white/10 font-medium text-sm sm:text-base w-full focus:border-[#8ec5ff] focus:ring-1 focus:ring-[#8ec5ff] transition-all"
                />
              </label>

              <label className="flex flex-col">
                <span className="font-semibold text-sm text-[#8ec5ff] mb-2">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="bg-[#07080d] py-3.5 px-4 sm:px-5 placeholder:text-[#fafafa60] rounded-xl outline-none border border-white/10 font-medium text-sm sm:text-base w-full focus:border-[#8ec5ff] focus:ring-1 focus:ring-[#8ec5ff] transition-all"
                />
              </label>

              <label className="flex flex-col">
                <span className="font-semibold text-sm text-[#8ec5ff] mb-2">
                  Your Message
                </span>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className="bg-[#07080d] py-3.5 px-4 sm:px-5 placeholder:text-[#fafafa60] rounded-xl outline-none border border-white/10 font-medium text-sm sm:text-base w-full resize-none focus:border-[#8ec5ff] focus:ring-1 focus:ring-[#8ec5ff] transition-all"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={loading}
                  style={magneticStyle}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 py-3.5 px-8 rounded-xl outline-none text-white font-bold shadow-lg shadow-blue-500/20 text-sm sm:text-base transition-all duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <span className="text-xs text-secondary">
                  Response within 24 hours
                </span>
              </div>
            </form>

            {/* Direct Contact Details Divider */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-secondary">
              <div className="flex flex-col gap-1.5">
                <a
                  href="mailto:jayantpotdar2006@gmail.com"
                  className="flex items-center gap-2 hover:text-[#8ec5ff] transition-colors"
                >
                  <FaEnvelope className="text-[#8ec5ff]" />
                  <span>jayantpotdar2006@gmail.com</span>
                </a>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#8ec5ff]" />
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Jayant-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jayant-potdar-161614275/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#0962bd] transition-colors"
                >
                  <FaLinkedin size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* 3D Earth Canvas */}
          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="flex-1 w-full h-[380px] sm:h-[450px] md:h-[520px] xl:h-[600px] flex items-center justify-center"
          >
            <EarthCanvas />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
