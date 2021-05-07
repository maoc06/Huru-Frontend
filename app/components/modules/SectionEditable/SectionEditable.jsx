import { useEffect, useRef, useState } from 'react';

import SubmitEditFieldButton from '../../elements/Button/SubmitEditFieldButton';
import SectionTitle from '../../elements/SectionTitle/SectionTitle';
import TextArea from '../../elements/TextArea/TextArea';
import Textfield from '../../elements/Textfield/Textfield';
import Form from '../Forms/Form';
import PhoneFiled from '../../elements/PhoneField/PhoneField';
import RadioGroup from '../RadioGroup/RadioGroup';
import Modal from '../Modal/Modal';
import ShowMoreText from '../../elements/ShowMoreText/ShowMoreText';

import styles from './SectionEditable.module.scss';
import { WarningIcon } from '../../elements/Icons/Shared';

const SectionEditable = ({
  title = '',
  type = 'textarea',
  name = 'name',
  onSave = () => {},
  values = {},
  schema = {},
  options = [],
  showInfoTip = false,
  toolTip = '',
  isLink = false,
  href = '',
  isEditable = true,
  countryCode,
  onSelectPhoneCountry,
}) => {
  const node = useRef();
  const [editable, setEditable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [radioOption, setRadioOption] = useState({});
  const [changePrice, setChangePrice] = useState(0);
  const [textArea, setTextArea] = useState('');

  useEffect(() => {
    if (editable) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editable]);

  const handleClickOutside = (event) => {
    if (node.current.contains(event.target)) {
      // inside click
      return;
    }
    // outside click
    setModalOpen(true);
  };

  const handleConfirmModal = () => {
    let updateData = {};

    switch (type) {
      case 'textarea':
        updateData = { [name]: textArea };
        break;
      case 'price':
        updateData = { [name]: changePrice };
        break;
      case 'options':
        updateData = { [name]: radioOption };
        break;
      default:
        break;
    }
    onSave(updateData);
  };

  const handleRejectModal = () => {
    setModalOpen(false);
    setEditable(false);
  };

  const handleEdit = () => {
    setEditable(!editable);
  };

  const textAreaComponent = () => {
    if (!editable) {
      return (
        <ShowMoreText>
          <p>{values[name]}</p>
        </ShowMoreText>
      );
    }

    return (
      <TextArea
        disabled={!editable}
        maxLength={1000}
        rowsMin={3}
        rowsMax={6}
        name={name}
        onChangeAux={(text) => setTextArea(text)}
      />
    );
  };

  const optionsComponent = () => {
    if (!editable) {
      return <p>{values[name]}</p>;
    }

    return (
      <RadioGroup
        name={name}
        list={options}
        defaultSelected={values[name]}
        onChangeAux={(selected) => {
          setRadioOption(selected);
        }}
      />
    );
  };

  const priceComponent = () => {
    if (!editable) {
      return <p>{`$${Number(values[name]).toLocaleString('en')} COP x día`}</p>;
    }

    return (
      <Textfield
        name={name}
        placeholder="¿Cúal sera el precio por día de tu carro?"
        withLabel={false}
        type="tel"
        isTypePrice={true}
        step="any"
        onChangePriceAux={(price) => setChangePrice(price)}
      />
    );
  };

  const phonefieldComponent = () => {
    const formatPhone = values[name].slice(0, 3) + '-' + values[name].slice(3);

    if (!editable) {
      return (
        <p>
          <span>{`${countryCode} `}</span>
          {formatPhone}
        </p>
      );
    }

    return (
      <PhoneFiled
        name="phone"
        placeholder="¿Cúal es tu numero de teléfono?"
        label="Teléfono"
        countryCode={countryCode}
        setCountryCode={onSelectPhoneCountry}
        showLabel={false}
        initialCode={countryCode.replace(/\D/g, '')}
        initialPhone={formatPhone}
      />
    );
  };

  const textfieldComponent = () => {
    if (!editable) {
      return <p>{values[name]}</p>;
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'textarea':
        return textAreaComponent();
      case 'options':
        return optionsComponent();
      case 'price':
        return priceComponent();
      case 'phone':
        return phonefieldComponent();
      default:
        return textfieldComponent();
    }
  };

  return (
    <>
      <Modal
        title="¿Desea guardar los cambios?"
        content="Se perderán los cambios si no guardas antes de continuar"
        confirmButtonIsSecondary={false}
        confirmText="Guardar"
        rejectText="Descartar"
        icon={<WarningIcon />}
        visible={modalOpen}
        onConfirm={handleConfirmModal}
        onReject={handleRejectModal}
        onCloseModal={handleRejectModal}
      />

      <section ref={node}>
        <Form
          initialValues={values}
          onSubmit={onSave}
          validationSchema={schema}
        >
          <div className={styles.editable}>
            <SectionTitle
              title={title}
              showInfoTip={showInfoTip}
              toolTip={toolTip}
            />

            {isEditable && (
              <SubmitEditFieldButton
                editable={editable}
                onEdit={handleEdit}
                isLink={isLink}
                href={href}
              />
            )}
          </div>

          {!isLink && renderForm()}
        </Form>
      </section>
    </>
  );
};

export default SectionEditable;
