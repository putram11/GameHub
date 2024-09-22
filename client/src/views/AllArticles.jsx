import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { localRequest } from '../utils/axios';
import { FaEdit, FaUpload, FaPlus } from 'react-icons/fa';

const AllArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await localRequest.get('/pub/arti');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 min-h-screen p-4">
      <div className="container mx-auto p-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
        <div className="mb-4">
          <Link
            to="/create"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Create New Article
          </Link>
        </div>
        <h2 className="text-4xl font-bold text-yellow-400 mb-4 flex items-center justify-center">
          <FaPlus className="mr-2" />
          All Articles
        </h2>
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="text-gray-400">
              <th className="py-3 px-6 border-b border-gray-700 text-center">Title</th>
              <th className="py-3 px-6 border-b border-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="text-gray-300">
                <td className="py-3 px-6 border-b border-gray-700 text-center">{article.title}</td>
                <td className="py-3 px-6 border-b border-gray-700 text-center flex justify-center space-x-2">
                  <Link
                    to={`/update/articles/${article.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 flex items-center"
                  >
                    <FaEdit />
                    <span className="ml-2">Edit</span>
                  </Link>
                  <Link
                    to={`/update/photo/${article.id}`}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 flex items-center"
                  >
                    <FaUpload />
                    <span className="ml-2">Upload</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllArticles;
