'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Articles', [
      // MOBA Articles
      {
        title: 'The Rise of MOBA Esports',
        content: 'MOBA games have taken the esports world by storm...',
        imgUrl: 'https://example.com/moba1.jpg',
        categoryId: 1, // Assuming 1 is the ID for MOBA
        authorId: 1, // Assuming 1 is an existing author ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Top 10 MOBA Players in 2024',
        content: 'Here are the top 10 MOBA players dominating the scene in 2024...',
        imgUrl: 'https://example.com/moba2.jpg',
        categoryId: 1,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'MOBA Strategies for Beginners',
        content: 'Starting out in a MOBA game can be challenging...',
        imgUrl: 'https://example.com/moba3.jpg',
        categoryId: 1,
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // FPS Articles
      {
        title: 'The Evolution of FPS Esports',
        content: 'FPS esports has evolved significantly over the years...',
        imgUrl: 'https://example.com/fps1.jpg',
        categoryId: 2, // Assuming 2 is the ID for FPS
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Best FPS Tournaments to Watch',
        content: 'Here are some of the best FPS tournaments to keep an eye on...',
        imgUrl: 'https://example.com/fps2.jpg',
        categoryId: 2,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Tips to Improve Your FPS Skills',
        content: 'Want to get better at FPS games? Here are some tips...',
        imgUrl: 'https://example.com/fps3.jpg',
        categoryId: 2,
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Battle Royale Articles
      {
        title: 'The Best Battle Royale Games in 2024',
        content: 'These are the battle royale games you should be playing in 2024...',
        imgUrl: 'https://example.com/br1.jpg',
        categoryId: 3, // Assuming 3 is the ID for Battle Royale
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'How to Win in Battle Royale Games',
        content: 'Winning in battle royale games requires strategy and skill...',
        imgUrl: 'https://example.com/br2.jpg',
        categoryId: 3,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Battle Royale Esports Scene Overview',
        content: 'An overview of the current state of battle royale esports...',
        imgUrl: 'https://example.com/br3.jpg',
        categoryId: 3,
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Sports Simulation Articles
      {
        title: 'Top Sports Simulation Games in 2024',
        content: 'These sports simulation games are leading the genre in 2024...',
        imgUrl: 'https://example.com/ss1.jpg',
        categoryId: 4, // Assuming 4 is the ID for Sports Simulation
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'The Growth of Sports Simulation Esports',
        content: 'Sports simulation esports has grown rapidly in recent years...',
        imgUrl: 'https://example.com/ss2.jpg',
        categoryId: 4,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Tips for Mastering Sports Simulation Games',
        content: 'Become a pro at sports simulation games with these tips...',
        imgUrl: 'https://example.com/ss3.jpg',
        categoryId: 4,
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};

