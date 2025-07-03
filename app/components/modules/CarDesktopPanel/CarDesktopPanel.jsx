import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { DateTime } from 'luxon';
import { diffDays } from '../../../utils/formatDates';
import useTravelDates from '../../../hooks/useTravelDates';

import Button from '../../elements/Button/Button';
import DatesPanel from '../DatesPanel/DatesPanel';
import PaymentDetails from '../PaymentDetails/PaymentDetails';
import styles from './CarDesktopPanel.module.scss';

function CarDesktopPanel({
  slug,
  pricePerDay,
  countDays = 2,
  disableBooking,
  disabledMessage,
  withDiscount = false,
  discountPerDay = 0,
  disabledDates = [],
}) {
  const serviceFeePercentage = 0.17;
  const router = useRouter();
  const travel = useTravelDates();
  const panelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [stickyPosition, setStickyPosition] = useState({ top: 0, right: 0 });
  const [originalPosition, setOriginalPosition] = useState(null);
  const [days, setDays] = useState(countDays);

  // Calculate original position on mount
  useEffect(() => {
    const calculateOriginalPosition = () => {
      if (!panelRef.current) return;

      const panel = panelRef.current;
      const rect = panel.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      // Store the original top position relative to the document
      setOriginalPosition({
        top: rect.top + scrollY,
        right: rect.right
      });
    };

    // Calculate original position after component mounts and DOM is ready
    const timer = setTimeout(calculateOriginalPosition, 200);
    
    return () => clearTimeout(timer);
  }, []); // Run only once on mount

  // Sticky scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!panelRef.current || !originalPosition) return;

      // Only apply sticky behavior on desktop and tablet (md and up)
      const isDesktopOrTablet = window.innerWidth >= 768;
      if (!isDesktopOrTablet) {
        setIsSticky(false);
        return;
      }

      const currentScrollY = window.scrollY;
      
      // Get navbar height based on screen size
      const navbarHeight = window.innerWidth >= 768 ? 72 : 64;
      const stickyTopPosition = navbarHeight + 16; // 16px margin below navbar
      
      // Calculate right position for sticky state
      const containerMaxWidth = 1200;
      const panelWidth = 400;
      const containerPadding = 64; // 4rem on each side
      const viewportWidth = window.innerWidth;
      
      let rightPosition;
      if (viewportWidth > containerMaxWidth + containerPadding) {
        // Centered layout - position panel at the right edge of the centered container
        const containerLeft = (viewportWidth - containerMaxWidth) / 2;
        rightPosition = containerLeft + containerPadding / 2; // Half of the container padding
      } else {
        // Full width layout - position panel with standard margin from right edge
        rightPosition = 32; // 2rem margin from right edge
      }
      
      // Calculate when panel should be sticky vs original position
      // Panel should be sticky when it would naturally be above the navbar bottom
      const panelNaturalTop = originalPosition.top - currentScrollY;
      const shouldBeSticky = panelNaturalTop <= stickyTopPosition;
      
      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
        setStickyPosition({
          top: stickyTopPosition,
          right: rightPosition
        });
      }
    };

    // Handle resize to recalculate positions
    const handleResize = () => {
      // Reset original position on resize
      setOriginalPosition(null);
      setIsSticky(false);
      
      // Recalculate original position after resize
      setTimeout(() => {
        if (panelRef.current) {
          const panel = panelRef.current;
          const rect = panel.getBoundingClientRect();
          const scrollY = window.scrollY;
          
          setOriginalPosition({
            top: rect.top + scrollY,
            right: rect.right
          });
        }
      }, 100);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSticky, originalPosition]); // Include originalPosition in dependencies

  const calcDays = () => {
    const dates = travel.getDates();
    let type = 'SQL';
    if (dates.raw.start.includes('T')) type = 'ISO';

    const diff = diffDays({
      dateOne: dates.raw.start,
      dateTwo: dates.raw.end,
      type,
    });

    setDays(diff);
  };

  useEffect(() => {
    calcDays();
  }, [travel]);

  const handleContinue = () => {
    router.push(`/car/confirmation/${encodeURIComponent(slug)}`);
  };

  const displayPrice = withDiscount ? pricePerDay - discountPerDay : pricePerDay;

  return (
    <aside 
      ref={panelRef}
      className={`${styles.panel} ${isSticky ? styles.sticky : ''}`}
      style={isSticky ? { 
        position: 'fixed', 
        top: `${stickyPosition.top}px`,
        right: `${stickyPosition.right}px`,
        width: '400px',
        zIndex: 1000
      } : {}}
    >
      {withDiscount && (
        <p className={styles.msgDiscount}>
          Descuento para vehículos amigables con medio ambiente.
        </p>
      )}

      <div className={`${withDiscount && styles.contentPrice}`}>
        {withDiscount && (
          <p className={`${styles.price} ${styles.discount}`}>
            ${Number(discountPerDay).toLocaleString('en')}
            <span>/día</span>
          </p>
        )}
        <p className={`${styles.price} ${withDiscount && styles.old}`}>
          ${Number(displayPrice).toLocaleString('en')}
          {!withDiscount && <span>/día</span>}
        </p>
      </div>

      <DatesPanel compact={true} disabledDates={disabledDates} />

      <PaymentDetails
        showTitle={false}
        pricePerDay={pricePerDay}
        numberOfDays={days ? days : 2}
        serviceFeePercentage={serviceFeePercentage}
        withMargin={true}
        discountPerDay={discountPerDay}
        withDiscount={withDiscount}
      />

      <div className={styles.button}>
        <Button
          marginTop={true}
          onClick={handleContinue}
          isDisabled={disableBooking}
          disabledMessage={disabledMessage}
        >
          Continuar
        </Button>
      </div>
    </aside>
  );
}

export default CarDesktopPanel;
