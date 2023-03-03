import { useRouter } from "next/router";
import { api } from "../utils/api";
import { useState } from "react";


function NewPostForm() {
    const router = useRouter();
    const categoryId = router.query.id as string;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const createPost = api.post.createPost.useMutation();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                createPost.mutate({
                    title,
                    content,
                    categoryId,
                })
                setTitle("");
                setContent("");
            }}

            className="flex flex-col"
        >
            <div className="flex flex-col">
                <label htmlFor="title">Title</label>
                <input className="bg-transparent border-2 border-neutral-400 p-2 rounded w-1/3" type="text" id="title" name="title" onChange={(event) => {setTitle(event.target.value)}} value={title}/>
            </div>

            <div className="flex flex-col">
                <label htmlFor="content">Content</label>
                <textarea className="w-1/3 bg-transparent border-2 border-neutral-400" id="content" name="content" onChange={(event) => {setContent(event.target.value)}} value={content}/>
            </div>
            <div>
                <button type="submit" className="bg-purple-500 rounded text-white px-4 py-2">Submit</button>
            </div>
        </form>
    );
}

export default NewPostForm;