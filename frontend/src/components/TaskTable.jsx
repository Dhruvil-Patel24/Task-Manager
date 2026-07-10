import { Fragment, useMemo, useState } from "react";

function TaskTable({ tasks, onEdit, onDelete, onOpenCreate }) {
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const taskSummary = useMemo(() => {
        const pending = tasks.filter((task) => task.status === "pending").length;
        const inProgress = tasks.filter((task) => task.status === "in_progress").length;
        const done = tasks.filter((task) => task.status === "done").length;

        return {
            total: tasks.length,
            pending,
            inProgress,
            done,
        };
    }, [tasks]);

    const toggleRow = (taskId) => {
        setExpandedTaskId((currentId) => (currentId === taskId ? null : taskId));
    };

    const stopRowToggle = (event) => {
        event.stopPropagation();
    };

    const getStatusLabel = (status) => {
        if (status === "pending") {
            return "Pending";
        }

        if (status === "in_progress") {
            return "In Progress";
        }

        return "Done";
    };

    const getStatusStyle = (status) => {
        if (status === "pending") {
            return { background: "#fff7d6", color: "#b7791f" };
        }

        if (status === "in_progress") {
            return { background: "#dbeafe", color: "#2563eb" };
        }

        return { background: "#dcfce7", color: "#15803d" };
    };

    if (tasks.length === 0) {
        return (
            <div className="table-card">
                <div className="table-head-row">
                    <h2>Task List</h2>
                    <span>0 tasks</span>
                </div>

                <div className="summary-row">
                    {[
                        { label: "Total", value: taskSummary.total, className: "badge total" },
                        { label: "Pending", value: taskSummary.pending, className: "badge pending" },
                        { label: "In Progress", value: taskSummary.inProgress, className: "badge progress" },
                        { label: "Done", value: taskSummary.done, className: "badge done" },
                    ].map((item) => (
                        <div key={item.label} className={item.className}>
                            <span>{item.label}</span>
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>

                <table className="task-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="empty-row">
                            <td colSpan="5">
                                <div className="empty-state empty-state-inline">
                                    <div className="empty-icon">📋</div>
                                    <h3>No tasks found.</h3>
                                    <p>Create your first task.</p>
                                    <button type="button" className="add-btn" onClick={onOpenCreate}>
                                        + Add Task
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="table-card">
            <div className="table-head-row">
                <h2>Task List</h2>
                <span>{tasks.length} tasks</span>
            </div>

            <div className="summary-row">
                {[
                    { label: "Total", value: taskSummary.total, className: "badge total" },
                    { label: "Pending", value: taskSummary.pending, className: "badge pending" },
                    { label: "In Progress", value: taskSummary.inProgress, className: "badge progress" },
                    { label: "Done", value: taskSummary.done, className: "badge done" },
                ].map((item) => (
                    <div key={item.label} className={item.className}>
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>

            <table className="task-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <Fragment key={task.id}>
                            <tr className="task-row" onClick={() => toggleRow(task.id)}>
                                <td>{task.id}</td>
                                <td title={task.title}>
                                    <span className="cell-ellipsis">{task.title}</span>
                                </td>
                                <td title={task.description || "-"}>
                                    <span className="cell-ellipsis">{task.description || "-"}</span>
                                </td>
                                <td>
                                    <span className="status" style={getStatusStyle(task.status)}>
                                        {getStatusLabel(task.status)}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={(event) => {
                                            stopRowToggle(event);
                                            onEdit(task);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={(event) => {
                                            stopRowToggle(event);
                                            onDelete(task.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            {expandedTaskId === task.id && (
                                <tr className="task-detail-row">
                                    <td colSpan="5">
                                        <div className="task-detail-card">
                                            <div>
                                                <strong>Title</strong>
                                                <p>{task.title || "-"}</p>
                                            </div>
                                            <div>
                                                <strong>Description</strong>
                                                <p>{task.description || "-"}</p>
                                            </div>
                                            <div>
                                                <strong>Status</strong>
                                                <p>{getStatusLabel(task.status)}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;
