import { useState, useEffect } from 'react';
import { localRequest } from '../utils/axios';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await localRequest.get('/pub/categories');
        setCategories(response.data);
      } catch (error) {
        setMessage('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorId = localStorage.getItem('id');
    const token = localStorage.getItem('token'); // Get token from localStorage

    try {
      const response = await localRequest.post(
        '/articles/add',
        {
          title,
          content,
          imgUrl,
          categoryId,
          authorId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }

      setMessage('Article created successfully!');
      setTitle('');
      setContent('');
      setImgUrl('');
      setCategoryId('');
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error('Error creating article:', error); // Log error details
      setMessage('Failed to create article. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 min-h-screen p-4">
      <div className="container mx-auto p-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4 flex items-center">
          <FaPlus className="mr-2" />
          Create Article
        </h2>
        {message && (
          <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="imgUrl">
              Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imgUrl"
              type="text"
              placeholder="Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="categoryId">
              Category
            </label>
            <select
              id="categoryId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
