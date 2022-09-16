import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [category, setCategory] = useState([]);
    const [random, setRandom] = useState([]);
    const [searchjoke, setSearchjoke] = useState([]);

    useEffect(() => {
        let url = "https://api.chucknorris.io/jokes/categories";
        fetch(url).then((res) => res.json()).then((json) => setCategory(json)).catch((err) => console.log(err))
    }, [])


    function getrandom() {
        let url = "https://api.chucknorris.io/jokes/random";
        fetch(url).then((res) => res.json()).then((json) => setRandom(json)).catch((err) => console.log(err))
    }

    useEffect(() => {
        getrandom()
    }, [])

    function search(e) {
        let url = "https://api.chucknorris.io/jokes/search?query={e.target.value}";
        fetch(url).then((res) => res.json()).then((json) => setSearchjoke(json)).catch((err) => console.log(err))
    }

    useEffect(() => {
        search()
    }, [])

    console.log(random)
    return (
        <div>
            <form action="">
                {category && category.map((catg, i) => {
                    return (
                        <>
                            <input type="checkbox" id={catg} name={catg} value={catg} />
                            <label for={catg}>{catg}</label><br />
                        </>
                    )
                })}
                <input type="text" onChange={search}/>
                <input type="submit" /><br />
                <h1>{random.value}</h1>
                <button onClick={getrandom}>Random jokes</button> 
                {/* This is the only working piece of code */}
            </form>
        </div>
    )
}

export default Dashboard;