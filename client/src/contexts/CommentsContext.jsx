import { createContext, useContext, useEffect, useState } from 'react';
import commentsAPI from '../api/comments-api';

const CommentsContext = createContext();

export function CommentsProvider({ children, tripId }) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Зареждане на коментари от localStorage при mount
    useEffect(() => {
        if (!tripId) return;

        const localData = localStorage.getItem(`comments-${tripId}`);
        if (localData) {
            setComments(JSON.parse(localData));
            setIsLoading(false);
        } else {
            // Ако няма в localStorage — зареждаме от API 
            (async () => {
                try {
                    const result = await commentsAPI.getAll(tripId);
                    setComments(result);
                } catch (err) {
                    console.error('Failed to load comments:', err);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [tripId]);

    // Съхраняване в localStorage при промяна
    useEffect(() => {
        if (tripId && comments.length) {
            localStorage.setItem(`comments-${tripId}`, JSON.stringify(comments));
        }
    }, [comments, tripId]);

    // Управление на replies
    const addReply = (commentId, reply) => {
        setComments(prev =>
            prev.map(comment =>
                comment._id === commentId
                    ? { ...comment, replies: [...(comment.replies || []), reply] }
                    : comment
            )
        );
    };

    const editReply = (commentId, replyId, newText) => {
        setComments(prev =>
            prev.map(comment => {
                if (comment._id !== commentId) return comment;
                return {
                    ...comment,
                    replies: (comment.replies || []).map(r =>
                        r._id === replyId ? { ...r, text: newText } : r
                    )
                };
            })
        );
    };

    const deleteReply = (commentId, replyId) => {
        setComments(prev =>
            prev.map(comment => {
                if (comment._id !== commentId) return comment;
                return {
                    ...comment,
                    replies: (comment.replies || []).filter(r => r._id !== replyId)
                };
            })
        );
    };

    const value = {
        comments,
        setComments,
        isLoading,
        addReply,
        editReply,
        deleteReply,
    };

    return (
        <CommentsContext.Provider value={value}>
            {children}
        </CommentsContext.Provider>
    );
}

export function useCommentsContext() {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error('useCommentsContext must be used within a CommentsProvider');
    }
    return context;
}