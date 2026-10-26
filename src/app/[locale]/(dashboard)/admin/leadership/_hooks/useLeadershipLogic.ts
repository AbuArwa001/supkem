import { useState, useEffect, useMemo } from "react";
import { LeadershipService, LeadershipProfile } from "@/services/leadership-service";
import { toast } from "sonner";

const initialForm = {
  name: "", title: "", bio: "", order: 0, is_active: true, photo: null as File | null,
  twitter_url: "", linkedin_url: "", facebook_url: "",
};

export function useLeadershipLogic() {
  const [profiles, setProfiles] = useState<LeadershipProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadershipProfile | null>(null);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    try { setProfiles(await LeadershipService.getProfiles(true)); }
    catch { toast.error("Failed to fetch leadership profiles."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProfiles(); }, []);

  const handleOpenModal = (item: LeadershipProfile | null = null) => {
    setEditingItem(item);
    setFormData(item ? {
      name: item.name, title: item.title, bio: item.bio || "", order: item.order,
      is_active: item.is_active, photo: null, twitter_url: item.twitter_url || "",
      linkedin_url: item.linkedin_url || "", facebook_url: item.facebook_url || "",
    } : initialForm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "photo" && v instanceof File) data.append("photo", v);
      else if (k !== "photo" && v !== null && v !== undefined) data.append(k, String(v));
    });

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
    } catch { toast.error("Failed to save leadership profile."); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      try {
        await LeadershipService.deleteProfile(id);
        toast.success("Profile deleted successfully");
        fetchProfiles();
      } catch { toast.error("Failed to delete profile"); }
    }
  };

  const filteredProfiles = useMemo(() => profiles.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.title.toLowerCase().includes(searchTerm.toLowerCase())
  ), [profiles, searchTerm]);

  return {
    profiles: filteredProfiles, loading, searchTerm, setSearchTerm, isModalOpen, editingItem,
    formData, setFormData, isSubmitting, handleOpenModal, handleCloseModal, handleSubmit, handleDelete, fetchProfiles,
  };
}
