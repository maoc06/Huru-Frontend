import React from 'react';
import { render, screen, fireEvent, act } from '../test-utils';
import formatPrice from '../app/utils/formatPrice';

import Intro from '../app/components/modules/AddVehicle/Intro/Intro';
import IdentifyVIN from '../app/components/modules/AddVehicle/IdentifyVIN/IdentifyVIN';
import IdentifyVehicle from '../app/components/modules/AddVehicle/IdentifyVehicle/IdentifyVehicle';
import SelectFeatures from '../app/components/modules/AddVehicle/SelectFeatures/SelectFeatures';
import SelectFuel from '../app/components/modules/AddVehicle/SelectFuel/SelectFuel';
import Description from '../app/components/modules/AddVehicle/Description/Description';
import SelectCity from '../app/components/modules/AddVehicle/SelectCity/SelectCity';
import LicensePlate from '../app/components/modules/AddVehicle/LicensePlate/LicensePlate';
import AddPhotos from '../app/components/modules/AddVehicle/AddPhotos/AddPhotos';
import SetPricePerDay from '../app/components/modules/AddVehicle/Price/Price';
import AdvanceNotice from '../app/components/modules/AddVehicle/AdvanceNotice/AdvanceNotice';
import MinTripDuration from '../app/components/modules/AddVehicle/MinTripDuration/MinTripDuration';
import MaxTripDuration from '../app/components/modules/AddVehicle/MaxTripDuration/MaxTripDuration';
import Terms from '../app/components/modules/AddVehicle/Terms/Terms';

const promise = Promise.resolve();
const handleMock = jest.fn(() => promise);
let countClicks = 0;

const testVIN = 'TEST88901VIN7TEST';
const testLicensePlate = 'TES 000';
const testPrice = 89500;
const testDescription =
  'this is an automatic test case for the description of a test vehicle';

