import React, { useEffect } from "react";
import axios from "axios";
import './MovieRow.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const MovieRow = ({ title, items }) => {
  // Initialize mode state with window object if not already initialized
  if (typeof window.mode === 'undefined') {
    window.mode = {};
  }

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.post('https://scale-server.onrender.com/user/get-mapping', {
          filter: { COUNTRY: 'IN', SUBSCRIPTION: 'FREE' },
          projectID: 'vishal_72d8f604-cb87-4358-8dc8-1d53a96670c9'
        });

        const appConfig = response.data.mappings.appConfig;
        console.log('Fetched appConfig:', appConfig);

        // Update window.mode with appConfig
        window.mode.appConfig = appConfig;

        // Trigger a re-render to apply the updated configuration
        const forceUpdateEvent = new Event('forceUpdate');
        window.dispatchEvent(forceUpdateEvent);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };

    fetchConfig();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleLeftArrow = () => {
    let x = window.mode.scrollX || 0;
    x += Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    window.mode.scrollX = x;
    forceUpdate();
  };

  const handleRightArrow = () => {
    let x = window.mode.scrollX || 0;
    let listW = items.results.length * 150;
    x -= Math.round(window.innerWidth / 2);
    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }
    window.mode.scrollX = x;
    forceUpdate();
  };

  const forceUpdate = () => {
    const forceUpdateEvent = new Event('forceUpdate');
    window.dispatchEvent(forceUpdateEvent);
  };

  if (!window.mode.appConfig) return <div>Loading...</div>;

  console.log('Current config:', window.mode.appConfig); // Log current config to debug

  return (
    <div className="movieRow">
      {(window.mode.appConfig.movieRow) && <h2>{title}</h2>}
      {(window.mode.appConfig.movieRowleft) && (
        <div className="movieRow--left" onClick={handleLeftArrow}>
          <FaAngleLeft style={{ fontSize: 50 }} />
        </div>
      )}
      {(window.mode.appConfig.movieRowright) && (
        <div className="movieRow--right" onClick={handleRightArrow}>
          <FaAngleRight style={{ fontSize: 50 }} />
        </div>
      )}
      {(window.mode.appConfig.movieRowlist) && (
        <div className="movieRow--listarea">
          <div
            className="movieRow--list"
            style={{
              marginLeft: window.mode.scrollX || 0,
              width: items.results.length * 150
            }}
          >
            {items.results.length > 0 &&
              items.results.map((item, key) => (
                (window.mode.appConfig.movieRowitem) && (
                  <div key={key} className="movieRow--item">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                      alt={item.original_title}
                    />
                  </div>
                )
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRow;
