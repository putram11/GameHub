import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { localRequest } from '../utils/axios';
import { FaEdit } from 'react-icons/fa';

const UpdateArticle = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await localRequest.get('/pub/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Failed to fetch categories');
      }
    };

    const fetchArticle = async () => {
      try {
        const response = await localRequest.get(`/pub/articles/${id}`);
        const article = response.data;
        setTitle(article.title);
        setContent(article.content);
        setImgUrl(article.imgUrl);
        setCategoryId(article.categoryId);
      } catch (error) {
        console.error('Error fetching article:', error);
        setMessage('Failed to fetch article');
      }
    };

    fetchCategories();
    fetchArticle();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await localRequest.put(`/articles/${id}`, {
        title,
        content,
        imgUrl,
        categoryId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }

      setMessage('Article updated successfully!');
      navigate('/all'); // Redirect to home page or any other page
    } catch (error) {
      console.error('Error updating article:', error);
      setMessage('Failed to update article');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await localRequest.delete(`/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }

      setMessage('Article deleted successfully!');
      navigate('/'); // Redirect to home page or any other page
    } catch (error) {
      console.error('Error deleting article:', error);
      setMessage('Failed to delete article');
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 min-h-screen p-4">
      <div className="container mx-auto p-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4 flex items-center">
          <FaEdit className="mr-2" />
          Update Article
        </h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
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
              Update Article
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDelete}
            >
              Delete Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;
