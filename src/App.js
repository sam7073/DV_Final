import './App.css';
import Card from './components/Card';
import Button from './components/Buttons';
import Container from './components/Container';

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Main from './Routes/Main';
import Data from './Routes/Data';
import DV1 from './Routes/DV1';
import DV2 from './Routes/DV2';

function App() {
  return (
    <Container width="1600px" height="900px" jc="center">
      <BrowserRouter basename="/DV_Final">
        <Card width="200px" height="600px" fd="column">
          <Link to="/data">
            <Button primary thick>
              데이터
            </Button>
          </Link>
          <Link to="/dv1">
            <Button primary thick>
              시각화 1
            </Button>
          </Link>
          <Link to="/dv2">
            <Button primary thick>
              시각화 2
            </Button>
          </Link>
        </Card>
        <Card width="600px" height="600px" margin_left="50px">
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route path="/data" component={Data}></Route>
            <Route
              path="/dv1"
              component={() => {
                return <DV1 />;
              }}
            ></Route>
            <Route path="/dv2" component={DV2}></Route>
          </Switch>
        </Card>
      </BrowserRouter>
    </Container>
  );
}

export default App;
