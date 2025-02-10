import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const boardsPath = path.join(process.cwd(), 'boards');
  const boardDirs = fs.readdirSync(boardsPath);

  const paths = boardDirs.map((board) => ({
    params: { boardName: board },
  }));

  return {
    paths,
    fallback: false, // Show a 404 page if the board doesn't exist
  };
}

export async function getStaticProps({ params }) {
  const { boardName } = params;
  const boardPath = path.join(process.cwd(), 'boards', boardName);

  // Read the messages from the board's JSON file
  const messagesFilePath = path.join(boardPath, 'messages.json');
  let messages = [];

  if (fs.existsSync(messagesFilePath)) {
    messages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf8'));
  }

  return {
    props: {
      boardName,
      messages,
    },
  };
}

export default function BoardPage({ boardName, messages }) {
  return (
    <div>
      <h1>{boardName} Board</h1>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <div>{message.text}</div>
            {message.image && (
              <div>
                <img
                  src={`/images/${boardName}/${message.image}`}
                  alt={`Message ${index + 1}`}
                  width="200"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
