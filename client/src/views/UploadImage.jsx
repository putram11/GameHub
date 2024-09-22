import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { localRequest } from '../utils/axios'; // Update this import if necessary

const UploadImage = () => {
  const { id } = useParams(); // Get articleId from URL params
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [article, setArticle] = useState(null);
  const navigate = useNavigate(); // For navigation after successful upload

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await localRequest.get(`/pub/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setMessage('Failed to fetch article');
      }
    };

    fetchArticle();
  }, [id]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // Ensure 'image' matches the field name used in multer

    try {
      const response = await localRequest.patch(`/articles/image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if required
        },
      });

      if (response.status === 200) {
        setMessage('Image uploaded successfully!');
        navigate('/home'); // Redirect to home or any other page
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image');
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 min-h-screen p-4">
      <div className="container mx-auto p-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">Upload Article Image</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        {article && (
          <div className="mb-4">
            <p className="text-gray-300 mb-2">Current Image:</p>
            <img
              src={article.imgUrl}
              alt="Current article"
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="file">
              New Image
            </label>
            <input
              className="block w-full text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="file"
              type="file"
              accept="image/*" // Ensure only image files can be selected
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
