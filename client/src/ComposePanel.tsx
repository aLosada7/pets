import { gql } from '@apollo/client';
import { useCreateNewPetMutation } from './generated/graphql';
import {
  faImage,
  faFilm,
  faChartBar,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { GET_PETS } from './App';

export const CREATE_NEW_PET = gql`
  mutation CreateNewPet($userId: String!, $name: String!) {
    createPet(userId: $userId, name: $name) {
      id
    }
  }
`;

export interface ComposePanelProps {
  currentUser: { id: string };
}
const ComposePanel: React.FC<ComposePanelProps> = ({ currentUser }) => {
  const [createNewPet, { error }] = useCreateNewPetMutation();
  if (error) return <p>Error creating pet!</p>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textarea = e.currentTarget.querySelector('textarea');
    if (!textarea) throw new Error('No textarea found');
    const name = textarea.value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    createNewPet({
      variables: { userId: currentUser.id, name },
      refetchQueries: [GET_PETS],
    })
      .then(() => {
        textarea.value = '';
      })
      .catch((err: unknown) => {
        console.error('Problem creating new pet', err);
      });
  };
  return (
    <div className="new-tweet">
      <form onSubmit={handleSubmit}>
        <textarea name="body" placeholder="What's happening?"></textarea>
        <div className="btns">
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faFilm} />
            </button>
          </div>
          <div className="btn">
            <button disabled>
              <FontAwesomeIcon icon={faChartBar} />
            </button>
          </div>
          <div className="btn">
            <button type="submit" className="blue">
              <FontAwesomeIcon icon={faComment} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ComposePanel;
