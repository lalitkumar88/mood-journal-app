import React, { useMemo } from "react";

function AnalyticalSummary({ entries }) {
  const stats = useMemo(() => {
    if (!entries || entries.length === 0) {
      return {
        avg: "0",
        best: null,
        worst: null,
        total: 0,
      };
    }

    const now = new Date();

    const last30Days = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const diff =
        (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    });

    const avg =
      last30Days.length > 0
        ? (
            last30Days.reduce((sum, e) => sum + e.score, 0) / last30Days.length
          ).toFixed(2)
        : "0";

    const sorted = [...entries].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    const bestScore = Math.max(...entries.map((e) => e.score));
    const worstScore = Math.min(...entries.map((e) => e.score));

    const best = sorted.find((e) => e.score === bestScore) || null;
    const worst = sorted.find((e) => e.score === worstScore) || null;

    return {
      avg,
      best,
      worst,
      total: entries.length,
    };
  }, [entries]);

  return (
    <div className="card shadow-sm p-3 p-md-4 mb-4">
      <div className="row text-center">
        <div className="col-6 col-md-3 mb-3">
          <h6 className="text-muted">Avg (30 Days)</h6>
          <h4>{stats.avg}</h4>
        </div>

        <div className="col-6 col-md-3 mb-3">
          <h6 className="text-muted">Best Day</h6>
          {stats.best ? (
            <>
              <div>{stats.best.score}/10</div>
              <small className="text-muted">
                {new Date(stats.best.date).toLocaleDateString("en-IN")}
              </small>
            </>
          ) : (
            <div>—</div>
          )}
        </div>

        <div className="col-6 col-md-3 mb-3">
          <h6 className="text-muted">Worst Day</h6>
          {stats.worst ? (
            <>
              <div>{stats.worst.score}/10</div>
              <small className="text-muted">
                {new Date(stats.worst.date).toLocaleDateString("en-IN")}
              </small>
            </>
          ) : (
            <div>—</div>
          )}
        </div>

        <div className="col-6 col-md-3 mb-3">
          <h6 className="text-muted">Total Entries</h6>
          <h4>{stats.total}</h4>
        </div>
      </div>
    </div>
  );
}

export default AnalyticalSummary;
