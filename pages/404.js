import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import AppLayout from '../app/components/layouts/AppLayout/AppLayout';
import Button from '../app/components/elements/Button/Button';

export default function CustomNotFoundPage() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Huru | Página no encontrada</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppLayout centerContent={true} withImage={false}>
        <h3 style={{ textAlign: 'center' }}>Oops!</h3>
        <h6 style={{ textAlign: 'center' }}>
          No pudimos encontrar la pagina a la que intentas acceder.
        </h6>

        <div style={{ position: 'relative', height: '250px' }}>
          <Image
            src="/images/404.png"
            alt="página no encontrada"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <Button onClick={() => router.push('/')}>Volver al inicio</Button>
      </AppLayout>
    </div>
  );
}
