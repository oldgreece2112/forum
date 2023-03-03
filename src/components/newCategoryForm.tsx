import { useState } from "react";
import { api } from "../utils/api";

function NewCategoryForm() {
    const [name, setName] = useState("")
    const utils = api.useContext();

    const createCategory = api.category.createCategory.useMutation({
        onSuccess: async () => {
            setName("");
            await utils.category.getCategories.invalidate();
        }
    });

    return ( 
        <form onSubmit={(event) =>{
            event.preventDefault();
            createCategory.mutate({name});
            setName("");
        }}
        className="flex flex-col">
            <div className="flex flex-col w-48">
                <label htmlFor="categoryName">Category Name</label>
                <input type="text" id="categoryName" value={name} name="categoryName" className="bg-transparent" onChange={(event) => {setName(event.target.value)}}/>                
            </div>
            <div>
                <button type="submit" className="bg-purple-500 text-white rounded px-4 py-2 hover:cursor-pointer">Create Category</button>
            </div>
        </form>
     );
}

export default NewCategoryForm;