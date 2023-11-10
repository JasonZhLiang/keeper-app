import React, { useState, useEffect } from 'react'

export default function App() {
    const [resourceType, setResourceType] = useState('posts')
    const [resources, setResources] = useState([])
    // useEffect will be called every time the resourceType changes
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(data => setResources(data))
        console.log(resourceType)
    }, [resourceType]);

    // another example of useEffect for mornitoring window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        // also remember to clean up the event listener when the component unmounts, so the return code always to the clean up job
        return () => {
            window.removeEventListener('resize', () => {
                setWindowWidth(window.innerWidth)
            })
        }
        console.log(windowWidth)
    }, [])

    return (
        <>
            <div>
                <button onClick={() => setResourceType('posts')}>Posts</button>
                <button onClick={() => setResourceType('users')}>Users</button>
                <button onClick={() => setResourceType('comments')}>Comments</button>
            </div>
            <h1>{resourceType}</h1>
            {/* dynamic morrnitor your window width */}
            <div>{windowWidth}</div>
            {resources.map(resource => (
                <pre key={resource.id}>
                    {/* <h1>{resource.title}</h1>
                    <p>{resource.body}</p> */}
                    {JSON.stringify(resource)}
                    {/* <button onClick={() => deleteResource(resource.id)}>Delete</button> */}
                </pre>
            ))}
        </>
    )
}
