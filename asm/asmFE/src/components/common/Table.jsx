import React from "react";
import "../../styles/common.css";

const Table = ({ columns, data, actions }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{column.render ? column.render(row) : row[column.accessor]}</td>
                ))}
                {actions && <td className="actions">{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
