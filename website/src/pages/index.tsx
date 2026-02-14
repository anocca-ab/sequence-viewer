import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { CircularApp } from '../components/CircularApp';
import { SequenceViewerApp } from '@anocca/sequence-viewer-app';
import { useMockBackend } from '../mocks/mockBackend';
import { sequence } from '../mocks/moleculeA';
import { AnnotationForm } from '@anocca/sequence-viewer-react-mui-formik-form';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/tutorial/get-started">
            Tutorial - 5 min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const backend = useMockBackend();

  return (
    <Layout>
      <HomepageHeader />
      <main style={{ paddingTop: '24px', paddingBottom: '24px', textAlign: 'center' }}>
        <SequenceViewerApp
          {...backend}
          sequence={sequence}
          AnnotationForm={AnnotationForm}
          width={800}
          height={640}
        />
      </main>
    </Layout>
  );
}
