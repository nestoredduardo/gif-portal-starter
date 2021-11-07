import twitterLogo from './assets/twitter-logo.svg';
import marvelLogo from './assets/marvel.svg';

import './App.css';
import { useEffect, useState } from 'react';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const ARTISAN_HANDLE = 'nestoredduardo';
const ARTISAN_LINK = `https://twitter.com/${ARTISAN_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);
  const TEST_GIFS = [
    'https://media.giphy.com/media/vBjLa5DQwwxbi/giphy.gif',
    'https://media.giphy.com/media/6ra84Uso2hoir3YCgb/giphy.gif',
    'https://media.giphy.com/media/h0gzUb0Wh1RIY/giphy.gif',
    'https://media.giphy.com/media/93RImebAuEKkgRzcPr/giphy.gif',
  ];

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <input
        type="text"
        placeholder="Enter gif link!"
        value={inputValue}
        onChange={onInputchange}
      />
      <button onClick={sendGif} className="cta-button submit-gif-button">
        Submit
      </button>
      <div className="gif-grid">
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await checkIfWalletIsConnected();
    });
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');

      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  const onInputchange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty Input. Try Again.');
    }
  };

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <iframe
            src="https://giphy.com/embed/t6lGyf3dk9qBEXhTj8"
            width="300"
            height="300"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
          <p className="header">
            <img src={marvelLogo} className="marvel-logo" /> Marvel GIF Portal
          </p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
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
