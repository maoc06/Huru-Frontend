import Head from 'next/head';

import NavBarLayout from '../app/components/layouts/NavBarLayout/NavBarLayout';
import HeroImageLayout from '../app/components/layouts/HeroImageLayout/HeroImageLayout';
import HomeTemplate from '../app/components/templates/HomePage/HomeTemplate';

export default function Home() {
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

      <NavBarLayout>
        <HeroImageLayout heroSrc="/images/home-hero.png">
          <HomeTemplate />
        </HeroImageLayout>
      </NavBarLayout>
    </div>
  );
}
