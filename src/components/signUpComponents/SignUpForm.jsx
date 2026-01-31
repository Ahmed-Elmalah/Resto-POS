import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  MdPerson,
  MdEmail,
  MdCall,
  MdWc,
  MdLock,
  MdArrowForward,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useLogin from "../../customHook/useLogin";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();

  const { signup } = useLogin();

  const initialValues = {
    username: "",
    email: "",
    phone_number: "",
    gender: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string().required("Mobile is required"),
    gender: Yup.string().required("Please select gender"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "At least 6 characters")
      .matches(/[A-Z]/, "Need one uppercase")
      .matches(/[0-9]/, "Need one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Need one special character"),
  });

  const handleSubmit = async (values) => {
    try {
      await signup(values);
      toast.success("SinUp Successfully");
    } catch (err) {
      toast.error("Something went Wrong");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="px-8 pb-5 space-y-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-white text-sm font-medium">Full Name</label>
          <div className="relative group">
            <MdPerson
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9dabb9] group-focus-within:text-primary transition-colors"
              size={20}
            />
            <Field
              name="username"
              placeholder="John Doe"
              className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4754] bg-[#111418] h-12 pl-11 pr-4 text-sm transition-all"
            />
          </div>
          <ErrorMessage
            name="username"
            component="div"
            className="text-primary text-[10px] mt-1"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-white text-sm font-medium">
            Work Email Address
          </label>
          <div className="relative group">
            <MdEmail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9dabb9] group-focus-within:text-primary transition-colors"
              size={20}
            />
            <Field
              name="email"
              type="email"
              placeholder="admin@restaurant.com"
              className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4754] bg-[#111418] h-12 pl-11 pr-4 text-sm transition-all"
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="text-primary text-[10px] mt-1"
          />
        </div>

        {/* Mobile & Gender Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="text-white text-sm font-medium">
              Mobile Number
            </label>
            <div className="relative group">
              <MdCall
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9dabb9] group-focus-within:text-primary transition-colors"
                size={20}
              />
              <Field
                name="phone_number"
                placeholder="+1 (555) 000-0000"
                className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4754] bg-[#111418] h-12 pl-11 pr-4 text-sm transition-all"
              />
            </div>
            <ErrorMessage
              name="phone_number"
              component="div"
              className="text-primary text-[10px] mt-1"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white text-sm font-medium">Gender</label>
            <div className="relative group">
              <MdWc
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9dabb9] group-focus-within:text-primary transition-colors"
                size={20}
              />
              <Field
                as="select"
                name="gender"
                className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4754] bg-[#111418] h-12 pl-11 pr-4 text-sm transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-primary text-[10px] mt-1"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-white text-sm font-medium">
            Secure Password
          </label>
          <div className="relative group">
            <MdLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9dabb9] group-focus-within:text-primary transition-colors"
              size={20}
            />
            <Field
              name="password"
              type={isShow == false ? "password" : "text"}
              placeholder="••••••••••••"
              className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4754] bg-[#111418] h-12 pl-11 pr-12 text-sm transition-all"
            />
            <button
              type="button"
              onClick={() => setIsShow(!isShow)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9dabb9] hover:text-primary"
            >
              {isShow ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </button>
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="text-primary text-[10px] mt-1"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-lg transition duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>Create Account</span>
            <MdArrowForward size={20} />
          </button>
        </div>

        {/* Footer Link */}
        <div className="pt-6 text-center border-t border-[#3b4754]">
          <p className="text-[#9dabb9] text-sm">
            Already have an account?
            <a
              onClick={() => navigate("/login")}
              className="text-primary font-bold hover:underline ml-1"
              href="#"
            >
              Sign In
            </a>
          </p>
        </div>
      </Form>
    </Formik>
  );
}
