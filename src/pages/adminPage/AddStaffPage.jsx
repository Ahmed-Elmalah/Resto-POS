import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdPersonAdd,
  MdEmail,
  MdLock,
  MdPhone,
  MdPerson,
} from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "../../customHook/useLogin";
import toast from "react-hot-toast";

export default function AddStaffPage() {
  const navigate = useNavigate();
  const { createStaffAccount } = useLogin();

  const roles = [
    { id: 1, name: "User" },
    { id: 4, name: "Casher" },
    { id: 3, name: "Admin" },
  ];

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone_number: "",
      gender: "male",
      role: "", 
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Too short"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Must be at least 6 chars"),
      phone_number: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Invalid phone number"),
      role: Yup.string().required("Please select a role"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const loadingToast = toast.loading("Creating staff account...");

      try {
        const authData = {
          username: values.username,
          email: values.email,
          password: values.password,
        };

        const extraData = {
          phone_number: values.phone_number,
          gender: values.gender,
        };

        await createStaffAccount(authData, extraData, values.role);

        toast.success("Staff member added successfully! 🎉", {
          id: loadingToast,
        });
        navigate("/admin/staff");
      } catch (error) {
        console.error(error);
        const errMsg =
          error.response?.data?.error?.message || "Failed to create staff";
        toast.error(errMsg, { id: loadingToast });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col h-full w-full bg-background-soft dark:bg-background-dark p-4 md:p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary transition-colors"
        >
          <MdArrowBack size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Add New Staff
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create account with full details
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto w-full bg-white dark:bg-[#1a2632] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <MdPerson
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  {...formik.getFieldProps("username")}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border outline-none text-slate-900 dark:text-white ${formik.touched.username && formik.errors.username ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                  placeholder="e.g. AhmedAli"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <MdEmail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border outline-none text-slate-900 dark:text-white ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                  placeholder="e.g. ahmed@resto.com"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <MdLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="password"
                  {...formik.getFieldProps("password")}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border outline-none text-slate-900 dark:text-white ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                  placeholder="••••••••"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <MdPhone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  {...formik.getFieldProps("phone_number")}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border outline-none text-slate-900 dark:text-white ${formik.touched.phone_number && formik.errors.phone_number ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                  placeholder="e.g. 01012345678"
                />
              </div>
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.phone_number}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex-1 cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formik.values.gender === "male" ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800" : "border-slate-200 dark:border-slate-700"}`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "male"}
                    className="hidden"
                  />
                  <span>Male</span>
                </label>
                <label
                  className={`flex-1 cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formik.values.gender === "female" ? "bg-pink-50 border-pink-200 text-pink-600 dark:bg-pink-900/20 dark:border-pink-800" : "border-slate-200 dark:border-slate-700"}`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "female"}
                    className="hidden"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Role Selection */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Assign Role <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => formik.setFieldValue("role", role.id)}
                    className={`cursor-pointer px-4 py-3 rounded-xl border text-center transition-all ${
                      Number(formik.values.role) === role.id
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-primary/50"
                    }`}
                  >
                    <span className="font-bold text-sm">{role.name}</span>
                  </div>
                ))}
              </div>
              {formik.touched.role && formik.errors.role && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.role}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="mt-4 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <MdPersonAdd size={20} />
            {formik.isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
