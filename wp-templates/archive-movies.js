import { gql } from '@apollo/client';
import Link from 'next/link';

export default function ArchiveMovies(props) {
    const { label, contentNodes } = props.data.nodeByUri;

    return (
        <>
            <h1>{label} Archive</h1>

            <ul>
                {contentNodes.nodes.map((node) => (
                    <li>
                        <Link href={node.uri}><a>{node.title}</a></Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

ArchiveMovies.variables = ({ uri }) => {
    return { uri };
};

ArchiveMovies.query = gql`
  query MovieArchive($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on ContentType {
        label
        description
        contentNodes {
          nodes {
            databaseId
            uri
            ... on NodeWithTitle {
              title
            }
          }
        }
      }
    }
  }
`;