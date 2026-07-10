function StatusFilter({ selectedStatus, onStatusChange }) {
    return (
        <div className="filter-container">
            <label htmlFor="statusFilter">Filter</label>
            <select
                id="statusFilter"
                value={selectedStatus}
                onChange={(event) => onStatusChange(event.target.value)}
            >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>

        </div>
    );
}

export default StatusFilter;