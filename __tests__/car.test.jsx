import React from 'react';
import { render, screen, fireEvent, act } from '../test-utils';

import CarProfile from '../app/components/templates/CarProfile/CarProfileTempate';
import CarConfirmation from '../app/components/templates/CarConfirmation/CarConfirmationTemplate';

const confirmHeading =
  /Revisa y confirma la información presentada a continuación/i;

describe('Car', () => {
  it('it should render the car profile template', () => {
    const { container } = render(<CarProfile />);

    const specifications = screen.getByText(/Especificaciones/i);
    expect(specifications).toBeInTheDocument();

    // const carOwner = screen.getByText(/Huru Amigo/i);
    // expect(carOwner).toBeInTheDocument();

    // const cancellation = screen.getByText(/Políticas de cancelación/i);
    // expect(cancellation).toBeInTheDocument();

    // const button = container.querySelector('button');
    // expect(button).toBeInTheDocument();
    // fireEvent.click(button);
  });

  // it('it should render the confirmation template', async () => {
  //   const { container } = render(<CarConfirmation />);

  //   const heading = screen.getByText(confirmHeading);
  //   expect(heading).toBeInTheDocument();

  //   const timeTitle = screen.getByText(/Periodo de reserva/i);
  //   expect(timeTitle).toBeInTheDocument();

  //   const start = screen.getByText(/Fecha y hora de inicio/i);
  //   expect(start).toBeInTheDocument();

  //   const end = screen.getByText(/Fecha y hora de fin/i);
  //   expect(end).toBeInTheDocument();

  //   const payDetails = screen.getByText(/Detalle del pago/i);
  //   expect(payDetails).toBeInTheDocument();

  //   const Terms = screen.getByText(/Acepto/i);
  //   expect(Terms).toBeInTheDocument();

  //   const checkTerms = container.querySelector('input[type=checkbox]');
  //   expect(checkTerms.checked).toEqual(false);
  //   await act(async () => fireEvent.click(checkTerms));
  //   expect(checkTerms.checked).toEqual(true);
  //   await act(async () => fireEvent.click(checkTerms));
  //   expect(checkTerms.checked).toEqual(false);

  //   const button = screen.getByText(/Confirmar y pagar/i);
  //   expect(button).toBeInTheDocument();
  // });
});
