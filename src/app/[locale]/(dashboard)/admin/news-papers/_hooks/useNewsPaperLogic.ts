import { useState, useEffect, useMemo } from "react";
import { NewsPaperService, NewsPaperItem } from "@/services/news-service";

const initialForm = {
  title: "", issue_number: "", published_date: new Date().toISOString().split("T")[0],
  is_published: true, file: null as File | null, cover_image: null as File | null,
};

export function useNewsPaperLogic() {
  const [newsPapers, setNewsPapers] = useState<NewsPaperItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsPaperItem | null>(null);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsPapers = async () => {
    setLoading(true);
    setError(null);
    try { setNewsPapers(await NewsPaperService.getNewsPapers()); }
    catch (err) { console.error("Failed to fetch news papers", err); setError("Failed to load news papers. Please try again."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchNewsPapers(); }, []);

  const handleOpenModal = (item: NewsPaperItem | null = null) => {
    setError(null);
    setEditingItem(item);
    setFormData(item ? {
      title: item.title, issue_number: item.issue_number || "",
      published_date: item.published_date || new Date().toISOString().split("T")[0],
      is_published: item.is_published, file: null, cover_image: null,
    } : initialForm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => { setIsModalOpen(false); setError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("issue_number", formData.issue_number);
    data.append("published_date", formData.published_date);
    data.append("is_published", String(formData.is_published));
    if (formData.file) data.append("file", formData.file);
    if (formData.cover_image) data.append("cover_image", formData.cover_image);

    try {
      if (editingItem) await NewsPaperService.updateNewsPaper(editingItem.id, data);
      else await NewsPaperService.createNewsPaper(data);
      setIsModalOpen(false);
      fetchNewsPapers();
    } catch (err: any) {
      setError(err.response?.data?.detail || err.response?.data?.file?.[0] || err.response?.data?.cover_image?.[0] || "Failed to upload news paper.");
    } finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this news paper?")) {
      try { await NewsPaperService.deleteNewsPaper(id); fetchNewsPapers(); } catch (err) { console.error("Failed to delete news paper", err); }
    }
  };

  const filteredNewsPapers = useMemo(() =>
    newsPapers.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [newsPapers, searchTerm]
  );

  return {
    newsPapers: filteredNewsPapers, loading, searchTerm, setSearchTerm, isModalOpen, editingItem,
    formData, setFormData, isSubmitting, error, handleOpenModal, handleCloseModal, handleSubmit, handleDelete, fetchNewsPapers,
  };
}
