import * as React from 'react';
import {
  Container,
  Row,
} from '@edene/components';
import { gql } from '@apollo/client';
import { useGetPetsQuery, useGetCurrentUserQuery } from './generated/graphql';
import ComposePanel from './ComposePanel';
import PetCard from './PetCard';

export const GET_PETS = gql`
  query GetPets {
    pets {
      id
      name
      birth
      images {
        src
        alt
      }
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useGetPetsQuery();
  const { loading: userLoading, data: userData } = useGetCurrentUserQuery();
  if (loading || userLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data.</p>;
  const { pets } = data;
  const { currentUser } = userData || {};

  return (
    <Container>
      <ComposePanel
        currentUser={currentUser}
      />

      <Row>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} currentUserId={currentUser?.id || ""} />
        ))}
      </Row>
    </Container>
  );
};
export default App;
