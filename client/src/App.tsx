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
import { ThemeProvider, tealTheme } from '@edene/foundations';
import { gql } from '@apollo/client';
import { useGetCurrentUserQuery } from './generated/graphql';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      avatarUrl
      createdAt
    }
    pets {
      id
      name
      images {
        src
        alt
      }
      birth
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useGetCurrentUserQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data.</p>;
  const { currentUser, pets = [] } = data;

  const calculateAge = (isoDateString: string) => {
    const birthDate = new Date(isoDateString);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - birthDate.getTime();
    const age = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));

    return age;
  };
  return (
    <ThemeProvider theme={tealTheme}>
      <Text>{currentUser.name}</Text>
      <Container>
        <Row>
          {pets.map((pet) => (
            <Col key={pet.id} sm={24} lg={12}>
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
    </ThemeProvider>
  );
};
export default App;
