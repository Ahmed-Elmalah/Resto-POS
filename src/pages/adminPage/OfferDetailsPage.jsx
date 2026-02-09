import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Removed useLocation
import useAdminStore from "../../store/useAdminStore";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

// Import Sub-Components
import OfferDetailsHeader from "../../components/adminComponents/Offers/OfferDetailsHeader";
import OfferImageStatus from "../../components/adminComponents/Offers/OfferImageStatus";
import OfferForm from "../../components/adminComponents/Offers/OfferForm";

export default function OfferDetailsPage() {
  const navigate = useNavigate();
  // Get ID from URL (Note: in our route config it is :id, but it holds the documentId string)
  const { id } = useParams(); 
  
  // Get Store Functions & State
  const { 
    getOfferById, 
    currentOffer, 
    isLoadingCurrentOffer,
    deleteOffer, 
    updateOffer, 
    uploadFile 
  } = useAdminStore();

  // Local UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Local loading for save action

  // Form States
  const [formData, setFormData] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // --- 1. Fetch Data on Mount ---
  useEffect(() => {
    if (id) {
      getOfferById(id);
    }
  }, [id]);

  // --- 2. Sync State when 'currentOffer' loads ---
  useEffect(() => {
    if (currentOffer) {
      // Map API data to Form State
      setFormData({
        name: currentOffer.name,
        description: currentOffer.description,
        price: currentOffer.price,
        expiryDate: currentOffer.expiryDate,
        isAvailable: currentOffer.isAvailable,
      });

      // Map Products
      if (currentOffer.products) {
        // Strapi v5 sometimes returns array directly or inside .data depending on population depth
        // Adjust this check based on your actual response
        const prodList = Array.isArray(currentOffer.products) ? currentOffer.products : currentOffer.products.data || [];
        
        const mappedProducts = prodList.map((p) => ({
          id: p.id, 
          documentId: p.documentId,
          name: p.name || p.attributes?.name, 
          price: p.price || p.attributes?.price,
          qty: 1, 
        }));
        setSelectedProducts(mappedProducts);
      }
    }
  }, [currentOffer]);


  // Show Loading Spinner while fetching initial data
  if (isLoadingCurrentOffer || !currentOffer) {
    return (
      <div className="flex justify-center items-center h-screen">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // --- Computed Status ---
  const isExpired = new Date(currentOffer.expiryDate) < new Date();
  const statusBadge = isExpired
    ? { text: "Expired", color: "bg-red-100 text-red-600 border-red-200" }
    : currentOffer.isAvailable
    ? { text: "Active", color: "bg-green-100 text-green-700 border-green-200" }
    : { text: "Inactive", color: "bg-gray-100 text-gray-600 border-gray-300" };

  // --- Handlers ---
  
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      // ... Dark mode styling ...
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteOffer(currentOffer.documentId);
        if (res.success) {
          Swal.fire("Deleted!", "Offer has been deleted.", "success");
          navigate("/admin/promotions");
        } else {
          toast.error("Failed to delete.");
        }
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let imageId = currentOffer.image?.id;

      // Upload new image
      if (editImage) {
        const uploaded = await uploadFile(editImage);
        imageId = uploaded.id;
      }

      const payload = {
        ...formData,
        image: imageId,
        products: selectedProducts.map(p => p.documentId),
      };

      const result = await updateOffer(currentOffer.documentId, payload);

      if (result.success) {
        toast.success("Offer updated!");
        setIsEditing(false);
        // Optional: Refetch to ensure data consistency
        getOfferById(id); 
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating offer");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      
      <OfferDetailsHeader 
        navigate={navigate}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleDelete={handleDelete}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <OfferImageStatus 
          isEditing={isEditing}
          preview={preview}
          offerImage={currentOffer.image?.url}
          offerName={currentOffer.name}
          handleImageChange={handleImageChange}
          formData={formData}
          setFormData={setFormData}
          statusBadge={statusBadge}
          isExpired={isExpired}
        />

        <OfferForm 
          isEditing={isEditing}
          handleSave={handleSave}
          formData={formData}
          setFormData={setFormData}
          isLoading={isSaving}
          setIsEditing={setIsEditing}
          offer={currentOffer}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />

      </div>
    </div>
  );
}