import { useEffect, useState } from "react";
import api from "../../api/axios";

interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
}

function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await api.get("/gallery");
      setImages(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Our Gallery
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Take a look at some of our clinic's facilities, treatments, and successful patient journeys.
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          // Skeleton Loading State
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <div 
                key={skeleton} 
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="w-full h-72 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : images.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg 
              className="w-20 h-20 text-gray-300 mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900">No images found</h3>
            <p className="text-gray-500 mt-2">Check back later for new updates to our gallery.</p>
          </div>
        ) : (
          // Image Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div
                key={image.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative overflow-hidden w-full h-72">
                  <img
                    src={`https://api.skvclinic.com/uploads/gallery/${image.imageUrl}`}
                    alt={image.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                  {/* Subtle dark overlay on hover for a premium feel */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-center">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;