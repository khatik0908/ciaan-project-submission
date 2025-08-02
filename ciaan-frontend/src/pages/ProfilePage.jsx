import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const { userId } = useParams(); // Gets the userId from the URL
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setProfile(res.data);
            } catch (err) {
                console.error('Failed to fetch profile', err);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    if (loading) {
        return <p className="text-center text-gray-400">Loading profile...</p>;
    }

    if (!profile) {
        return <p className="text-center text-red-500">Could not load profile.</p>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-8">
                <h1 className="text-4xl font-bold">{profile.user.name}</h1>
                <p className="text-gray-400 mt-1">{profile.user.email}</p>
                <p className="mt-4 text-gray-300">{profile.user.bio || 'No bio provided.'}</p>
            </div>

            <h2 className="text-2xl font-bold mb-6">Posts by {profile.user.name}</h2>
            <div className="space-y-6">
                {profile.posts.length > 0 ? (
                    profile.posts.map((post) => (
                        <div key={post._id} className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <p className="text-gray-400 text-sm mb-2">
                                {new Date(post.createdAt).toLocaleString()}
                            </p>
                            <p className="text-gray-300">{post.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">This user has not made any posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;