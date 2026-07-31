import { useEffect, useState, } from "react";
import api from "../../api/axios";

interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
}

function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await api.get("/gallery");
      setImages(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Please select an image and enter title");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      await api.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setImage(null);

      fetchImages();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete(`/gallery/${id}`);
      fetchImages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>

      <form onSubmit={handleUpload} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          disabled={isUploading}
          className="bg-[#153C33] text-white px-6 py-2 rounded"
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="border rounded-lg overflow-hidden">
            <img
              src={`http://localhost:5000/uploads/gallery/${img.imageUrl}`}
              alt={img.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{img.title}</h3>

              <button
                onClick={() => handleDelete(img.id)}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;