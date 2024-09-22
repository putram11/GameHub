// src/assets/Articles.js

import { useState, useEffect } from 'react';
import { localRequest } from '../utils/axios';
import { Link } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa';

export function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesResponse = await localRequest.get('/pub/articles');
        const categoriesResponse = await localRequest.get('/pub/categories');
        setArticles(articlesResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.Category.name === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="text-center mt-20 text-yellow-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-4xl font-bold text-yellow-400 mb-4 flex items-center">
        <FaGamepad className="mr-2" />
        Articles
      </h2>
      <div className="mb-4 flex gap-4">
        <select
          className="p-2 rounded bg-gray-800 text-yellow-400"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="p-2 rounded bg-gray-800 text-yellow-400"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-4"
          >
            <div>
              <h3 className="text-2xl font-semibold text-yellow-300 mb-2">{article.title}</h3>
              <p className="text-gray-400">{article.content}</p>
            </div>
            <div className='mt-auto'>
              <div className="">
                <Link
                  to={`/articles/${article.id}`}
                  className="text-blue-400 hover:underline"
                >
                  Read More
                </Link>
              </div>
              <div className="mt-1">
                <span className="text-sm text-gray-500">By {article.User.username}</span>
                <span className="text-sm text-gray-500"> in {article.Category.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
