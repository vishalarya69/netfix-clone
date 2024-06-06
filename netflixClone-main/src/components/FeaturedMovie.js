import React, { useState } from 'react';
import './FeaturedMovie.css';
import { FaPlay, FaPlus, FaSearch } from 'react-icons/fa';
import { MdOutlineToggleOff } from "react-icons/md";
import { MdOutlineToggleOn } from "react-icons/md";

export default ({ item }) => {
    console.log(item);

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }
    const [mode, setMode] = useState(false);





    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {item.original_name}
                    </div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                        <a href='/watch/${item.id}' className="featured--watchbutton"><FaPlay size={13} /> Assistir</a>

                        {mode ? <a href='/list/add/${item.id}' onClick={() => setMode(!mode)} className="featured--mylistbutton"><FaPlus size={13} /> My lis</a> : <a href='/list/add/${item.id}' onClick={() => setMode(!mode)} className="featured--mylistbutton"><FaPlus size={13} /> Menu</a>}
                       <div className='icon-hai'> <div className="home-bottom-icon-div" onClick={() => setMode(!mode)}> {mode ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
                        </div>
                        </div>
                    </div>


                    <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}