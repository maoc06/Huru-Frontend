import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetVehicleRegister } from '../../redux/slices/vehicleRegisterSlice'
import styles from './AddVehicleCard.module.scss'

// Plus Icon component
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4c.55 0 1 .45 1 1v6h6c.55 0 1 .45 1 1s-.45 1-1 1h-6v6c0 .55-.45 1-1 1s-1-.45-1-1v-6H5c-.55 0-1-.45-1-1s.45-1 1-1h6V5c0-.55.45-1 1-1z"/>
  </svg>
)

// Car Icon component
const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
  </svg>
)

export default function AddVehicleCard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      // Reset the vehicle registration form and step
      dispatch(resetVehicleRegister())
      
      // Clear any potential localStorage related to vehicle registration
      if (typeof window !== 'undefined') {
        // Clear any temporary vehicle data that might be stored
        localStorage.removeItem('vehicleFormData')
        localStorage.removeItem('vehiclePhotos')
        localStorage.removeItem('vehicleCurrentStep')
      }
      
      // Navigate to add-vehicle page
      await router.push('/add-vehicle')
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button 
      className={`${styles.card} ${isLoading ? styles.loading : ''}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Agregar nuevo vehículo"
      type="button"
    >
      <div className={styles.action}>
        <div className={styles.iconContainer}>
          <PlusIcon />
        </div>
        <div className={styles.textContent}>
          <h6>Agregar Vehículo</h6>
          <p className={styles.subtitle}>
            <span className={styles.mobileText}>Toca para agregar tu vehículo</span>
            <span className={styles.desktopText}>Haz clic para agregar un nuevo vehículo y empezar a ganar</span>
          </p>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className={styles.backgroundDecoration}>
        <CarIcon />
      </div>
    </button>
  )
}
