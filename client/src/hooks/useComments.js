import { useEffect, useState } from "react";
import commentsAPI from "../api/comments-api";

export function useCreateComment() {
    const createHandler = (tripId, comment) => commentsAPI.create(tripId, comment);

    return createHandler;
}

export function useEditComment() {
    const editingComment = (commentId, commentData) => commentsAPI.update(commentId, commentData);

    return editingComment;
}

export function useGetAllComments(tripId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAll(tripId);

            setComments(result);
        })();
    }, [tripId]);

    return [
        comments,
        setComments
    ];
}

export function useGetCommentById(commentId) {
    const [comment, setComment] = useState({
        text: "",
    });

    useEffect(() => {
        commentService.getCommentById(commentId)
            .then(res => {
                if (res?.text) {
                    setText(res.text);
                } else {
                    toast.error('Comment not found or empty');
                }
            })
            .catch(() => toast.error('Failed to load comment'));
    }, [commentId]);


    return { comment };


}

export function useDeleteComment() {

    const deleteHandler = (commentId) => commentsAPI.remove(commentId);

    return deleteHandler;
}