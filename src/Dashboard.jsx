import React, {useEffect, useState} from 'react';
import Loader from './Components/Loader';
import chuckGif from './assets/images/chuck.gif';
import chuckLogo from './assets/images/chuck-logo.gif';

const Dashboard = () => {
  const [category, setCategory] = useState([]);
  const [joke, setJoke] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiBaseUrl = 'https://api.chucknorris.io/jokes';

  function getjoke() {
    setIsLoading(true);
    fetch(`${apiBaseUrl}/random`)
      .then((res) => res.json())
      .then((json) => {
        setJoke(json);
        setIsLoading(false);
      })
      .catch((err) => setErrorMsg(err?.data?.message));
  }

  const searchJoke = () => {
    if (searchQuery) {
      setIsLoading(true);
      fetch(`${apiBaseUrl}/search?query=${searchQuery}`)
        .then((res) => res.json())
        .then((json) => {
          if (json?.result?.length) {
            setJoke(json?.result[0]);
          } else {
            setJoke('');
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const getJokeByCategory = (e) => {
    setIsLoading(true);
    fetch(`${apiBaseUrl}/random?category=${e.target.value}`)
      .then((res) => res.json())
      .then((json) => {
        setJoke(json);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getjoke();

    fetch(`${apiBaseUrl}/categories`)
      .then((res) => res.json())
      .then((json) => setCategory(json))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="bg-gray-100 h-screen">
        <div className="h-20 bg-sky-700 w-full flex justify-between items-center gap-2 px-4 lg:px-8">
          <div className="w-1/3 flex items-center">
            <img
              src={chuckLogo}
              alt="chuck-img"
              className="w-16 h-16"
              width="500"
              height="500"
            />
            <p className="text-white text-xs lg:text-base font-semibold w-1/3">
              Chuck Norris Jokes
            </p>
          </div>
          <div className="flex items-center gap-2 w-2/3 lg:w-fit">
            <input
              className="border border-gray-500 rounded-md px-2 lg:px-4 py-1 text-xs lg:text-base outline-none h-8 lg:h-10 w-full lg:w-96"
              type="search"
              placeholder="Search jokes by keyword..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={searchJoke}
              className="bg-orange-500 border-orange-500 hover:bg-orange-300 transition-all duration-300 text-xs lg:text-base text-white rounded-md h-8 lg:h-10 w-fit px-2 lg:px-4"
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-11/12 lg:w-1/2 bg-white mx-auto my-20 p-6 rounded-md shadow-md flex flex-col items-center gap-6">
          <div className="flex gap-2 items-center">
            <label
              className="text-xs lg:text-base font-semibold"
              htmlFor="category"
            >
              Get joke by category :
            </label>
            <select
              onChange={getJokeByCategory}
              className="border text-xs lg:text-base border-gray-500 rounded-md px-2 py-1"
              name="category"
              id="category"
            >
              <option disabled selected value>
                -- select an option --
              </option>
              {category?.map((catg, i) => {
                return (
                  <option key={i} value={catg}>
                    {catg}
                  </option>
                );
              })}
            </select>
          </div>

          <img
            src={chuckGif}
            alt="chuck-img"
            className="w-20 h-20"
            width="500"
            height="500"
          />
          <p className="text-sm lg:text-lg font-semibold text-gray-500">
            {joke.value ? `"${joke.value}"` : 'No jokes found, try again'}
          </p>
          <button
            className="bg-orange-500 border-orange-500 hover:bg-orange-300 transition-all duration-300 text-xs lg:text-base text-white rounded-md h-8 lg:h-10 w-fit px-2 lg:px-4"
            onClick={getjoke}
          >
            Get a random joke
          </button>
        </div>
        <p className="text-red-500">{errorMsg}</p>
      </div>

      {isLoading && <Loader isLoading={isLoading} />}
    </>
  );
};

export default Dashboard;
