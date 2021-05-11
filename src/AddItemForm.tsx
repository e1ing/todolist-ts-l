import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false) //убираем ошибку если начинаем печатать в поле
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim() //обрезка пробелов впереди и сзади
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true) //подсвечивает красным, если в строке пусто
        }
        setTitle("")
    }

    const onKeyPressAddItem = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }

    /*const errorMessage = error ? <div className={"error-message"}>Title is required</div> : null*/

    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                error={error}
                helperText={error && "Title is required"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                onBlur={()=>setError(false)}
            />
            <IconButton color={"primary"}
                        onClick={onClickAddItem}>
                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    );
}

export default AddItemForm;