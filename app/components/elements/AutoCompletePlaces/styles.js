const styles = ({ isCompact, isMobile, noBorder = false }) => {
  return {
    container: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderWidth: noBorder ? 0 : (isCompact ? 0 : 2),
      borderColor: noBorder ? 'transparent' : (state.isFocused ? '#081D3D' : '#e0e0e0'),
      borderRadius: isCompact ? 8 : 20,
      boxShadow: noBorder ? 'none' : (state.isFocused 
        ? '0 0 0 3px rgba(8, 29, 61, 0.1)'
        : 'none'),
      minHeight: isCompact ? 40 : 55,
      maxHeight: isCompact ? 40 : 55,
      minWidth: isMobile ? 200 : 300,
      transition: 'all 0.25s ease-in-out',
      '&:hover': {
        borderColor: noBorder ? 'transparent' : (state.isFocused ? '#081D3D' : '#bdbdbd'),
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#828282',
      fontWeight: 400,
    }),
    input: (provided) => ({
      ...provided,
      color: '#282828',
      fontWeight: 400,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#282828',
      fontWeight: 400,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: 16,
      border: '2px solid #e0e0e0',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#081D3D' 
        : state.isFocused 
          ? '#f9fafb' 
          : 'white',
      color: state.isSelected ? 'white' : '#282828',
      padding: '12px 16px',
      fontWeight: 400,
      '&:active': {
        backgroundColor: '#081D3D',
        color: 'white',
      },
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };
};

export { styles };
