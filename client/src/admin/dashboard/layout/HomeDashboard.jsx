import React, { useEffect, useState } from "react";
import CardDashboard from "../components/CardDashboard";
import { Handshake, Baby, UsersRound, Newspaper } from "lucide-react";
import axios from "axios";

function HomeDashboard() {
  const [dataCounts, setDataCounts] = useState({
    mitraCount: 0,
    kidspediaCount: 0,
    webinarCount: 0,
    komunitasCount: 0,
    artikelCount: 0
  });

  useEffect(() => {
    axios.get('http://localhost:3001/dashboard/data')
      .then(response => {
        setDataCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setDataCounts({
          mitraCount: 0,
          kidspediaCount: 0,
          webinarCount: 0,
          komunitasCount: 0,
          artikelCount: 0
        });
      });
  }, []);

  const datas = [
    {
      id: 1,
      icon: Handshake,
      title: "Data Mitra",
      dataCount: dataCounts.mitraCount,
    },
    {
      id: 2,
      icon: Baby,
      title: "Data Kidspedia",
      dataCount: dataCounts.kidspediaCount,
    },
    {
      id: 3,
      icon: UsersRound,
      title: "Data Webinar",
      dataCount: dataCounts.webinarCount,
    },
    {
      id: 4,
      icon: UsersRound,
      title: "Data Komunitas",
      dataCount: dataCounts.komunitasCount,
    },
    {
      id: 5,
      icon: Newspaper,
      title: "Data Artikel",
      dataCount: dataCounts.artikelCount,
    },
  ];

  return (
    <div>
      <p className="text-lg font-secondary font-regular mb-2">Hai, Admin!</p>
      <h1 className="text-2xl font-primary font-medium">Dashboard</h1>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {datas.map((data) => (
          <CardDashboard key={data.id} id={data.id} icon={data.icon} title={data.title} dataCount={data.dataCount} />
        ))}
      </div>
    </div>
  );
}

export default HomeDashboard;
