import Head from 'next/head';
import { useEffect, useState } from 'react';

import useMood from '../app/hooks/useMood';

import HomeTemplate from '../app/components/templates/HomePage/HomeTemplate';
import HomeHostTemplate from '../app/components/templates/HomeHostMode/HomeHostTemplate';

export default function Home() {
  const app = useMood();
  const [hostMode, setHostMode] = useState(false);

  useEffect(() => {
    setHostMode(app.getMood());
  }, []);

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

      {hostMode ? (
        <HomeHostTemplate />
      ) : (
        <HomeTemplate />
      )}
    </div>
  );
}
