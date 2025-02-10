import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const boardsPath = path.join(process.cwd(), 'boards');
  const boardDirs = fs.readdirSync(boardsPath);

  return {
    props: {
      boards: boardDirs,
    },
  };
}

export default function Home({ boards }) {
  return (
    <div>
      <h1>Welcome to the Imageboard</h1>
      <ul>
        {boards.map((board) => (
          <li key={board}>
            <Link href={`/${board}`}>
              <a>{board}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
