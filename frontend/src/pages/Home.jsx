import { useEffect, useState, useCallback } from "react";

import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import StatusFilter from "../components/StatusFilter";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../services/taskService";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const loadTasks = useCallback(async () => {
        try {
            const response = await getTasks(selectedStatus);
            setTasks(response.data);
        } catch (error) {
            setErrorMessage("Unable to load tasks.");
        }
    }, [selectedStatus]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const handleSubmit = async (taskData) => {
        try {
            if (editingTask) {
                await updateTask(editingTask.id, taskData);
                setSuccessMessage("Task updated successfully.");
            } else {
                await createTask(taskData);
                setSuccessMessage("Task created successfully.");
            }

            setEditingTask(null);
            setIsFormOpen(false);
            loadTasks();

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

        } catch (error) {
            setErrorMessage("Something went wrong.");

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setEditingTask(null);
        setIsFormOpen(false);
    };

    const handleOpenCreate = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);

            setSuccessMessage("Task deleted successfully.");
            setTaskToDelete(null);

            loadTasks();

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

        } catch (error) {
            setErrorMessage("Unable to delete task.");

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    const handleDeleteRequest = (id) => {
        setTaskToDelete(id);
    };

    const handleDeleteConfirm = async () => {
        if (taskToDelete === null) {
            return;
        }

        await handleDelete(taskToDelete);
    };

    const handleDeleteCancel = () => {
        setTaskToDelete(null);
    };

    return (
        <div className="container">
            <div className="board-head">
                <div>
                    <h1>Task Manager</h1>
                    <p>Keep tasks organized and update the list from one place.</p>
                </div>
            </div>


            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}

            <div className="toolbar">
                <StatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
                <button
                    type="button"
                    className="add-btn"
                    onClick={handleOpenCreate}
                >
                    + Add Task
                </button>
            </div>

            <TaskTable
                tasks={tasks}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
                onOpenCreate={handleOpenCreate}
            />

            <TaskForm
                isOpen={isFormOpen}
                onSubmit={handleSubmit}
                editingTask={editingTask}
                onCancel={handleCancel}
            />

            {taskToDelete && (
                <div className="modal-backdrop" role="dialog" aria-modal="true">
                    <div className="confirm-card">
                        <h2>Delete task?</h2>
                        <p>Are you sure you want to delete this task?</p>
                        <div className="button-group">
                            <button type="button" className="cancel-btn" onClick={handleDeleteCancel}>
                                Cancel
                            </button>
                            <button type="button" className="delete-btn" onClick={handleDeleteConfirm}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Home;