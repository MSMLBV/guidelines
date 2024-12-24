import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Consistent Standards',
    description: (
      <>
        MSML's guidelines ensure consistency across Laravel and React Native projects,
        making code easier to read, maintain, and scale.
      </>
    ),
  },
  {
    title: 'Collaborative Documentation',
    description: (
      <>
        Our team can contribute and refine guidelines collaboratively,
        ensuring they evolve with best practices and project needs.
      </>
    ),
  },
  {
    title: 'Tailored for MSML',
    description: (
      <>
        These guidelines are specifically designed for MSML's focus on Laravel
        applications and React Native mobile apps, ensuring relevance and practicality.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
