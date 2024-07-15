import React from "react";
import RouteCompo from "./Routes/RouteCompo";
import { Provider } from 'react-redux'
import store from './redux/store'
import AppExperience from "./components/utils/AppExperience";



function App() {

  const baseUrl = process.env.REACT_APP_API_URL;
  console.log('API URL:', baseUrl);

  const [width, setWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);
  // console.log('width', width)
  return (
    <div>
      <Provider store={store}>
        <RouteCompo />

      </Provider>

    </div>
  );
}

export default App;
