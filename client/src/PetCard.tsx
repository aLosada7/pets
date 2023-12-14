import * as React from 'react';
import {
  Card,
  CardMedia,
  CardSection,
  Col,
  Text,
} from '@edene/components';
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} from "./generated/graphql"
import {GET_PETS} from './App'
import { GET_CURRENT_USER } from "./UserSection"
import { gql } from '@apollo/client';

export const CREATE_FAVORITE = gql`
  mutation CreateFavorite($favorite: FavoriteInput!) {
    createFavorite(favorite: $favorite) {
      id
    }
  }
`
export const DELETE_FAVORITE = gql`
  mutation DeleteFavorite($favorite: FavoriteInput!) {
    deleteFavorite(favorite: $favorite) {
      id
    }
  }
`

const calculatePetAge = (isoDateString: string) => {
    const birthDate = new Date(isoDateString);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - birthDate.getTime();
    const age = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));

    return age;
};

export interface PetProps {
    currentUserId: string;
    pet: {
      id: string;
      isFavorited: boolean;
      images: any;
      name: string;
      birth: string;
    };
  }

const PetCard = ({pet, currentUserId}: PetProps) => {
    const {id: petId, isFavorited} = pet;
      const [createFavorite, { error: createFavoriteError }] =
  useCreateFavoriteMutation({
    variables: {
      favorite: { petId, userId: currentUserId },
    },
    refetchQueries: [GET_PETS, GET_CURRENT_USER],
  })
const [deleteFavorite, { error: deleteFavoriteError }] =
  useDeleteFavoriteMutation({
    variables: {
      favorite: { petId, userId: currentUserId },
    },
    refetchQueries: [GET_PETS, GET_CURRENT_USER],
  })

  const handleFavoriteClick: React.MouseEventHandler<HTMLButtonElement> = (
    _evt
  ) => {
    if (isFavorited)
  deleteFavorite().catch((err) =>
    console.error("error while deleting favorite", err)
  )
else
  createFavorite().catch((err) =>
    console.error("error while creating favorite", err)
  )
  };

if (createFavoriteError) {
  return (
    <p>
      Error creating favorite: {createFavoriteError.message}
    </p>
  )
}
if (deleteFavoriteError) {
  return (
    <p>
      Error deleting favorite: {deleteFavoriteError.message}
    </p>
  )
}

    return <Col key={pet.id} sm={24} md={12}>
      <Card>
        <CardMedia src={pet.images} />
        <CardSection>
          <Text>
            {pet.name}, {calculatePetAge(pet.birth)}
          </Text>
        </CardSection>
        <CardSection>
            <button onClick={handleFavoriteClick}>{isFavorited ? "Unlike" : "Like"}</button>
        </CardSection>
      </Card>
    </Col>
}

export default PetCard;