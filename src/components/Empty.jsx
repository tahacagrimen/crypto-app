<Line
  data={{
    labels: chart[setting].map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;

      return day === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: chart[setting].map((coin) => coin[1]),
        label: `${setting} (${currency.toUpperCase()}) for past ${day} days`,
        borderColor: "#DC7DA3",
        pointRadius: 1,
      },
    ],
  }}
/>;
