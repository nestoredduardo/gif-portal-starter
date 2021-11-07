import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const ARTISAN_HANDLE = 'nestoredduardo';
const ARTISAN_LINK = `https://twitter.com/${ARTISAN_HANDLE}`;

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <iframe
            src="https://giphy.com/embed/t6lGyf3dk9qBEXhTj8"
            width="300"
            height="300"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
          <a
            className="footer-text css-e657no"
            href={ARTISAN_LINK}
            target="_blank"
            rel="noreferrer"
          >{`by @${ARTISAN_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
