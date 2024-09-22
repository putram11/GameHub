import { Banner } from '../assets/Banner';
import { About } from '../assets/About';
import { Articles } from '../assets/article';

export default function Home() {
  // Sample images for the Banner component
  const bannerImages = [
    { src: 'https://t3.ftcdn.net/jpg/05/70/46/84/360_F_570468461_nQkMk10XoVneaUmWSr83XsZEhpneUCQS.jpg', alt: 'Image 1' },
    { src: 'https://senet-cloud.s3.eu-central-1.amazonaws.com/assets/images/601aee532dab8/staples_centre_los_angeles.jpg', alt: 'Image 2' },
    { src: 'https://wallpapercat.com/w/full/c/5/0/1152324-2048x1365-desktop-hd-esports-wallpaper-photo.jpg', alt: 'Image 3' },
    { src: 'https://hybrid.co.id/wp-content/uploads/2021/09/00ff743a020fe9050ecce8d2b92fb3c0_gambit-vct-berlin-champs-747x420-1.jpg', alt: 'Image 4' },
    { src: 'https://cdn.oneesports.id/cdn-data/sites/2/2024/07/Mobile-Legends_MSC-2024_Trofi.jpg', alt: 'Image 5' },
    { src: 'https://cdn.mos.cms.futurecdn.net/cFYZZHa8gKmMJM5Eaxroy3.jpg', alt: 'Image 6' },
  ];

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 min-h-screen p-4">
      <br /><br />
      <Banner images={bannerImages} />
      <br /><br />
      <About />
      <br /><br />
      <Articles />
      
    </div>
  );
}
