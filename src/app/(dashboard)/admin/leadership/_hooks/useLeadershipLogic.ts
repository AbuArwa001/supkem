import { useState, useEffect, useMemo } from "react";
import { LeadershipService, LeadershipProfile } from "@/services/leadership-service";
import { toast } from "sonner";

export function useLeadershipLogic() {
  const [profiles, setProfiles] = useState<LeadershipProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadershipProfile | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    order: 0,
    is_active: true,
    photo: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const data = await LeadershipService.getProfiles(true);
      setProfiles(data);
    } catch (err) {
      console.error("Failed to fetch leadership profiles", err);
      toast.error("Failed to fetch leadership profiles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleOpenModal = (item: LeadershipProfile | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        title: item.title,
        bio: item.bio || "",
        order: item.order,
        is_active: item.is_active,
        photo: null,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        title: "",
        bio: "",
        order: 0,
        is_active: true,
        photo: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("bio", formData.bio);
    data.append("order", String(formData.order));
    data.append("is_active", String(formData.is_active));
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      if (editingItem) {
        await LeadershipService.updateProfile(editingItem.id, data);
        toast.success("Leadership profile updated successfully!");
      } else {
        await LeadershipService.createProfile(data);
        toast.success("Leadership profile created successfully!");
      }
      setIsModalOpen(false);
      fetchProfiles();
    } catch (err: any) {
      console.error("Failed to save leadership profile", err);
      toast.error("Failed to save leadership profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      try {
        await LeadershipService.deleteProfile(id);
        toast.success("Profile deleted successfully");
        fetchProfiles();
      } catch (err) {
        console.error("Failed to delete profile", err);
        toast.error("Failed to delete profile");
      }
    }
  };

  const filteredProfiles = useMemo(() => {
    return profiles.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [profiles, searchTerm]);

  return {
    profiles: filteredProfiles,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingItem,
    formData,
    setFormData,
    isSubmitting,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDelete,
    fetchProfiles,
  };
}
