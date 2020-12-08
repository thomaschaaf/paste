import Link from 'next/link';

const IndexPage: React.FC = () => {
  return (
    <div>
      <Link href="/edit">
        <a>Edit</a>
      </Link>{' '}
      <Link href="/playground">
        <a>Playground</a>
      </Link>
    </div>
  );
};

export default IndexPage;
