import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState('');
    const [user, setUser] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedText, setEditedText] = useState('');

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(res.data);
        } catch (err) {
            console.error('Failed to fetch posts:', err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken.user);
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        fetchPosts();
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to create a post.');
            return;
        }
        try {
            const config = { headers: { 'x-auth-token': token } };
            await axios.post('http://localhost:5000/api/posts', { text }, config);
            setText('');
            fetchPosts();
        } catch (err) {
            alert('Failed to create post. Please try again.');
        }
    };

    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };
                await axios.delete(`http://localhost:5000/api/posts/${postId}`, config);
                fetchPosts();
            } catch (err) {
                alert('Failed to delete post.');
            }
        }
    };

    const handleEditClick = (post) => {
        setEditingPostId(post._id);
        setEditedText(post.text);
    };

    const handleUpdateSubmit = async (e, postId) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            await axios.put(`http://localhost:5000/api/posts/${postId}`, { text: editedText }, config);
            setEditingPostId(null);
            setEditedText('');
            fetchPosts();
        } catch (err) {
            alert('Failed to update post.');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (for future use, like profile summary) */}
            <div className="hidden lg:block lg:col-span-1">
                {/* You could add a user profile summary card here */}
            </div>

            {/* Center Column (Main Feed) */}
            <div className="lg:col-span-2">
                {user && (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-700">
                        <form onSubmit={handlePostSubmit} className="space-y-4">
                            <textarea
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                rows="4"
                                placeholder={`What's on your mind, ${user.name}?`}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                            ></textarea>
                            <div className="text-right">
                                <button type="submit" className="py-2 px-6 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white transition-colors">
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="space-y-6">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-700">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl">
                                            {post.user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <Link to={`/profile/${post.user._id}`} className="font-bold text-lg text-white hover:underline">{post.user.name}</Link>
                                            <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    {user && user.id === post.user._id && (
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleEditClick(post)} className="p-1 text-sm text-gray-400 hover:text-white transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(post._id)} className="p-1 text-sm text-gray-400 hover:text-red-500 transition-colors">Delete</button>
                                        </div>
                                    )}
                                </div>
                                {editingPostId === post._id ? (
                                    <form onSubmit={(e) => handleUpdateSubmit(e, post._id)} className="mt-4">
                                        <textarea
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white"
                                            rows="3"
                                            value={editedText}
                                            onChange={(e) => setEditedText(e.target.value)}
                                            required
                                        ></textarea>
                                        <div className="text-right mt-2 space-x-2">
                                            <button type="button" onClick={() => setEditingPostId(null)} className="py-1 px-3 bg-gray-600 hover:bg-gray-500 rounded-md text-sm">Cancel</button>
                                            <button type="submit" className="py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">Save</button>
                                        </div>
                                    </form>
                                ) : (
                                    <p className="text-gray-300 mt-4 whitespace-pre-wrap px-2">{post.text}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">The feed is empty. Be the first to post!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;