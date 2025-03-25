import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <h1>CI-CD Project Overview</h1>
          <div className='projectContent'>
            <p>This application is running on Amazon ECS and Jenkins pipeline automates the end-to-end process of building, containerizing, and deploying of the project.</p>
            <h2>Workflow Steps:</h2>
            <ul>
                <li>Checks out the latest code from the <strong>GitHub repository</strong>.</li>
                <li>Builds the project and containerize using <strong>Docker</strong>.</li>
                <li>Utilize <strong>AWS CLI Docker image</strong> to upload the application image to <strong>Amazon ECR</strong>.</li>
                <li>Deploys the uploaded image to <strong>Amazon ECS</strong>.</li>
            </ul>
            <div className="footer">
                <p>&copy; 2025 Jenkins Automation Project | Application version: {process.env.REACT_APP_VERSION}</p>
            </div>
          </div>
        </div>
        
      </header>
    </div>
  );
}

export default App;
