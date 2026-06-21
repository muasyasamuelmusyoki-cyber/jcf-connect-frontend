import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from "react";

function Finance() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("financeRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    type: "Tithe",
    amount: "",
    date: new Date()
      .toISOString()
      .split("T")[0],
  });

  useEffect(() => {
    localStorage.setItem(
      "financeRecords",
      JSON.stringify(records)
    );
  }, [records]);

  const handleAdd = () => {
    if (!form.amount) return;

    const newRecord = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    setRecords([
      newRecord,
      ...records,
    ]);

    setForm({
      type: "Tithe",
      amount: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });
  };

  const deleteRecord = (id) => {
    if (
      !window.confirm(
        "Delete this record?"
      )
    )
      return;

    setRecords(
      records.filter(
        (r) => r.id !== id
      )
    );
  };

  const totalTithe = records
    .filter(
      (r) => r.type === "Tithe"
    )
    .reduce(
      (sum, r) =>
        sum + Number(r.amount),
      0
    );

  const totalOffering = records
    .filter(
      (r) =>
        r.type === "Offering"
    )
    .reduce(
      (sum, r) =>
        sum + Number(r.amount),
      0
    );

  const totalIncome =
    totalTithe +
    totalOffering;

  return (
    <AppLayout>
      <h1>
        💰 Finance Management
      </h1>

      <div style={styles.stats}>
        <StatCard
          title="Total Tithes"
          value={`KES ${totalTithe.toLocaleString()}`}
        />

        <StatCard
          title="Total Offerings"
          value={`KES ${totalOffering.toLocaleString()}`}
        />

        <StatCard
          title="Total Income"
          value={`KES ${totalIncome.toLocaleString()}`}
        />
      </div>

      <div style={styles.formCard}>
        <h3>
          Add Finance Record
        </h3>

        <div style={styles.grid}>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
            style={styles.input}
          >
            <option>
              Tithe
            </option>
            <option>
              Offering
            </option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount:
                  e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date:
                  e.target.value,
              })
            }
            style={styles.input}
          />
        </div>

        <button
          style={styles.saveBtn}
          onClick={handleAdd}
        >
          Save Record
        </button>
      </div>

      <div style={styles.tableCard}>
        <h3>
          Finance Records
        </h3>

        <table
          style={styles.table}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {records.map(
              (record) => (
                <tr
                  key={record.id}
                >
                  <td>
                    {
                      record.date
                    }
                  </td>

                  <td>
                    {
                      record.type
                    }
                  </td>

                  <td>
                    KES{" "}
                    {record.amount.toLocaleString()}
                  </td>

                  <td>
                    <button
                      style={
                        styles.deleteBtn
                      }
                      onClick={() =>
                        deleteRecord(
                          record.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  stats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  formCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "15px",
  },

  input: {
    padding: "12px",
    border:
      "1px solid #ddd",
    borderRadius: "8px",
  },

  saveBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding:
      "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  tableCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding:
      "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Finance;