import React, { useEffect, useState } from "react";

function UserActivity() {
  const [activities, setActivities] = useState([]);

  const [userName, setUserName] = useState("");
  const [activityType, setActivityType] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  // GET ACTIVITIES
  const fetchActivities = () => {
    fetch(
      "http://localhost:5000/user-activity"
    )
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // ADD ACTIVITY
  const addActivity = async () => {
    try {
      await fetch(
        "http://localhost:5000/user-activity",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            user_name: userName,
            activity_type: activityType,
          }),
        }
      );

      fetchActivities();

      setUserName("");
      setActivityType("");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE ACTIVITY
  const deleteActivity = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/user-activity/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchActivities();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT ACTIVITY
  const editActivity = (activity) => {
    setEditingId(activity.activity_id);
    setUserName(activity.user_name);
    setActivityType(
      activity.activity_type
    );
  };

  // UPDATE ACTIVITY
  const updateActivity = async () => {
    try {
      await fetch(
        `http://localhost:5000/user-activity/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            user_name: userName,
            activity_type: activityType,
          }),
        }
      );

      fetchActivities();

      setEditingId(null);
      setUserName("");
      setActivityType("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>User Activity Management</h2>

      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) =>
          setUserName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Activity Type"
        value={activityType}
        onChange={(e) =>
          setActivityType(e.target.value)
        }
      />

      {editingId ? (
        <button
          onClick={updateActivity}
        >
          Update Activity
        </button>
      ) : (
        <button onClick={addActivity}>
          Add Activity
        </button>
      )}

      <br />
      <br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Activity Type</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((activity) => (
            <tr key={activity.activity_id}>
              <td>
                {activity.activity_id}
              </td>
              <td>
                {activity.user_name}
              </td>
              <td>
                {activity.activity_type}
              </td>
              <td>
                {activity.activity_date?.split(
                  "T"
                )[0]}
              </td>

              <td>
                <button
                  onClick={() =>
                    editActivity(activity)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteActivity(
                      activity.activity_id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserActivity;