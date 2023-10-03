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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={tealTheme}>
      <Container>
        <Row>
          <Col sm={24} lg={12}>
            <Card>
              <CardMedia
                src={[
                  {
                    src: 'http://localhost:3000/static/alegria1.jpg',
                    alt: 'Alegria 1',
                  },
                  {
                    src: 'http://localhost:3000/static/alegria2.jpg',
                    alt: 'Alegria 2',
                  },
                ]}
              />
              <CardSection>
                <Text>Alegría, 9</Text>
              </CardSection>
            </Card>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};
export default App;
