import { useRef } from "react";
import { createPortal } from "react-dom";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const modal = useRef();

  function handleAddProject() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      {createPortal(
        <Modal ref={modal} buttonCaption="Okay">
          <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
            Invalid Input
          </h2>
          <p className="text-stone-600 mb-4">
            Oops.. looks like you forget to enter a value.
          </p>
          <p className="text-stone-600 mb-4">
            Please make sure you provide a valid value for every input field.
          </p>
        </Modal>,
        document.getElementById("modal-root")
      )}

      <div className="w-[35rem]">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleAddProject}
            >
              Save
            </button>
          </li>
        </menu>

        <div>
          <Input ref={title} label="Title" type="text" />
          <Input ref={description} label="Description" textarea />
          <Input ref={dueDate} label="Due date" type="date" />
        </div>
      </div>
    </>
  );
}
