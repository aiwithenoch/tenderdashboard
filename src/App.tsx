import { RouterProvider } from 'react-router';
import router from './routes/Router';
import './css/globals.css';
import { TenderWorkspaceProvider } from './context/tender/TenderWorkspaceContext';

function App() {
  return (
    <TenderWorkspaceProvider>
      <RouterProvider router={router} />
    </TenderWorkspaceProvider>
  );
}

export default App;
