import Head from 'next/head';
import { useEffect } from 'react';

import AppLayout from '../../../../app/components/layouts/AppLayout/AppLayout';
import ActivityIndicator from '../../../../app/components/elements/ActivityIndicator/ActivityIndicator';
import TitlePage from '../../../../app/components/elements/TitlePage/TitlePage';
import Timeline from '../../../../app/components/modules/Timeline/Timeline';
import PolicyCancellationSection from '../../../../app/components/modules/PolicyCancellation/PolicyCancellationSection';

function CancellationPolicyPage() {
  const handleGetCarReviews = () => {};

  useEffect(() => {
    handleGetCarReviews();
  }, []);

  return (
    <div>
      <Head>
        <title>Huru | Políticas de cancelación</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ActivityIndicator />

      <AppLayout withImage={false}>
        <TitlePage>Política de cancelación</TitlePage>

        <PolicyCancellationSection
          contentLimit={false}
          showTitle={false}
          showSeeMore={false}
        />

        <Timeline />
      </AppLayout>
    </div>
  );
}

export default CancellationPolicyPage;
