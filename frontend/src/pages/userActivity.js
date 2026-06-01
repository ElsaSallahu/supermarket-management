import React, {
  useEffect,
  useState,
} from "react";

function UserActivity() {
  const [activities, setActivities] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [userName, setUserName] =
    useState("");

  const [activityType, setActivityType] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  // GET
  const fetchActivities = () => {
    fetch(
      "http://localhost:5000/user-activity"
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setActivities(data)
      )
      .catch((err) =>
        console.log(err)
      );
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // ADD
  const addActivity =
    async () => {
      try {
        await fetch(
          "http://localhost:5000/user-activity",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                user_name:
                  userName,
                activity_type:
                  activityType,
              }
            ),
          }
        );

        fetchActivities();

        setUserName("");
        setActivityType(
          ""
        );
      } catch (err) {
        console.log(err);
      }
    };

  // DELETE
  const deleteActivity =
    async (id) => {
      try {
        await fetch(
          `http://localhost:5000/user-activity/${id}`,
          {
            method:
              "DELETE",
          }
        );

        fetchActivities();
      } catch (err) {
        console.log(err);
      }
    };

  // EDIT
  const editActivity = (
    activity
  ) => {
    setEditingId(
      activity.activity_id
    );

    setUserName(
      activity.user_name
    );

    setActivityType(
      activity.activity_type
    );
  };

  // UPDATE
  const updateActivity =
    async () => {
      try {
        await fetch(
          `http://localhost:5000/user-activity/${editingId}`,
          {
            method:
              "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                user_name:
                  userName,
                activity_type:
                  activityType,
              }
            ),
          }
        );

        fetchActivities();

        setEditingId(
          null
        );

        setUserName("");
        setActivityType(
          ""
        );
      } catch (err) {
        console.log(err);
      }
    };

  const filteredActivities =
    activities.filter(
      (activity) =>
        activity.user_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        activity.activity_type
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const inputStyle = {
    width: "100%",
    padding:
      "12px 14px",
    borderRadius:
      "14px",
    border:
      "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent:
            "space-between",

          alignItems:
            "center",

          marginBottom:
            "25px",

          flexWrap:
            "wrap",

          gap: "14px",
        }}
      >
        <div>
          <p
            className="page-kicker"
            style={{
              color:
                "#64748b",
              margin: 0,
            }}
          >
            System Logs
          </p>

          <h1 className="page-heading">
            User Activity
          </h1>
        </div>

        <input
          className="ui-input"
          placeholder="Search activity..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            ...inputStyle,
            width: "300px",
          }}
        />
      </div>

      {/* FORM */}
      <div
        className="ui-card"
        style={{
          background:
            "white",

          borderRadius:
            "28px",

          padding:
            "24px",

          marginBottom:
            "25px",

          boxShadow:
            "0 14px 35px rgba(15,23,42,0.06)",
        }}
      >
        <h2>
          {editingId
            ? "Update Activity"
            : "Add Activity"}
        </h2>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",

            gap: "14px",

            marginTop:
              "20px",
          }}
        >
          <input
            className="ui-input"
            type="text"
            placeholder="User Name"
            value={
              userName
            }
            onChange={(e) =>
              setUserName(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          />

          <input
            className="ui-input"
            type="text"
            placeholder="Activity Type"
            value={
              activityType
            }
            onChange={(e) =>
              setActivityType(
                e.target
                  .value
              )
            }
            style={
              inputStyle
            }
          />
        </div>

        <button
          className="ui-button ui-button-primary"
          onClick={
            editingId
              ? updateActivity
              : addActivity
          }
          style={{
            marginTop:
              "18px",

            background:
              "#111827",

            color:
              "white",

            border:
              "none",

            padding:
              "12px 20px",

            borderRadius:
              "14px",

            cursor:
              "pointer",

            fontWeight:
              "600",
          }}
        >
          {editingId
            ? "Update Activity"
            : "Add Activity"}
        </button>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",

          gap: "18px",
        }}
      >
        {filteredActivities.map(
          (
            activity
          ) => (
            <div
              key={
                activity.activity_id
              }
              style={{
                background:
                  "white",

                borderRadius:
                  "28px",

                padding:
                  "22px",

                boxShadow:
                  "0 14px 35px rgba(15,23,42,0.06)",
              }}
            >
              <h3>
                {
                  activity.user_name
                }
              </h3>

              <p
                style={{
                  color:
                    "#64748b",

                  margin:
                    "12px 0",
                }}
              >
                Type:{" "}
                {
                  activity.activity_type
                }
              </p>

              <p
                style={{
                  color:
                    "#64748b",
                }}
              >
                Date:{" "}
                {activity.activity_date?.split(
                  "T"
                )[0]}
              </p>

              <div
                style={{
                  display:
                    "flex",

                  gap: "10px",

                  marginTop:
                    "18px",
                }}
              >
                <button
                  className="ui-button ui-button-secondary"
                  onClick={() =>
                    editActivity(
                      activity
                    )
                  }
                  style={{
                    flex: 1,
                    background:
                      "#111827",
                    color:
                      "white",
                    border:
                      "none",
                    borderRadius:
                      "14px",
                    padding:
                      "12px",
                    cursor:
                      "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  className="ui-button ui-button-danger"
                  onClick={() =>
                    deleteActivity(
                      activity.activity_id
                    )
                  }
                  style={{
                    flex: 1,
                    background:
                      "#f3f4f6",
                    border:
                      "none",
                    borderRadius:
                      "14px",
                    padding:
                      "12px",
                    cursor:
                      "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default UserActivity;
