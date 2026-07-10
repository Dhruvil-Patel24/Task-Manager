import { useEffect, useState } from "react";
const initialState = {
        title: "",
        description: "",
        status: "pending",
    };

function TaskForm({ isOpen, onSubmit, editingTask, onCancel }) {

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status,
            });
        } else {
            setFormData(initialState);
        }
    }, [editingTask, isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit(formData);

        if (!editingTask) {
            setFormData(initialState);
        }
    };

    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="modal-card">
                <div className="modal-top">
                    <h2>{editingTask ? "Update Task" : "Create Task"}</h2>
                    <button type="button" className="close-btn" onClick={onCancel}>x</button>
                </div>

                <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                    <div className="button-group">

                    <button
                        type="submit"
                        className="save-btn"
                    >
                        {editingTask ? "Update" : "Create"}
                    </button>

                    {editingTask && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}

                    </div>

                </form>
            </div>
        </div>
    );
}

export default TaskForm;