import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import useToast from "../hooks/toast";

const ShowPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [error, setError] = useState('');
    const { addToast } = useToast();

    const getPost = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data)
            setLoading(false);
        }).catch(e => {
            setError('somthing wnt wrong in db');
            addToast({
                type: 'danger',
                text: 'somthing wnt wrong in db'
            })
            setLoading(false);
        })
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('hello');
            setTimer(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        getPost(id)
    }, [id])

    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title} ({timer}초)</h1>
                {isLoggedIn && <div>
                    <Link 
                        className="btn btn-primary"
                        to={`/blogs/${id}/edit`}    
                    >
                        Edit
                    </Link>
                </div>}
            </div>
            <small className="text-muted">
                Created At : {printDate(post.createdAt)}
            </small>
            <hr></hr>
            <p>{post.body}</p>
        </div>
    );
};

export default ShowPage;