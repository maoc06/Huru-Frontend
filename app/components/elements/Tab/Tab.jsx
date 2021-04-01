import styles from './Tab.module.scss';

const AppTab = ({ index, onSelectTab, text, isActive }) => {
  const handleSelectTab = () => {
    onSelectTab(index);
  };

  return (
    <div
      className={`${styles.tab} ${isActive && styles.active}`}
      onClick={handleSelectTab}
    >
      <p>{text}</p>
    </div>
  );
};

export default AppTab;
