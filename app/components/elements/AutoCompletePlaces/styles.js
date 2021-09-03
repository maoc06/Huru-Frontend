const styles = ({ isCompact, isMobile }) => {
  return {
    container: (provided) => ({
      ...provided,
      zIndex: 999,
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderWidth: isCompact ? 0 : 1,
      borderColor: state.isFocused ? '#070d9a' : '#828282',
      boxShadow: 'none',
      minHeight: isCompact ? 40 : 55,
      maxHeight: isCompact ? 40 : 55,
      minWidth: isMobile ? 200 : 300,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };
};

export { styles };
