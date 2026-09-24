function StatCard({ title, value, description }) {
    return (
        <div className="stat-card">
            <p className="stat-card-title">{title}</p>
            <h3>{value}</h3>
            <p className="stat-card-description">{description}</p>
        </div>
    );
}

export default StatCard;