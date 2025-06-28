import Plot from "react-plotly.js";
import usePostingsFromUserSchool from "../hooks/usePostingsFromUserSchool";
import "./AdminAnalysisPage.scss";

export default function AdminAnalysisPage() {
    const allPostings = usePostingsFromUserSchool();

    const statusTracker = { approved: 0, rejected: 0, pending: 0 };
    const tagCounter: { [key: string]: number } = {};

    for (const posting of allPostings) {
        statusTracker[posting.status] += 1;

        for (const tag of posting?.tags ?? []) {
            if (tagCounter[tag] === undefined) {
                tagCounter[tag] = 0;
            }

            tagCounter[tag] += 1;
        }
    }

    const sortedTagEntires = Object.entries(tagCounter).sort(
        (a, b) => b[1] - a[1]
    );
    const maxY = Math.max(...Object.values(sortedTagEntires).map(v => v[1]));
    const tickVals = Array.from({ length: maxY + 1 }, (_, i) => i); // [0, 1, 2]

    console.log(sortedTagEntires);

    return (
        <div className="admin-analysis-page">
            <div className="admin-analysis-page__graph-container">
                <Plot
                    data={[
                        {
                            values: [
                                statusTracker.approved,
                                statusTracker.pending,
                                statusTracker.rejected,
                            ],
                            labels: ["Approved", "Pending", "Rejected"],
                            type: "pie",
                            marker: {
                                colors: ["green", "darkblue", "red"],
                            },
                        },
                    ]}
                    layout={{
                        title: { text: "Posting Status Distribution" },
                    }}
                />

                <Plot
                    data={[
                        {
                            x: sortedTagEntires.slice(0, 5).map(v => v[0]),
                            y: sortedTagEntires.slice(0, 5).map(v => v[1]),
                            type: "bar",
                        },
                    ]}
                    layout={{
                        title: { text: "Most Common Tags" },
                        yaxis: { tickformat: ",d", tickvals: tickVals },
                    }}
                />
            </div>
        </div>
    );
}
