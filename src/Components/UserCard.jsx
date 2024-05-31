import React from 'react'
import { useEffect, useState } from 'react'
import './styles.css'

const UserCard = () => {

    const [data, setData] = useState([])

    async function getData() {
        const rs = await fetch('https://jsonplaceholder.typicode.com/users')
        const rsJson = await rs.json()


        const filteredData = await Promise.all(rsJson.map(async user => {

            const imageResponse = await fetch(`https://picsum.photos/300/300`)
            const imageUrl = imageResponse.url

            return {
                id: user.id,
                name: user.name,
                username: "@" + user.username,
                email: user.email,
                img: imageUrl
            }
        }))

        setData(filteredData)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='container'>
            <div className='grid'>
                {data &&
                    data.map(user =>
                        <div key={user.id} className='card'>
                            <img src={user.img} className='img'></img>
                            <li className='list'>
                                <p className='info'>{user.name}</p>
                                <p className='info'>{user.username}</p>
                                <p className='info'>{user.email}</p>
                            </li>
                        </div>

                    )
                }
            </div>

        </div>
    )
}

export default UserCard
