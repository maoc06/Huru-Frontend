import CardSelectable from '../../modules/CardSelectable/CardSelectable';
import styles from './CardSelectableLayout.module.scss';

export default function CardSelectableLayout({
  list,
  propKey,
  propValue,
  propSelect,
  onSelect,
  withIconEnum = false,
  iconEnum,
  selectedItems = [],
}) {
  const handleSelect = (item) => {
    const selectedValue = item[propSelect];
    let newSelectedItems;

    if (selectedItems.includes(selectedValue)) {
      newSelectedItems = selectedItems.filter((id) => id !== selectedValue);
    } else {
      newSelectedItems = [...selectedItems, selectedValue];
    }
    onSelect(newSelectedItems);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {list.map((item) => {
          const isSelected = selectedItems.includes(item[propSelect]);
          return (
            <div key={item[propKey]} className={styles.gridItem}>
                <CardSelectable
                item={item}
                propKey={propKey}
                propValue={propValue}
                onSelect={() => handleSelect(item)}
                isSelected={isSelected}
                icon={withIconEnum ? iconEnum[item[propValue]] : null}
                />
            </div>
          );
        })}
      </div>
    </div>
  );
}
