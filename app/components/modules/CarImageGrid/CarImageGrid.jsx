import { useState } from 'react';
import Image from 'next/image';
import PhotoGalleryModal from '../PhotoGalleryModal/PhotoGalleryModal';
import styles from './CarImageGrid.module.scss';

const CarImageGrid = ({ images = [], onViewAllPhotos }) => {
  const [imagesSrc, setImagesSrc] = useState([
    {
      carImageId: 'default-car-image',
      imagePath: '/images/default-car.png',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);

  // Use provided images or default
  const displayImages = images.length > 0 ? images : imagesSrc;
  const totalPhotos = displayImages.length;

  // Get main image (first image)
  const mainImage = displayImages[0];
  
  // Get up to 2 additional images for the right column
  const rightImages = displayImages.slice(1, 3);

  const handleViewAllPhotos = () => {
    setModalInitialIndex(0);
    setIsModalOpen(true);
    
    // Call the optional callback
    if (onViewAllPhotos) {
      onViewAllPhotos(displayImages);
    }
  };

  const handleImageClick = (index) => {
    setModalInitialIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Main large image on the left */}
        <div className={styles.mainImage} onClick={() => handleImageClick(0)}>
          <Image
            src={mainImage.imagePath}
            alt="Main car image"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
          
          {/* Heart icon for favorites */}
          <button className={styles.favoriteButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 8.5C21 5.5 18.5 3 15.5 3C13.3 3 11.4 4.4 10.5 6.3C9.6 4.4 7.7 3 5.5 3C2.5 3 0 5.5 0 8.5C0 12.3 10.5 21 10.5 21S21 12.3 21 8.5Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </button>
        </div>

        {/* Column of 2 images on the right */}
        <div className={styles.imageColumn}>
          {rightImages.map((image, index) => (
            <div 
              key={image.carImageId || index} 
              className={`${styles.columnItem} ${index === 1 ? styles.lastItem : ''}`}
              onClick={() => handleImageClick(index + 1)}
            >
              <Image
                src={image.imagePath}
                alt={`Car image ${index + 2}`}
                layout="fill"
                objectFit="cover"
                className={styles.image}
              />
              
              {/* View photos button on the bottom image (index 1) */}
              {index === 1 && totalPhotos > 3 && (
                <div className={styles.viewPhotosOverlay} onClick={(e) => {
                  e.stopPropagation();
                  handleViewAllPhotos();
                }}>
                  <div className={styles.viewPhotosButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4H8V8H4V4ZM10 4H14V8H10V4ZM16 4H20V8H16V4ZM4 10H8V14H4V10ZM10 10H14V14H10V10ZM16 10H20V14H16V10ZM4 16H8V20H4V16ZM10 16H14V20H10V16ZM16 16H20V20H16V16Z"
                        fill="white"
                      />
                    </svg>
                    <span>View {totalPhotos} photos</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Fill empty slots if less than 2 images in right column */}
          {rightImages.length < 2 && Array.from({ length: 2 - rightImages.length }).map((_, index) => (
            <div key={`empty-${index}`} className={styles.columnItem}>
              <div className={styles.emptySlot}>
                <span>No image</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        images={displayImages}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialIndex={modalInitialIndex}
      />
    </>
  );
};

export default CarImageGrid; 