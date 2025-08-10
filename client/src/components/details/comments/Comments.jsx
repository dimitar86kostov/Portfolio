import { useAuthContext } from "../../../contexts/AuthContext";
import { useCreateComment, useEditComment, useGetAllComments } from "../../../hooks/useComments";
import useForm from "../../../hooks/useForm";
import DetailsComments from "./detailsComments/DetailsComments";
import { useCommentsContext } from "../../../contexts/CommentsContext";

const initValues = {
    comment: '',
}

export default function Comments({ trip, tripId, setTripHandler }) {
    const { comments, setComments, isLoading } = useCommentsContext();

    const createComment = useCreateComment();
    const { isAuthenticated, userId, email } = useAuthContext();

    const commentHandler = async ({ comment }) => {
        try {
            const newComment = await createComment(tripId, comment); // Създаваме нов коментар

            // Добавяме author локално (заради липсата му в отговора от бекенда)
            newComment.author = {
                _id: userId,
                email: email, // взимаме email от useAuthContext
            };

            setComments(prevComments => [...prevComments, newComment]); // Добавяме го към state

        } catch (err) {
            console.error(err.message);
        }
    };


    const { values, changeHandler, submitHandler } = useForm(initValues, commentHandler);

    return (
        <>
            <div className="details-comments">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">Comments:</h2>
                <ul>
                    {comments.length === 0
                        ? <h2>No comments yet...</h2>
                        : comments.map(c =>
                            <DetailsComments
                                key={c._id}
                                commentId={c._id}
                                text={c.text}
                                author={c.author}
                                owner={c.owner_id}
                                userId={userId}
                                trip={tripId}
                                setComments={setComments}
                                comments={comments}
                                replies={c.replies}
                            />
                        )
                    }
                </ul>
            </div>

            {isAuthenticated &&
                <div className="pt-10">
                    <form onSubmit={submitHandler}>
                        <div className="relative w-[32rem]">
                            <div className="relative w-full min-w-[200px]">
                                <textarea
                                    rows="8"
                                    className="peer h-full min-h-[100px] w-full !resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                    name="comment"
                                    value={values.comment}
                                    onChange={changeHandler}
                                />
                                <label className="...">Type Your Comment Here...</label>
                            </div>
                            <div className="flex w-full justify-between py-1.5">
                                <div className="flex gap-2">
                                    <button
                                        className="select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="submit"
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}
