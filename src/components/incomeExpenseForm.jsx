import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../actions/actions";

export const IncomeExpenseForm = ({ entryType }) => {
  const [entryForm, setEntryForm] = useState({
    description: "",
    amount: 0,
    category: "",
    entryType: entryType
  });

  const dispatch = useDispatch();

  const addEntryHandler = () => {
    if (entryForm.description.length > 0 && entryForm.category.length > 0) {
      dispatch(addEntry(entryForm));
      setEntryForm({
        description: "",
        amount: 0,
        category: "",
        entryType: entryType
      });
    } else {
      alert("Insert all details");
    }
  };

  return (
    <div className="flex-column start gap-10px width-350px">
      <div className="flex-row gap-10px">
        <label>Description:</label>
        <input
          className="width-auto"
          value={entryForm.description}
          onChange={(e) =>
            setEntryForm({
              ...entryForm,
              description: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <label>Category:</label>
        <input
          className="width-auto"
          value={entryForm.category}
          onChange={(e) =>
            setEntryForm({
              ...entryForm,
              category: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <label>Amount:</label>
        <input
          type="number"
          value={entryForm.amount}
          onChange={(e) =>
            setEntryForm({
              ...entryForm,
              amount: e.target.value
            })
          }
          className="width-auto"
        />
      </div>

      <div className="flex-row gap-10px">
        <label>Entry type:</label>
        <select
          value={entryForm.entryType}
          onChange={(e) =>
            setEntryForm({
              ...entryForm,
              entryType: e.target.value
            })
          }
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="savings">Savings</option>
        </select>
      </div>

      <button onClick={addEntryHandler}>Add entry</button>
    </div>
  );
};