describe('Add Car', () => {
  it('it should render the intro', async () => {
    const { container } = render(<Intro next={2} setStep={handleMock} />);

    const title = screen.getByText(/Gana dinero como Huru Amigo/i);
    expect(title).toBeInTheDocument();

    const introParagraphOne = screen.getByText(
      /Únete a nuestra comunidad de Huru Amigos/i
    );
    expect(introParagraphOne).toBeInTheDocument();

    const introParagraphTwo = screen.getByText(
      /Los Huru Amigos usan los ingresos extras/i
    );
    expect(introParagraphTwo).toBeInTheDocument();

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();

    await act(async () => fireEvent.click(button));
    countClicks++;

    expect(handleMock).toHaveBeenCalledTimes(countClicks);
  });

  describe('Identify VIN Step', () => {
    let inputVIN;
    beforeAll(() => {
      render(<IdentifyVIN next={3} setStep={handleMock} />);
      inputVIN = screen.getByPlaceholderText(/cúal es el vin de tu carro/i);
    });

    it('it should render the identify VIN template', () => {
      const title = screen.getByText(/Identifica tu carro/i);
      expect(title).toBeInTheDocument();
      expect(inputVIN).toBeInTheDocument();
    });

    it('it should set the VIN value', async () => {
      expect(inputVIN.value).toBe('');
      await act(async () =>
        fireEvent.change(inputVIN, { target: { value: testVIN } })
      );
      expect(inputVIN.value).toBe(testVIN);
      await act(() => promise);
    });
  });

  // describe('Identify Vehicle Step', () => {
  //   beforeAll(() => {
  //     render(<IdentifyVehicle next={4} setStep={handleMock} />);
  //   });
  //   it('it should render the identify vehicle template', async () => {
  //     const title = screen.getByText(/Identifica tu carro/i);
  //     expect(title).toBeInTheDocument();
  //     const inputVIN = screen.getByPlaceholderText(
  //       /cúal es el vin de tu carro/i
  //     );
  //     expect(inputVIN).toBeInTheDocument();
  //   });
  // });

  describe('Select Features Step', () => {
    it('it should render the select features template', () => {
      render(<SelectFeatures next={5} setStep={handleMock} />);
      const title = screen.getByText(/Cuéntanos sobre tu carro/i);
      expect(title).toBeInTheDocument();

      // const card = await screen.findByText(/Android Auto/i);
      // await waitFor(() => introTemplate.querySelector('div'));
      // expect(screen.getByText('Android Auto')).toBeInTheDocument();
    });

    it('it should allow go to next step', async () => {
      const { container } = render(
        <SelectFeatures next={5} setStep={handleMock} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      await act(async () => fireEvent.click(button));
      countClicks++;

      expect(handleMock).toHaveBeenCalledTimes(countClicks);
      await act(() => promise);
    });
  });

  describe('Select Type Fuel Step', () => {
    it('it should render the select type fuel template', () => {
      render(<SelectFuel next={6} setStep={handleMock} />);

      const title = screen.getByText(/Cuéntanos sobre tu carro/i);
      expect(title).toBeInTheDocument();

      const explain = screen.getByText(
        /Qué tipo de combustible deberían usar para tu vehículo/i
      );
      expect(explain).toBeInTheDocument();
    });

    it('it should allow go to next step', async () => {
      const { container } = render(
        <SelectFuel next={6} setStep={handleMock} />
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      await act(async () => fireEvent.click(button));
      countClicks++;

      expect(handleMock).toHaveBeenCalledTimes(countClicks);
      await act(() => promise);
    });
  });

  describe('Description Step', () => {
    let inputDescription;
    beforeAll(() => {
      const { container } = render(
        <Description next={7} setStep={handleMock} />
      );
      inputDescription = container.getElementsByTagName('textarea')[0];
    });

    it('it should render the description template', () => {
      const explain = screen.getByText(/Cuéntale a todos las razones por las/i);
      expect(explain).toBeInTheDocument();

      expect(inputDescription).toBeInTheDocument();
    });

    it('it should set the description value', async () => {
      expect(inputDescription.value).toBe('');

      await act(async () =>
        fireEvent.change(inputDescription, {
          target: { value: testDescription },
        })
      );
      expect(inputDescription.value).toBe(testDescription);
      await act(() => promise);
    });
  });

  describe('Select City Step', () => {
    it('it should render the select city template', () => {
      render(<SelectCity next={8} setStep={handleMock} />);

      const title = screen.getByText(/Cuéntanos sobre tu carro/i);
      expect(title).toBeInTheDocument();

      const explain = screen.getByText(/Dónde está ubicado tu vehículo/i);
      expect(explain).toBeInTheDocument();
    });

    it('it should allow go to next step', async () => {
      const { container } = render(
        <SelectCity next={8} setStep={handleMock} />
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      await act(async () => fireEvent.click(button));
      countClicks++;

      expect(handleMock).toHaveBeenCalledTimes(countClicks);
      await act(() => promise);
    });
  });

  describe('License Plate Step', () => {
    it('it should render the license plate template', () => {
      render(<LicensePlate next={9} setStep={handleMock} />);

      const explain = screen.getByText(/Debemos conocer la matrícula de tu/i);
      expect(explain).toBeInTheDocument();
    });

    it('it should set the license plate value', async () => {
      const { container } = render(
        <LicensePlate next={9} setStep={handleMock} />
      );

      const licensePlate = container.querySelector('input');
      expect(licensePlate).toBeInTheDocument();
      expect(licensePlate.value).toBe('');

      await act(async () =>
        fireEvent.change(licensePlate, {
          target: { value: testLicensePlate },
        })
      );
      expect(licensePlate.value).toBe(testLicensePlate);
      await act(() => promise);
    });
  });

  describe('Add Vehicle Photos Step', () => {
    it('it should render the add photos template', () => {
      const { container } = render(
        <AddPhotos next={10} setStep={handleMock} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('it should allow go to next step', async () => {
      const { container } = render(
        <AddPhotos next={10} setStep={handleMock} />
      );
      const button = container.querySelector('button');

      await act(async () => fireEvent.click(button));
      countClicks++;

      expect(handleMock).toHaveBeenCalledTimes(countClicks);
      await act(() => promise);
    });
  });

  describe('Price Per Day Step', () => {
    it('it should render the price template', () => {
      const { container } = render(
        <SetPricePerDay next={11} setStep={handleMock} />
      );
      const title = screen.getByText(/Precio/i);
      expect(title).toBeInTheDocument();

      const price = container.querySelector('input[type=tel]');
      expect(price).toBeInTheDocument();

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('it should set the price per day value', async () => {
      const { container } = render(
        <SetPricePerDay next={11} setStep={handleMock} />
      );

      const price = container.querySelector('input[type=tel]');
      expect(price).toBeInTheDocument();
      expect(price.value).toBe('');

      await act(async () =>
        fireEvent.change(price, {
          target: { value: testPrice },
        })
      );
      expect(price.value).toBe(formatPrice({ price: testPrice }));
      await act(() => promise);
    });
  });

  describe('Select Advance Notice Step', () => {
    it('it should render the advance notice template', () => {
      const { container } = render(
        <AdvanceNotice next={12} setStep={handleMock} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('it should allow go to next step', async () => {
      const { container } = render(
        <AdvanceNotice next={12} setStep={handleMock} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      await act(async () => fireEvent.click(button));
      countClicks++;

      expect(handleMock).toHaveBeenCalledTimes(countClicks);
      await act(() => promise);
    });
  });

  describe('Select Min Trip Duration Step', () => {
    it('it should render the min trip duration template', () => {
      const { container } = render(
        <MinTripDuration next={13} setStep={handleMock} />
      );
      const title = screen.getByText(
        /Cúal será el viaje más corto que aceptarás/i
      );
      expect(title).toBeInTheDocument();

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('it should allow go to next step', async () => {
      const { container } = render(
        <MinTripDuration next={13} setStep={handleMock} />
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      await act(async () => fireEvent.click(button));
      countClicks++;

      expect(handleMock).toHaveBeenCalledTimes(countClicks);
      await act(() => promise);
    });
  });

  describe('Select Max Trip Duration Step', () => {
    it('it should render the max trip duration template', () => {
      const { container } = render(
        <MaxTripDuration next={14} setStep={handleMock} />
      );
      const title = screen.getByText(
        /Cúal será el viaje más largo que aceptarás/i
      );
      expect(title).toBeInTheDocument();

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('it should allow go to next step', async () => {
      const { container } = render(
        <MaxTripDuration next={14} setStep={handleMock} />
      );
      const title = screen.getByText(
        /Cúal será el viaje más largo que aceptarás/i
      );
      expect(title).toBeInTheDocument();

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      await act(async () => fireEvent.click(button));
      countClicks++;

      expect(handleMock).toHaveBeenCalledTimes(countClicks);
      await act(() => promise);
    });
  });

  describe('Summary and Terms Step', () => {
    it('it should render the summary and terms template', () => {
      const { container } = render(<Terms />);

      const title = screen.getByText(/Terminamos/i);
      expect(title).toBeInTheDocument();

      const explainParagraphOne = screen.getByText(
        /Revisa la vista previa para asegurarte/i
      );
      expect(explainParagraphOne).toBeInTheDocument();

      const explainParagraphTwo = screen.getByText(
        /Si la información proporcionada/i
      );
      expect(explainParagraphTwo).toBeInTheDocument();

      const checkTerms = container.querySelector('input[type=checkbox]');
      expect(checkTerms).toBeInTheDocument();
    });

    it('it should allow check/uncheck terms and policies of service', async () => {
      const { container } = render(<Terms />);

      const checkTerms = container.querySelector('input[type=checkbox]');
      expect(checkTerms).toBeInTheDocument();
      expect(checkTerms.checked).toEqual(false);

      await act(async () => fireEvent.click(checkTerms));
      expect(checkTerms.checked).toEqual(true);
      await act(() => promise);

      await act(async () => fireEvent.click(checkTerms));
      expect(checkTerms.checked).toEqual(false);
      await act(() => promise);
    });

    it('it should allow finish add vehicle process', async () => {
      const { container } = render(<Terms />);

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      const checkTerms = container.querySelector('input[type=checkbox]');
      expect(checkTerms).toBeInTheDocument();

      await act(async () => fireEvent.click(checkTerms));
      expect(checkTerms.checked).toEqual(true);
      await act(() => promise);

      await act(async () => fireEvent.click(button));
      expect(handleMock).toHaveBeenCalledTimes(countClicks);
      await act(() => promise);
    });
  });
});
