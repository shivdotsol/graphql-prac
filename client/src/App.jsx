import { gql, useQuery } from "@apollo/client";

const query = gql`
    query GetTodos {
        getTodos {
            title
            completed
            user {
                name
            }
        }
    }
`;

function App() {
    const { data, loading, error } = useQuery(query);
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>error</h1>;
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {data.getTodos.map((i) => (
                    <div
                        style={{ marginBottom: "30px", display: "flex" }}
                        key={Math.random()}
                    >
                        {JSON.stringify(i)}
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
