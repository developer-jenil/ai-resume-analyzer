import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  timeout: 30000,
});

export const uploadResume = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/upload-resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (!event.total || !onProgress) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onProgress(percent);
    },
  });
  return response.data;
};

export const analyzeResume = async (payload) => {
  const response = await api.post("/analyze", payload);
  return response.data;
};

export const getResults = async () => {
  const response = await api.get("/results");
  return response.data;
};
