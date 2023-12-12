import * as React from 'react';
import {
  Card,
  CardMedia,
  CardSection,
  Col,
  Container,
  Row,
  Text,
} from '@edene/components';
import { gql } from '@apollo/client';
import { useGetPetsQuery } from './generated/graphql';
import ComposePanel from './ComposePanel';

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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data.</p>;
  const { pets } = data;

  const calculateAge = (isoDateString: string) => {
    const birthDate = new Date(isoDateString);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - birthDate.getTime();
    const age = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));

    return age;
  };

  return (
    <Container>
      <ComposePanel
        currentUser={{
          id: 'user-15a37948-7712-4e0b-a554-2fef33f31697',
        }}
      />

      <Row>
        {pets.map((pet) => (
          <Col key={pet.id} sm={24} md={12}>
            <Card>
              <CardMedia src={pet.images} />
              <CardSection>
                <Text>
                  {pet.name}, {calculateAge(pet.birth)}
                </Text>
              </CardSection>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default App;
