import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  MdEmail,
  MdLock,
  MdLogin,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useLogin from "../../customHook/useLogin";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const { login } = useLogin();

  const initialValues = { email: "", password: "", rememberMe: false };

  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const handleSubmit = async (values) => {
    try {
      await login(values);
      toast.success("Login Successfully");
    } catch (err) {
      toast.error("Wrong Email or Password");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="flex flex-col gap-1 px-6 pb-5">
        {/* Email Field */}
        <div className="flex flex-col gap-1 py-2 w-full text-left">
          <label className="text-white text-sm font-semibold pb-2">
            Email Address
          </label>
          <div className="relative group">
            <Field
              name="email"
              type="email"
              placeholder="user@restaurant.com"
              className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4754] bg-[#111418] focus:border-primary h-14 px-4 pr-12 text-base transition-all"
            />
            <MdEmail
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9dabb9] group-focus-within:text-primary transition-colors"
              size={24}
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="text-primary text-xs mt-1"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1 py-2 w-full text-left">
          <div className="flex justify-between items-end pb-2">
            <label className="text-white text-sm font-semibold">Password</label>
            <a
              href="#"
              className="text-primary text-sm font-medium hover:underline"
            >
              Forgot?
            </a>
          </div>
          <div className="relative group">
            <Field
              name="password"
              type={isShow == false ? "password" : "text"}
              placeholder="••••••••"
              className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#3b4754] bg-[#111418] focus:border-primary h-14 px-4 pr-12 text-base transition-all"
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
            className="text-primary text-xs mt-1"
          />
        </div>

        {/* Remember Me */}
        <div className="py-3">
          <label className="flex items-center gap-x-3 cursor-pointer group">
            <Field
              type="checkbox"
              name="rememberMe"
              className="h-5 w-5 rounded border-[#3b4754] border-2 bg-transparent text-primary checked:bg-primary transition-all focus:ring-0 cursor-pointer"
            />
            <p className="text-[#9dabb9] group-hover:text-white text-sm font-medium transition-colors">
              Keep me signed in
            </p>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg h-13 mt-1 bg-primary text-white text-base font-bold hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          <span className="pr-2">Sign In</span>
          <MdLogin size={22} />
        </button>
      </Form>
    </Formik>
  );
}
