import * as React from 'react';
import { gql } from '@apollo/client';
import { Card, CardSection, Col, Row, Text } from '@edene/components';

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
    }
  }
`;

const UserSection = () => {
  const { loading, error, data } = useGetCurrentUserQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data.</p>;
  const { currentUser, pets = [] } = data;

  return (
    <>
      <Text>{currentUser.name}</Text>
      <Row>
        {pets.map((pet) => (
          <Col key={pet.id} sm={24} lg={12}>
            <Card>
              <CardSection>
                <Text>{pet.name}</Text>
              </CardSection>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserSection;
