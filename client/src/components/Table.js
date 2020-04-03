import React from "react";

const Table = props => {
    const {
        records = [],
        dataKeys,
        sortBy,
        order,
        onKeyClick,
        onDeleteClick
    } = props;
    return (
        <table className="table table-striped">
            <thead>
                <tr key="head">
                    {dataKeys.map(k => (
                        <th
                            key={k}
                            onClick={() => onKeyClick(k)}
                            style={{ width: "150px" }}
                        >
                            {k}
                            {sortBy === k ? <small>({order})</small> : null}
                        </th>
                    ))}
                    <th style={{ width: "50px" }}></th>
                </tr>
            </thead>
            <tbody>
                {records.map((record, i) => (
                    <tr key={i}>
                        {dataKeys.map(k => (
                            <td key={k}>{record[k]}</td>
                        ))}
                        <td>
                            <button onClick={() => onDeleteClick(record)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
