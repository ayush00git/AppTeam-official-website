"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const NewMemberForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    githubURL: "",
    linkedInURL: "",
    profileImageURL: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("Choose Image");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateRequiredFields = () => {
    const requiredFields = [];

    if (!formData.name.trim()) requiredFields.push("Full Name");
    if (!formData.role) requiredFields.push("Position");
    if (!formData.githubURL.trim()) requiredFields.push("GitHub Link");
    if (!formData.linkedInURL.trim()) requiredFields.push("LinkedIn Link");

    return requiredFields;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      setIsUploading(true);
      setFileName("Processing...");

      const reader = new FileReader();

      reader.onload = function (event) {
        setTimeout(() => {
          setFormData((prev) => ({
            ...prev,
            profileImageURL: file,
          }));
          setPreviewImage(event.target.result);
          setFileName(file.name);
          setIsUploading(false);
        }, 800);
      };

      reader.onerror = function () {
        setError("Error reading file");
        resetFileInput();
      };

      reader.readAsDataURL(file);
    } else {
      resetFileInput();
    }
  };

  const resetFileInput = () => {
    setFileName("Choose Image");
    setPreviewImage(null);
    setIsUploading(false);
    setFormData((prev) => ({
      ...prev,
      profileImageURL: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const missingFields = validateRequiredFields();
    if (missingFields.length > 0) {
      setError(`Required fields: ${missingFields.join(", ")}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("githubURL", formData.githubURL);
      formDataToSend.append("linkedInURL", formData.linkedInURL);
      formDataToSend.append("profileImageURL", formData.profileImageURL);

      const response = await fetch(
        `/api/member/admin_only/newMember`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setSuccess("Successfully joined the team!");
        setFormData({
          name: "",
          role: "",
          bio: "",
          githubURL: "",
          linkedInURL: "",
          profileImageURL: null,
        });
        resetFileInput();

        // Redirect to /member page after 2 seconds
        setTimeout(() => {
          router.push("/member");
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit form");
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const event = {
        target: {
          files: [file],
        },
      };
      handleFileChange(event);
    }
  };

  const isFieldMissing = (fieldName) => {
    const missingFields = validateRequiredFields();
    return missingFields.includes(fieldName);
  };

  return (
    <div className={`${spaceGrotesk.className} min-h-screen bg-[#050505] text-[#f4f4f5] flex items-center justify-center py-32 px-6 relative overflow-hidden`}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00e1ff]/[0.02] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00e1ff]/[0.01] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 md:p-12"
      >
        <h1 className="text-center text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2">
          Join the Tea<span className="text-[#00e1ff]">m</span>
        </h1>
        <p className="text-center text-gray-400 text-sm mb-8">Fill in your details to become a member</p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Full Name <span className="text-[#00e1ff]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full py-4 px-5 bg-black/40 border rounded-lg text-white text-sm outline-none focus:border-[#00e1ff] focus:bg-black/60 transition-all placeholder:text-gray-600 ${isFieldMissing("Full Name")
                ? "border-red-500/50"
                : "border-white/10"
                }`}
              required
            />
          </div>

          {/* Position */}
          <div>
            <label htmlFor="role" className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Position <span className="text-[#00e1ff]">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`w-full py-4 px-5 bg-black/40 border rounded-lg text-white text-sm outline-none focus:border-[#00e1ff] focus:bg-black/60 transition-all ${isFieldMissing("Position")
                ? "border-red-500/50"
                : "border-white/10"
                }`}
              required
            >
              <option value="" disabled>
                Select your position
              </option>
              <option value="Alumni">Alumni</option>
              <option value="Club Secretary">Club Secretary</option>
              <option value="Convener">Convener</option>
              <option value="Club Coordinator">Club Coordinator</option>
              <option value="Executive Member">Executive Member</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Bio
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="A short tagline about yourself"
              className="w-full py-4 px-5 bg-black/40 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#00e1ff] focus:bg-black/60 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* GitHub */}
          <div>
            <label htmlFor="githubURL" className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              GitHub Link <span className="text-[#00e1ff]">*</span>
            </label>
            <input
              type="url"
              id="githubURL"
              name="githubURL"
              value={formData.githubURL}
              onChange={handleInputChange}
              placeholder="https://github.com/username"
              className={`w-full py-4 px-5 bg-black/40 border rounded-lg text-white text-sm outline-none focus:border-[#00e1ff] focus:bg-black/60 transition-all placeholder:text-gray-600 ${isFieldMissing("GitHub Link")
                ? "border-red-500/50"
                : "border-white/10"
                }`}
              required
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label htmlFor="linkedInURL" className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              LinkedIn Link <span className="text-[#00e1ff]">*</span>
            </label>
            <input
              type="url"
              id="linkedInURL"
              name="linkedInURL"
              value={formData.linkedInURL}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/username"
              className={`w-full py-4 px-5 bg-black/40 border rounded-lg text-white text-sm outline-none focus:border-[#00e1ff] focus:bg-black/60 transition-all placeholder:text-gray-600 ${isFieldMissing("LinkedIn Link")
                ? "border-red-500/50"
                : "border-white/10"
                }`}
              required
            />
          </div>

          {/* Profile Image */}
          <div>
            <label htmlFor="profile-image" className="block text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Profile Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleFileChange}
                className="opacity-0 absolute -z-10"
              />
              <label
                htmlFor="profile-image"
                className={`flex items-center justify-between w-full py-4 px-5 bg-black/40 border-2 border-dashed rounded-lg text-gray-400 text-sm cursor-pointer transition-all duration-300 hover:border-[#00e1ff] hover:bg-black/60 ${isUploading
                  ? "border-[#00e1ff] bg-[#00e1ff]/10 cursor-not-allowed"
                  : "border-white/20"
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex items-center gap-3">
                  <span>{fileName}</span>
                  {isUploading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-[#00e1ff] rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-lg">📁</span>
                  )}
                </div>
              </label>
            </div>

            {/* Image Preview */}
            {previewImage && (
              <div className="mt-4 text-center">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={previewImage}
                    alt="Profile preview"
                    fill
                    className="rounded-lg border-2 border-white/20 object-cover"
                    sizes="128px"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full py-4 bg-[#00e1ff] text-black font-bold uppercase tracking-[0.3em] text-sm hover:bg-white transition-all duration-300 rounded-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Join the Team"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default NewMemberForm;