import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { localRequest } from '../utils/axios';
import { FaGamepad } from 'react-icons/fa';

export default function ArticleDetail() {
  const { id } = useParams(); // Mengambil ID artikel dari URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await localRequest.get(`/pub/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch article');
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-yellow-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="text-center mt-20 text-gray-400">Article not found</div>;
  }

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 min-h-screen p-4">
      <div className="container mx-auto p-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4 flex items-center">
          <FaGamepad className="mr-2" />
          {article.title}
        </h2>
        {article.imageUrl && (
          <div className="mb-4">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <p className="text-gray-300 mb-4">{article.content}</p>
        <div className="text-sm text-gray-400">
          <div>By {article.User.username}</div>
          <div>in {article.Category.name}</div>
        </div>
      </div>
    </div>
  );
}
