import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>CI-CD Project Overview</h1>
          <p>This application is running on AWS ECS service and Jenkins pipeline automates the end-to-end process of building, containerizing, and deploying of the project.</p>
          <h2>Workflow Steps:</h2>
          <ul>
              <li>Checks out the latest code from the <strong>GitHub repository</strong>.</li>
              <li>Builds the project and creates a <strong>Docker image</strong>.</li>
              <li>Utilize <strong>AWS CLI Docker image</strong> to push the Docker image to <strong>Amazon Elastic Container Registry (ECR)</strong>.</li>
              <li>Deploys the updated image to an <strong>AWS ECS service</strong>.</li>
          </ul>
          <div className="footer">
              <p>&copy; 2025 Jenkins Automation Project</p>
          </div>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <p>
          Application version: {process.env.REACT_APP_VERSION}
      </p>
    </div>
  );
}

export default App;
