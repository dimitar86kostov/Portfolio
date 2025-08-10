import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteComment } from '../../../../hooks/useComments';
import { useCommentsContext } from '../../../../contexts/CommentsContext';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ReplyList from "../replies/ReplyList";
import ReplyForm from "../replies/ReplyForm";


const deleteComment = useDeleteComment();

export default function DetailsComments({
    commentId,
    text,
    author,
    userId,
    replies
}) {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const { setComments } = useCommentsContext(); // Взимаме от контекста

    const onDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this comment?');
        if (confirmed) {
            try {
                await deleteComment(commentId);
                toast.success('Comment deleted!');

                setComments(prev => prev.filter(c => c._id !== commentId));

            } catch (err) {
                toast.error('Failed to delete comment');
            }
        }
    };

    const onEdit = () => {
        navigate(`/catalog/${tripId}/comment/${commentId}/edit`);
    };

    

    return (
        <div className="border-t border-gray-200 pt-4">
            <dt className="font-medium text-gray-900">{text}</dt>

            {author._id === userId && (
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={onEdit}
                        className="text-blue-600 hover:text-blue-800"
                        type="button"
                    >
                        <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-red-600 hover:text-red-800"
                        type="button"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            )}

            <dd className="mt-2 text-sm text-gray-500">{author.email}</dd>

            <ReplyList replies={replies || []} commentId={commentId} />
            {author._id !== userId && <ReplyForm commentId={commentId} />}

        </div>
    );
}
