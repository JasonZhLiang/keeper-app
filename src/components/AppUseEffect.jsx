import React, { useState, useEffect } from 'react'


// useEffect is a hook that lets you perform side effects in function components. 
// useEffect is a hook in React that allows functional components to perform side effects. Side effects in the context of React usually refer to tasks that happen outside the scope of the component rendering, such as data fetching, subscriptions, manual DOM manipulations, and more.
// Common use cases for useEffect include data fetching, subscriptions, setting up timers, and performing cleanup tasks. It helps you manage the lifecycle of functional components in a way that's similar to class components with methods like componentDidMount, componentDidUpdate, and componentWillUnmount.


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

    // useEffect takes two arguments: a function and an optional dependency array, The function passed to useEffect will run after the initial render and after every subsequent render.
    useEffect(() => {
        // The code inside this block will be executed after every render
        console.log('Component did mount (initial render) and did update.');

        // Cleanup function: it runs when the component is unmounted or before the next effect
        return () => {
            console.log('Component will unmount or before the next effect.');
        };
    }, []); // Dependency array (optional): specify dependencies to control when the effect runs, If the dependencies change between renders, the effect will run again. If the dependencies are an empty array ([]), the effect runs only after the initial render.


    return (
        <>
            <div>
                <button onClick={() => setResourceType('posts')}>Posts</button>
                <button onClick={() => setResourceType('users')}>Users</button>
                <button onClick={() => setResourceType('comments')}>Comments</button>
            </div>
            <h1>{resourceType}</h1>
            {/* dynamic morrnitor your window width */}
            <div>window width: {windowWidth}</div>
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
