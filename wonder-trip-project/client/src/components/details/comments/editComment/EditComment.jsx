import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import commentsAPI from '../../../../api/comments-api';
import { useCommentsContext } from '../../../../contexts/CommentsContext';

export default function EditComment() {
    const { commentId, tripId } = useParams();
    const navigate = useNavigate();

    const { comments, setComments } = useCommentsContext(); // Взимаме от контекста
    const [text, setText] = useState('');

    useEffect(() => {
        const comment = comments?.find(c => c._id === commentId);
        if (comment) {
            setText(comment.text);
        }
    }, [commentId, comments]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await commentsAPI.update(commentId, { text });

            setComments(prev =>
                prev.map(c => (c._id === commentId ? { ...c, text } : c))
            );

            toast.success('Comment updated!');
            navigate(`/catalog/${tripId}`);
        } catch (err) {
            console.error(err);
            toast.error('Failed to update comment');
        }
    };

    if (!comments.length) {
        return <p className="text-red-500">Unable to load comment data</p>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Your Comment</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-3 border rounded-md resize-none mb-4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
