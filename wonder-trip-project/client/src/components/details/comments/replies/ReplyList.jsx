import { useAuthContext } from "../../../../contexts/AuthContext";
import { useCommentsContext } from "../../../../contexts/CommentsContext";
import { useState } from "react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ReplyList({ replies = [], commentId }) {
  const { userId } = useAuthContext();
  const { editReply, deleteReply } = useCommentsContext();

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (replyId, currentText) => {
    setEditingId(replyId);
    setEditText(currentText);
  };

  const handleEditSubmit = (replyId) => {
    editReply(commentId, replyId, editText);
    setEditingId(null);
  };

  const handleDelete = (replyId) => {
    const confirmed = window.confirm("Are you sure you want to delete this reply?");
    if (confirmed) {
      deleteReply(commentId, replyId);
    }
  };

  return (
    <ul className="ml-6 mt-2 border-l pl-4 border-gray-300">
      {replies.map(reply => (
        <li key={reply._id} className="mb-2">
          {editingId === reply._id ? (
            <>
              <textarea
                className="w-full p-2 border rounded text-sm"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleEditSubmit(reply._id)}
                  className="bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-2 py-1 text-xs rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-700">{reply.text}</p>
              <p className="text-xs text-gray-500">— {reply.author.email}</p>

              {reply.author._id === userId && (
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleEdit(reply._id, reply.text)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Reply"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(reply._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Reply"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
