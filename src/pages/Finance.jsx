import AppLayout from "../layouts/AppLayout";
import { useState } from "react";

function Finance() {
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    type: "Tithe",
    amount: "",
  });

  const handleAdd = () => {
    if (!form.amount) return;

    setRecords([
      ...records,
      {
        id: Date.now(),
        ...form,
      },
    ]);

    setForm({
      type: "Tithe",
      amount: "",
    });
  };

  const totalTithe = records
    .filter((r) => r.type === "Tithe")
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const totalOffering = records
    .filter((r) => r.type === "Offering")
    .reduce((sum, r) => sum + Number(r.amount), 0);

  const totalIncome =
    totalTithe + totalOffering;

  return (
    <AppLayout>
      <h2>💰 Finance</h2>

      <div style={styles.stats}>
        <StatCard
          title="Tithes"
          value={`KES ${totalTithe}`}
        />

        <StatCard
          title="Offerings"
          value={`KES ${totalOffering}`}
        />

        <StatCard
          title="Income"
          value={`KES ${totalIncome}`}
        />
      </div>

      <div style={styles.form}>
        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
        >
          <option>Tithe</option>
          <option>Offering</option>
        </select>

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({
              ...form,
              amount: e.target.value,
            })
          }
        />

        <button onClick={handleAdd}>
          Save
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.type}</td>
              <td>KES {r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
}

function StatCard({ title, value }) {
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
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "15px",
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    background: "#fff",
  },
};

export default Finance;