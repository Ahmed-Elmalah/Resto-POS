import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import MenuRepo from "../../customHook/MenuRepo";
import { domain, useMenuStore } from "../../store";
import Swal from 'sweetalert2';

import ImageUploader from "../../components/adminComponents/menu/ImageUploader";
import ProductInfoForm from "../../components/adminComponents/menu/ProductInfoForm";
import toast from "react-hot-toast";

export default function ProductFormPage() {
  const navigate = useNavigate();
  const { refreshMenu } = useMenuStore();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const token =
    localStorage.getItem("jwt-token") || sessionStorage.getItem("jwt-token");

  // --- States ---
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    category: "",
    isAvailable: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCats, setFetchingCats] = useState(true);

  // --- 1. Fetch Categories & Product Data (if Edit) ---
  useEffect(() => {
    const initPage = async () => {
      try {
        // أ) جلب الأقسام
        const catRes = await MenuRepo.getAllCategories();
        const catsData = catRes.data.data || [];
        setCategories(catsData);

        // ب) لو تعديل: جلب بيانات المنتج
        if (isEditMode) {
          const productRes = await MenuRepo.getProductById(id);
          const product = productRes.data.data;

          if (product) {
            // ملء الفورم بالبيانات الراجعة
            setFormData({
              name: product.name,
              desc: product.desc || "",
              price: product.price,
              category: product.category?.id || "", // تأكد من الـ structure
              isAvailable: product.isAvailable,
            });

            // ملء الصورة لو موجودة
            if (product.image?.url) {
              // بنحط الدومين لو الصورة مش كاملة
              setImagePreview(`${domain}${product.image.url}`);
            }
          }
        } else {
          // لو إضافة جديدة، اختار أول قسم افتراضياً
          if (catsData.length > 0) {
            setFormData((prev) => ({ ...prev, category: catsData[0].id }));
          }
        }
      } catch (err) {
        console.error("Error initializing page:", err);
        toast.error("Failed to load data");
      } finally {
        setFetchingCats(false);
      }
    };

    initPage();
  }, [id, isEditMode]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isAvailable: !prev.isAvailable }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // --- Submit Logic (Add or Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill in required fields");
      return;
    }

    const loadingToast = toast.loading("Saving product...");
    setLoading(true);

    try {
      let imageId = null; 

      //  uplode new img
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("files", imageFile);
        const uploadRes = await MenuRepo.uploadImage(imageFormData, token);
        if (uploadRes.data && uploadRes.data[0]) {
          imageId = uploadRes.data[0].id;
        }
      }

      // ready data
      const productPayload = {
        name: formData.name,
        desc: formData.desc,
        price: Number(formData.price),
        category: formData.category,
        isAvailable: formData.isAvailable,
      };

      if (imageId) {
        productPayload.image = imageId;
      }

      // to see add or update
      if (isEditMode) {
        // --- Update ---
        await MenuRepo.updateProduct(id, productPayload, token);
        toast.success("Product updated successfully! ", { id: loadingToast });
      } else {
        // --- Create ---
        await MenuRepo.addProduct(productPayload, token);
        toast.success("Product created successfully! 🎉", { id: loadingToast });
      }
      await refreshMenu();

      navigate("/admin/menu");
    } catch (error) {
      console.error("Operation failed:", error.response || error);
      toast.error("Error saving product. Please try again.", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete 
  const handleDelete = async () => {
    // 1. Show Confirmation Alert
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      theme: 'dark',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    // 2. If confirmed, proceed
    if (result.isConfirmed) {
      const loadingToast = toast.loading('Deleting product...');
      try {
        // 3. Call Repo to delete
        await MenuRepo.deleteProduct(id, token);
        
        // 4. Success handling
        toast.success('Product deleted successfully!', { id: loadingToast });
        await refreshMenu();
        navigate('/admin/menu');
        
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error('Failed to delete product', { id: loadingToast });
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background-soft dark:bg-background-dark overflow-y-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white dark:bg-[#1a2632] text-slate-500 hover:text-primary border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <MdArrowBack size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isEditMode
                ? "Update existing menu item"
                : "Create a new item for your menu"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full"
      >
        {/* Left: Image */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ImageUploader
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onRemove={removeImage}
          />
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ProductInfoForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleToggle={handleToggle}
            categories={categories}
            loading={loading}
            fetchingCats={fetchingCats}
            isEditMode={isEditMode}
            onCancel={() => navigate("/admin/menu")}
            onDelete={handleDelete}
          />
        </div>
      </form>
    </div>
  );
}
