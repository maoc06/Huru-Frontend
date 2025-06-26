import dynamic from 'next/dynamic';
import animationData from '../../../../public/animations/scroll.json';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function ScrollDown({ visible = true }) {
  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!visible) return null;
  return <Lottie options={defaultOptions} height={50} width={50} />;
}
