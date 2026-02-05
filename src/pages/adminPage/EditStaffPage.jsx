import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdSave, MdPerson, MdEmail, MdPhone, MdVpnKey, MdLock } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginRepo from '../../customHook/LoginRepo';
import { useAuthuser } from '../../store';
import toast from 'react-hot-toast';

export default function EditStaffPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // بنجيب الـ ID من الرابط
  const { user } = useAuthuser();
  const token = user?.jwt || sessionStorage.getItem('jwt-token');
  
  const [loadingData, setLoadingData] = useState(true);

  const roles = [
    { id: 4, name: 'Cashier' },
    { id: 3, name: 'Admin' }
  ];

  // إعداد الفورم
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone_number: '',
      role: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required').min(3, 'Too short'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone_number: Yup.string().matches(/^[0-9]+$/, "Digits only").min(10, 'Invalid phone'),
      role: Yup.string().required('Role is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const loadingToast = toast.loading("Updating staff...");
      try {
        const payload = {
            username: values.username,
            email: values.email,
            phone_number: values.phone_number,
            role: values.role 
        };

        if (values.password) {
            payload.password = values.password;
        }

        await LoginRepo.update_user(id, payload, token);
        
        toast.success("Staff updated successfully! ✅", { id: loadingToast });
        navigate('/admin/staff');
      } catch (error) {
        console.error(error);
        toast.error("Update failed ❌", { id: loadingToast });
      } finally {
        setSubmitting(false);
      }
    },
  });

// get user info
  useEffect(() => {
    const getStaffDetails = async () => {
        try {
            const res = await LoginRepo.getUserById(id, token);
            const userData = res.data;
            
            // ملء الفورم بالبيانات الراجعة
            formik.setValues({
                username: userData.username || '',
                email: userData.email || '',
                phone_number: userData.phone_number || '',
                role: userData.role?.id || '' ,
                password: '',
            });
        } catch (error) {
            toast.error("Failed to fetch user data");
            navigate('/admin/staff');
        } finally {
            setLoadingData(false);
        }
    };

    if (token && id) getStaffDetails();
  }, [id, token]);

  if (loadingData) return <div className="text-center py-20">Loading Data...</div>;

  return (
    <div className="flex flex-col h-full w-full bg-background-soft dark:bg-background-dark p-4 md:p-8 overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white dark:bg-[#1a2632] border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary transition-colors">
          <MdArrowBack size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Edit Staff Member</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Update account details and permissions</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto w-full bg-white dark:bg-[#1a2632] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Username */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Username</label>
                <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    <input 
                    type="text" 
                    {...formik.getFieldProps('username')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
                    />
                </div>
                {formik.touched.username && formik.errors.username && <p className="text-xs text-red-500 mt-1">{formik.errors.username}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    <input 
                    type="email" 
                    {...formik.getFieldProps('email')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
                    />
                </div>
                {formik.touched.email && formik.errors.email && <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                <div className="relative">
                    <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    <input 
                    type="text" 
                    {...formik.getFieldProps('phone_number')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
                    />
                </div>
                {formik.touched.phone_number && formik.errors.phone_number && <p className="text-xs text-red-500 mt-1">{formik.errors.phone_number}</p>}
              </div>

              {/* Role Selection */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Assign Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map(role => (
                    <div 
                      key={role.id}
                      onClick={() => formik.setFieldValue('role', role.id)}
                      className={`cursor-pointer px-4 py-3 rounded-xl border text-center transition-all ${
                        Number(formik.values.role) === role.id 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-primary/50'
                      }`}
                    >
                      <span className="font-bold text-sm">{role.name}</span>
                    </div>
                  ))}
                </div>
                {formik.touched.role && formik.errors.role && <p className="text-xs text-red-500 mt-1">{formik.errors.role}</p>}
              </div>

              {/* password  */}

              <div className="col-span-1 md:col-span-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                    <MdVpnKey className="text-primary" />
                    Reset Password <span className="text-slate-400 font-normal text-xs ml-auto">(Leave empty to keep current password)</span>
                </label>
                <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    <input 
                    type="password" 
                    {...formik.getFieldProps('password')}
                    placeholder="Enter new password to reset..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border outline-none text-slate-900 dark:text-white transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                    />
                </div>
                {formik.touched.password && formik.errors.password && <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>}
              </div>
          </div>

          <button 
            type="submit" 
            disabled={formik.isSubmitting}
            className="mt-4 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <MdSave size={20} />
            {formik.isSubmitting ? "Updating..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
}