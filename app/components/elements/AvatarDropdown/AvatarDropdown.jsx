import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Avatar from '../Avatar/Avatar';
import useMood from '../../../hooks/useMood';
import styles from './AvatarDropdown.module.scss';

// Icons for menu items
const UserIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const ExploreIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const CarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M3 4a1 1 0 000 2h.826l2.48 9.928A1 1 0 007.242 17H15a1 1 0 100-2H7.242l-.31-1.243h7.073a1 1 0 00.97-.757L16.22 7H5.654L5.22 5.243A1 1 0 004.242 4H3z" />
  </svg>
);

const TripIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

const ChartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const LoginIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const SignupIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
  </svg>
);

const AvatarDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const [touchStarted, setTouchStarted] = useState(false);
  const app = useMood();
  const router = useRouter();

  // Close dropdown when clicking/touching outside
  useEffect(() => {
    const handleOutsideEvent = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleClose();
      }
    };

    // Add delay to prevent immediate closing after opening
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleOutsideEvent);
      document.addEventListener('touchstart', handleOutsideEvent);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleOutsideEvent);
      document.removeEventListener('touchstart', handleOutsideEvent);
    };
  }, [isOpen]);

  // Close dropdown on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  const handleClose = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 200); // Match the CSS animation duration
    }
  };

  const toggleDropdown = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  const handleAvatarClick = (event) => {
    // Prevent click if touch already handled it
    if (touchStarted) {
      event.preventDefault();
      setTouchStarted(false);
      return;
    }
    toggleDropdown();
  };

  const handleAvatarTouch = (event) => {
    event.preventDefault();
    setTouchStarted(true);
    toggleDropdown();
    
    // Reset touch flag after a short delay
    setTimeout(() => {
      setTouchStarted(false);
    }, 300);
  };

  const handleMenuItemClick = (action) => {
    handleClose();
    
    // Add a small delay to let the animation complete
    setTimeout(() => {
      if (user) {
        if (app.getMood()) {
          // Host mode
          switch (action) {
            case 'performance':
              router.push('/host/performance');
              break;
            case 'calendar':
              router.push('/host/calendar');
              break;
            case 'vehicles':
              router.push('/host/vehicles');
              break;
            case 'profile':
              router.push('/profile');
              break;
            default:
              break;
          }
        } else {
          // Guest mode
          switch (action) {
            case 'explore':
              router.push('/');
              break;
            case 'trips':
              router.push('/trips');
              break;
            case 'profile':
              router.push('/profile');
              break;
            case 'favorites':
              router.push('/favorites');
              break;
            default:
              break;
          }
        }
      } else {
        // Not logged in
        switch (action) {
          case 'signin':
            router.push('/signin');
            break;
          case 'signup':
            router.push('/signup');
            break;
          default:
            break;
        }
      }
    }, 100);
  };

  const getMenuItems = () => {
    if (user) {
      if (app.getMood()) {
        return [
          { action: 'performance', label: 'Desempeño', icon: ChartIcon },
          { action: 'calendar', label: 'Calendario', icon: CalendarIcon },
          { action: 'vehicles', label: 'Vehículos', icon: CarIcon },
          { action: 'profile', label: 'Perfil', icon: UserIcon },
        ];
      } else {
        return [
          { action: 'explore', label: 'Explorar', icon: ExploreIcon },
          { action: 'trips', label: 'Viajes', icon: TripIcon },
          { action: 'profile', label: 'Perfil', icon: UserIcon },
          { action: 'favorites', label: 'Favoritos', icon: HeartIcon },
        ];
      }
    } else {
      return [
        { action: 'signin', label: 'Iniciar sesión', icon: LoginIcon },
        { action: 'signup', label: 'Registrarse', icon: SignupIcon },
      ];
    }
  };

  return (
    <div className={styles.avatarDropdown} ref={dropdownRef}>
      <div 
        className={`${styles.avatarButton} ${isOpen ? styles.active : ''}`}
        onClick={handleAvatarClick}
        onTouchStart={handleAvatarTouch}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <Avatar 
          src={user?.profilePicture} 
          size="large"
          cursorPointer={true}
        />
        <div className={styles.avatarIndicator}>
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <>
          <div 
            className={`${styles.backdrop} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}
            onClick={handleClose}
            onTouchStart={(e) => {
              e.preventDefault();
              handleClose();
            }}
          />
          <div className={`${styles.dropdownMenu} ${isAnimating ? styles.slideOut : styles.slideIn}`}>
            {user && (
              <div className={styles.userInfo}>
                <Avatar 
                  src={user.profilePicture} 
                  size="medium"
                />
                <div className={styles.userDetails}>
                  <span className={styles.userName}>
                    {user.firstName} {user.lastName}
                  </span>
                  <span className={styles.userEmail}>
                    {user.email}
                  </span>
                </div>
              </div>
            )}
            
            <div className={styles.menuItems}>
              {getMenuItems().map((item, index) => (
                <button
                  key={item.action}
                  className={styles.menuItem}
                  onClick={() => handleMenuItemClick(item.action)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <item.icon className={styles.menuIcon} />
                  <span className={styles.menuLabel}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarDropdown; 