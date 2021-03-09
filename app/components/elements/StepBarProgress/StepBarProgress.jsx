import styles from './StepBarProgress.module.scss';

export default function StepBarProgress({ numOfSteps, currStep }) {
  if (currStep === 1) return null;
  const calcWidth = ((currStep - 1) * 100) / (numOfSteps - 1);
  return (
    <div className={styles.wrap}>
      <div className={styles.bar} style={{ width: `${calcWidth}%` }} />
    </div>
  );
}
