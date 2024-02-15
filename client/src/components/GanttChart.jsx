import React from "react";
import { useQuery } from "@apollo/client";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useParams, useNavigate } from "react-router-dom";

import { GET_TIMELINE } from "../queries/ProjectQueries";

const GanttChart = () => {
    // Sample data for the Gantt chart
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_TIMELINE, {
        variables: { id },
    });
    let tasklist = [];
    if (!loading && !error && data) {
        tasklist = data.project.timeline.tasks.map((task) => {
            return {
                ...task,
                start: new Date(
                    task.start.year,
                    task.start.month,
                    task.start.date
                ),
                end: new Date(task.end.year, task.end.month, task.end.date),
            };
        });
    }

    const navigate = useNavigate();
    return (
        <>
            {!loading && !error && tasklist && (
                <>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <Gantt tasks={tasklist} viewMode={ViewMode.Day} />
                </>
            )}
        </>
    );
};

export default GanttChart;
