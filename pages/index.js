import Link from 'next/link';
import Head from 'next/head';

import AppLayout from '../app/components/layouts/AppLayout/AppLayout';

// import Dropdown from '../app/components/elements/Dropdown/Dropdown';
// import Checkbox from '../app/components/elements/Checkbox/Checkbox';
// import RadioButton from '../app/components/elements/RadioButton/RadioButton';
// import TextArea from '../app/components/elements/TextArea/TextArea';

export default function Home() {
  // const list = [
  //   { id: 1, name: 'automatico' },
  //   { id: 2, name: 'manual' },
  // ];

  return (
    <div>
      <Head>
        <title>Huru | Renta carros</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppLayout>
        {/* <Dropdown list={list} label="Transmisión" />

        <Checkbox label="Accesibilidad para silla de ruedas" />

        <RadioButton label="12 horas (Recomendado)" index={1} />

        <TextArea
          placeholder={'Describe tu vehículo...'}
          rowsMin={10}
          maxLength={1000}
        /> */}
        <h1>Huru Home Page</h1>

        <Link href="/signup">
          <a>Regístrate</a>
        </Link>

        <Link href="/signin">
          <a>Ingresar</a>
        </Link>
      </AppLayout>
    </div>
  );
}
