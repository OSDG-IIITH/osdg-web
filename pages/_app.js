import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "flickity/css/flickity.css";

import '../styles/globals.css';
import '../styles/projects.css';

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import Layout from '../components/Layout';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null;
  });

  useEffect(() => {
    const threeScript = document.createElement('script');
    threeScript.setAttribute('id', 'threeScript');
    threeScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js");
    document.getElementsByTagName("head")[0].appendChild(threeScript);
    return () => {
      if (threeScript) {
        threeScript.remove();
      }
    };
  }, []);
  return <Layout><Component {...pageProps} /></Layout>;
}

export default MyApp
