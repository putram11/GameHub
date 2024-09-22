import { useState, useEffect } from 'react';
import { localRequest } from '../utils/axios';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await localRequest.get('/pub/categories'); // Ubah endpoint sesuai API Anda
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 min-h-screen p-4">
      <div className="container mx-auto p-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4 flex items-center justify-center">
          Categories
        </h2>
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="text-gray-400">
              <th className="py-3 px-6 border-b border-gray-700 text-center">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="text-gray-300">
                <td className="py-3 px-6 border-b border-gray-700 text-center">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategories;
