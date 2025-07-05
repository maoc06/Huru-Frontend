import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';

import Avatar from '../../elements/Avatar/Avatar';
import Button from '../../elements/Button/Button';
import { LogoColor } from '../../elements/Icons/Shared';
import SearchForm from '../../modules/SearchForm/SearchForm';
import AvatarDropdown from '../../elements/AvatarDropdown/AvatarDropdown';
import storageAuth from '../../../utils/storageAuth';
import SearchApi from '../../../api/SearchApi';
import UserAPI from '../../../api/UserAPI';
import styles from './HomeTemplate.module.scss';

// Modern Icons Components
const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ShieldIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const HomeTemplate = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const videoRef = useRef(null);
  const [popularCars, setPopularCars] = useState([]);
  const [testimonialUsers, setTestimonialUsers] = useState([]);

  const handleCallToAction = () => {
    if (user) router.push('/add-vehicle');
    else router.push('/signup');
  };

  useEffect(() => {
    const resUser = storageAuth.getUser();
    if (resUser) setUser(resUser.info);
  }, []);

  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        const checkIn = DateTime.now().plus({ days: 1 }).toISO();
        const checkOut = DateTime.now().plus({ days: 3 }).toISO();
        
        const response = await SearchApi.findCarsByCity("Bogota", checkIn, checkOut);

        const carsData = response.data.data;
        if (Array.isArray(carsData) && carsData.length > 0) {
          const cars = carsData.slice(0, 3);
          setPopularCars(cars);
        } else if (typeof carsData === 'object' && carsData !== null && Object.keys(carsData).length === 0) {
          // Try different city names
          const cities = ['bogota', 'medellin', 'cali', 'cartagena'];
          for (const city of cities) {
            try {
              const cityResponse = await SearchApi.findCarsByCity(city, checkIn, checkOut);
              
              if (Array.isArray(cityResponse.data.data) && cityResponse.data.data.length > 0) {
                const cars = cityResponse.data.data.slice(0, 3);
                setPopularCars(cars);
                break;
              }
            } catch (cityError) {
              console.log(`❌ Error with city ${city}:`, cityError);
            }
          }
        } else {
          console.error("❌ Unexpected data format:", carsData);
        }
      } catch (error) {
        console.error("❌ Error fetching popular cars:", error);
      }
    };

    fetchPopularCars();
  }, []);

  useEffect(() => {
    const fetchTestimonialUsers = async () => {
      try {
        console.log('👥 === USER PROFILE DEBUGGING ===');
        
        // Real user IDs from the database
        const userIds = [
          '29876497-7371-4a3f-8086-b4b31aede8d4',
          '1c17bd85-a943-49e3-9344-50d888886c6f',
          '2e9cb961-b365-4a59-abfe-839234d7e9ec'
        ];
        
        console.log('🔍 Fetching users with real IDs:', userIds);
        
        const userPromises = userIds.map(async (id) => {
          console.log(`📡 Fetching user with ID: ${id}`);
          try {
            const response = await UserAPI.findUser(id);
            console.log(`✅ Response for user ${id}:`, response);
            return response;
          } catch (userError) {
            console.log(`❌ Error fetching user ${id}:`, userError.response?.status, userError.response?.data);
            return null;
          }
        });
        
        const usersData = await Promise.all(userPromises);
        console.log('📊 All user responses:', usersData);
        
        const validUsers = usersData
          .filter(response => response && response.data && response.data.data)
          .map(response => response.data.data);
        
        console.log('✅ Valid users found:', validUsers);
        
        if (validUsers.length > 0) {
          console.log('🎉 Using valid users for testimonials');
          validUsers.forEach((user, index) => {
            console.log(`👤 User ${index + 1}:`, {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              profilePhoto: user.profilePhoto,
              city: user.city
            });
          });
          setTestimonialUsers(validUsers);
        } else {
          console.log('⚠️ No valid users found, using fallback data');
        }
        
      } catch (error) {
        console.error('❌ Critical error fetching testimonial users:', error);
      }
    };

    fetchTestimonialUsers();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loopStartTime = 2; // Change the start time here (in seconds)
    const loopEndTime = 11;  // Change the end time here (in seconds)

    const handleTimeUpdate = () => {
      if (video.currentTime >= loopEndTime) {
        video.currentTime = loopStartTime;
        video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    // Set initial time
    video.onloadedmetadata = () => {
      video.currentTime = loopStartTime;
    };

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className={styles.landingPage}>
      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <div
            onClick={() => router.push('/')}
            className={styles.logo}
          >
            <LogoColor />
          </div>

          <div className={styles.navLinks}>
            <button onClick={() => router.push('/search/bogota')}>Explorar carros</button>
            <button onClick={() => router.push('/add-vehicle')}>Comparte tu carro</button>
            {!user && (
              <button onClick={() => router.push('/signin')}>Iniciar sesión</button>
            )}
          </div>

          <AvatarDropdown user={user} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroVideoBackground}>
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className={styles.heroVideo}
          >
            <source src="/video/hero-video.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroVideoOverlay}></div>
        </div>
        
        <div className={styles.heroContainer}>
          <motion.div 
            className={styles.heroContent}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className={styles.heroTitle} variants={itemVariants}>
              Muévete a tu <span className={styles.highlight}>manera</span>
            </motion.h1>
            <motion.p className={styles.heroSubtitle} variants={itemVariants}>
              Renta un carro para tu próxima aventura o gana dinero extra compartiendo el tuyo.
            </motion.p>
            
            <motion.div className={styles.heroStats} variants={itemVariants}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Usuarios activos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Carros disponibles</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4.8★</span>
                <span className={styles.statLabel}>Calificación promedio</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SearchForm startDateBorder={true} />
            </motion.div>

            <div className={styles.heroTrust}>
              <p>Confiado por miles de usuarios en Colombia</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>¿Cómo funciona?</h2>
            <p>Renta un carro en 3 simples pasos</p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepImageContainer}>
                <Image
                  src="/images/home-image-1.jpeg"
                  alt="Busca y elige tu carro"
                  layout="fill"
                  objectFit="cover"
                  className={styles.stepImage}
                />
              </div>
              <div className={styles.stepContent}>
                <h3>Busca y elige</h3>
                <p>Encuentra el carro perfecto cerca de ti. Filtra por precio, tipo de vehículo y características.</p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepImageContainer}>
                <Image
                  src="/images/home-image-2.jpeg"
                  alt="Reserva instantánea"
                  layout="fill"
                  objectFit="cover"
                  className={styles.stepImage}
                />
              </div>
              <div className={styles.stepContent}>
                <h3>Reserva instantánea</h3>
                <p>Reserva al instante o solicita aprobación. Pago seguro con protección total incluida.</p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepImageContainer}>
                <Image
                  src="/images/home-image-3.jpeg"
                  alt="Disfruta tu viaje"
                  layout="fill"
                  objectFit="cover"
                  className={styles.stepImage}
                />
              </div>
              <div className={styles.stepContent}>
                <h3>Disfruta tu viaje</h3>
                <p>Recoge el carro y vive tu aventura. Devolución fácil y califica tu experiencia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Renters and Hosts */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitHeader}>
                <h3>Para viajeros</h3>
                <p>Encuentra el carro ideal para cada ocasión</p>
              </div>
              <ul className={styles.benefitList}>
                <li>
                  <CheckIcon className={styles.checkIcon} />
                  <span>Carros desde $50,000 COP por día</span>
                </li>
                <li>
                  <CheckIcon className={styles.checkIcon} />
                  <span>Disponibles 24/7 cerca de ti</span>
                </li>
                <li>
                  <CheckIcon className={styles.checkIcon} />
                  <span>Seguro completo incluido</span>
                </li>
                <li>
                  <CheckIcon className={styles.checkIcon} />
                  <span>Asistencia en carretera</span>
                </li>
              </ul>
              <Button onClick={() => router.push('/search/bogota')}>
                Explorar carros
              </Button>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitHeader}>
                <h3>Para propietarios</h3>
                <p>Genera ingresos extra con tu carro</p>
              </div>
              <ul className={styles.benefitList}>
                <li>
                  <CheckIcon className={styles.checkIcon} />
                  <span>Gana hasta $2,000,000 COP al mes</span>
                </li>
                <li>
                  <CheckIcon className={styles.checkIcon} />
                  <span>Protección total de tu vehículo</span>
                </li>
                <li>
                  <CheckIcon className={styles.checkIcon} />
                  <span>Tú decides cuándo compartir</span>
                </li>
                <li>
                  <CheckIcon className={styles.checkIcon} />
                  <span>Soporte 24/7</span>
                </li>
              </ul>
              <Button onClick={handleCallToAction}>
                Comparte tu carro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className={styles.featuredCars}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Carros populares</h2>
            <p>Los vehículos más reservados en tu ciudad</p>
          </div>

          <div className={styles.carsGrid}>
            {popularCars.map((car) => (
              <a 
                key={car.car_id} 
                href={`/car/${car.car_id}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.carCard}
              >
                <div className={styles.carImage}>
                  <Image
                    src={car.image || "/images/car-sedan.png"}
                    alt={`${car.name} ${car.model} ${car.year}`}
                    layout="fill"
                    objectFit="cover"
                    className={styles.stepImage}
                  />
                </div>
                <div className={styles.carInfo}>
                  <h4>{`${car.name} ${car.model} ${car.year}`}</h4>
                  <div className={styles.carRating}>
                    <StarIcon className={styles.starIcon} />
                    {/* Placeholder for rating and trips */}
                    <span>{`${car.rating?.total || 4.5} (${car.totalBookings || Math.floor(Math.random() * 100) + 20} viajes)`}</span>
                  </div>
                  <p className={styles.carPrice}>{`Desde $${car.price?.toLocaleString('es-CO') || 'N/A'}/día`}</p>
                </div>
              </a>
            ))}
          </div>

          <div className={styles.sectionCta}>
            <Button onClick={() => router.push('/search/bogota')}>
              Ver todos los carros
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className={styles.socialProof}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Lo que dicen nuestros usuarios</h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonialUsers.length > 0 ? (
              testimonialUsers.map((user, index) => (
                <div key={user.id || index} className={styles.testimonial}>
                  <div className={styles.testimonialRating}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={styles.starIcon} />
                    ))}
                  </div>
                  <p>
                    {index === 0 && "Increíble experiencia. El carro estaba impecable y el proceso súper fácil. Definitivamente volveré a usar Huru."}
                    {index === 1 && "Genero ingresos extras compartiendo mi carro cuando no lo uso. La plataforma es muy confiable y segura."}
                    {index === 2 && "Perfecto para viajes de fin de semana. Gran variedad de carros y precios muy competitivos."}
                  </p>
                  <div className={styles.testimonialAuthor}>
                    <Image
                      src={user.profilePhoto || "/images/default-profile-picture.jpg"}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={48}
                      height={48}
                    />
                    <div>
                      <span className={styles.authorName}>{`${user.firstName} ${user.lastName}`}</span>
                      <span className={styles.authorLocation}>{user.city || "Colombia"}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback to original hardcoded testimonials
              <>
                <div className={styles.testimonial}>
                  <div className={styles.testimonialRating}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={styles.starIcon} />
                    ))}
                  </div>
                  <p>"Increíble experiencia. El carro estaba impecable y el proceso súper fácil. Definitivamente volveré a usar Huru."</p>
                  <div className={styles.testimonialAuthor}>
                    <Image
                      src="/images/default-profile-picture.jpg"
                      alt="María González"
                      width={48}
                      height={48}
                    />
                    <div>
                      <span className={styles.authorName}>María González</span>
                      <span className={styles.authorLocation}>Bogotá</span>
                    </div>
                  </div>
                </div>

                <div className={styles.testimonial}>
                  <div className={styles.testimonialRating}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={styles.starIcon} />
                    ))}
                  </div>
                  <p>"Genero ingresos extras compartiendo mi carro cuando no lo uso. La plataforma es muy confiable y segura."</p>
                  <div className={styles.testimonialAuthor}>
                    <Image
                      src="/images/default-profile-picture.jpg"
                      alt="Carlos Mendoza"
                      width={48}
                      height={48}
                    />
                    <div>
                      <span className={styles.authorName}>Carlos Mendoza</span>
                      <span className={styles.authorLocation}>Medellín</span>
                    </div>
                  </div>
                </div>

                <div className={styles.testimonial}>
                  <div className={styles.testimonialRating}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={styles.starIcon} />
                    ))}
                  </div>
                  <p>"Perfecto para viajes de fin de semana. Gran variedad de carros y precios muy competitivos."</p>
                  <div className={styles.testimonialAuthor}>
                    <Image
                      src="/images/default-profile-picture.jpg"
                      alt="Ana Rodríguez"
                      width={48}
                      height={48}
                    />
                    <div>
                      <span className={styles.authorName}>Ana Rodríguez</span>
                      <span className={styles.authorLocation}>Cali</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className={styles.safety}>
        <div className={styles.container}>
          <div className={styles.safetyContent}>
            <div className={styles.safetyText}>
              <h2>Tu seguridad es nuestra prioridad</h2>
              <p>Viaja con tranquilidad sabiendo que estás protegido en cada kilómetro.</p>
              
              <div className={styles.safetyFeatures}>
                <div className={styles.safetyFeature}>
                  <ShieldIcon className={styles.safetyIcon} />
                  <div>
                    <h4>Seguro completo</h4>
                    <p>Cobertura total contra daños, robo y responsabilidad civil</p>
                  </div>
                </div>
                <div className={styles.safetyFeature}>
                  <CheckIcon className={styles.safetyIcon} />
                  <div>
                    <h4>Verificación de usuarios</h4>
                    <p>Todos los usuarios pasan por verificación de identidad</p>
                  </div>
                </div>
                <div className={styles.safetyFeature}>
                  <ShieldIcon className={styles.safetyIcon} />
                  <div>
                    <h4>Asistencia 24/7</h4>
                    <p>Soporte en carretera disponible las 24 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.safetyImageContainer}>
          <Image
            src="/images/home-insurance.jpeg"
            alt="Seguridad Huru"
            layout="fill"
            objectFit="cover"
            className={styles.safetyImage}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>¿Listo para tu próxima aventura?</h2>
            <p>Únete a miles de usuarios que ya disfrutan de la libertad de moverse como quieren.</p>
            
            <div className={styles.ctaButtons}>
              <Button 
                onClick={() => router.push('/search/bogota')}
                className={styles.primaryCta}
              >
                Rentar un carro
              </Button>
              <Button 
                onClick={handleCallToAction}
                isWhite={true}
                className={styles.secondaryCta}
              >
                Comparte tu carro
              </Button>
            </div>

            <div className={styles.ctaStats}>
              <span>✓ Registro gratuito</span>
              <span>✓ Sin costos ocultos</span>
              <span>✓ Cancelación flexible</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeTemplate;
