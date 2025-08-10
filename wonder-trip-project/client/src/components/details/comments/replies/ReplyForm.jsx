import { useState } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useCommentsContext } from "../../../../contexts/CommentsContext";

export default function ReplyForm({ commentId }) {
  const { addReply } = useCommentsContext();
  const { userId, email } = useAuthContext();
  const [replyText, setReplyText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const newReply = {
      _id: crypto.randomUUID(),
      text: replyText,
      author: {
        _id: userId,
        email
      }
    };

    addReply(commentId, newReply);
    setReplyText('');
  };

  return (
    <form onSubmit={onSubmit} className="mt-2 ml-6">
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        rows="2"
        className="w-full p-2 border rounded text-sm"
        placeholder="Write a reply..."
      />
      <button
        type="submit"
        className="mt-1 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
      >
        Reply
      </button>
    </form>
  );
}
