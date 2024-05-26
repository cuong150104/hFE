import React, { useEffect, useMemo, useState } from "react";

import styles from "./index.module.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import classNames from "classnames";
import {
  getStatistics,
  getTopBookingRooms,
} from "../../../servises/statisticsService";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const Statistics = () => {
  const [tab, setTab] = useState("DAY");
  const [statisticData, setStatisticData] = useState([]);
  const [topBookingRooms, setTopBookingRooms] = useState([]);

  const { data } = useMemo(() => {
    let labels = [];
    if (tab === "DAY") {
      labels = statisticData.map((it) => {
        const dateFormatted = dayjs(it.day).format("DD/MM");

        return dateFormatted;
      });
    } else if (tab === "MONTH") {
      labels = statisticData.map((it) => {
        const dateFormatted = dayjs(it.month).format("MM");

        return `Tháng ${dateFormatted}`;
      });
    } else if (tab === "QUARTER") {
      labels = statisticData.map((it) => `Quý ${it.quarter}`);
    } else {
      labels = statisticData.map((it) => `Năm ${it.year}`);
    }

    const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: "Revenue",
          data: statisticData.map((it) => it.totalRevenue),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    return { data };
  }, [statisticData, tab]);

  useEffect(() => {
    fetchStatistics(tab);
  }, [tab]);

  useEffect(() => {
    fetchTopBookingRooms();
  }, []);

  const fetchTopBookingRooms = async () => {
    try {
      const response = await getTopBookingRooms();
      if (response.EC === 0) {
        setTopBookingRooms(response.DT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatistics = async (type) => {
    try {
      const response = await getStatistics(type);

      if (response.EC === 0) {
        let statisticInCurrentYear = response.DT;
        if (tab === "DAY") {
          statisticInCurrentYear = response.DT.filter(
            (it) => dayjs(it.day).get("y") === dayjs().get("y")
          );
        } else if (tab === "MONTH") {
          statisticInCurrentYear = response.DT.filter(
            (it) => dayjs(it.month).get("y") === dayjs().get("y")
          );
        } else if (tab === "QUARTER") {
          statisticInCurrentYear = response.DT.filter(
            (it) => it.year === dayjs().get("y")
          );
        }

        setStatisticData(statisticInCurrentYear);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onTabChange = (tab) => {
    setTab(tab);
  };

  return (
    <div className="container">
      <div>
        <div className={styles.heading}>
          <h3>Revenue Statistics</h3>

          <div>
            <ul class="nav nav-pills nav-fill">
              <li class="nav-item">
                <button
                  class={classNames("nav-link", {
                    active: tab === "DAY",
                  })}
                  onClick={() => onTabChange("DAY")}
                >
                  By Date
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={classNames("nav-link", {
                    active: tab === "MONTH",
                  })}
                  onClick={() => onTabChange("MONTH")}
                >
                  Month
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={classNames("nav-link", {
                    active: tab === "QUARTER",
                  })}
                  onClick={() => onTabChange("QUARTER")}
                >
                  Quarter
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={classNames("nav-link", {
                    active: tab === "YEAR",
                  })}
                  onClick={() => onTabChange("YEAR")}
                >
                  Year
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Line options={options} data={data} />
      </div>

      <div className={styles.topBookedRooms}>
        <h3>Top most booked rooms</h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Room Name</th>
              <th scope="col">Bookings Number</th>
            </tr>
          </thead>
          <tbody>
            {topBookingRooms?.map((it, index) => (
              <tr key={`top-booking-room-${it.roomId}`}>
                <th scope="row">{index + 1}</th>
                <td>{it.roomName}</td>
                <td>{it.totalBooking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
